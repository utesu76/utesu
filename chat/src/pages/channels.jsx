import React from 'react'
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import QRCodeStyling from "qr-code-styling";
import '../index.css'
import { useParams } from "react-router-dom"
import io  from "socket.io-client";

import Profile from './components/profile'
import Upload from './components/upload'
import ChannelsPopUp from './components/windows/channels'
import InfoPopUp from './components/windows/info'
import New_channel from './components/new_channel'
import Image from './components/image'

export default function Channels(props) {

    const api = props.api

    const { callback } = useParams()

    const [preview, setPreview] = React.useState('')

    const navigate = useNavigate();
    const { channelId } = useParams();

    const [infoView, setInfoView] = React.useState(false)

    const [channels, setChannels] = React.useState([])
    const [messages, setMessages] = React.useState([])
    const [settings, setSettings] = React.useState(false)
    const [upload, setUpload] = React.useState(false)
    const [channel, setChannel] = React.useState(false)

    const [socket, setSocket] = React.useState({ connected: false })

    let executed = false

    let channelsTemp = []
    let messagesTemp = []

    const [message, setMessage] = React.useState('')
    const [focusedChannel, setFocusedChannel] = React.useState(channelId)
    const [data, setData] = React.useState({user_data: {}, channels: {messages: []}})

    const [channelView, setChannelView] = React.useState(false)

    function login(token) {
        document.title = 'Utesu | Loading...';
        axios.get(`${api}/channels`, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
            setData(response.data)
            navigate("/channels/" + response.data.user_data.last_channel)
            setFocusedChannel(response.data.user_data.last_channel)
        }).catch((error) => {
            window.localStorage.removeItem('jwt')
            navigate("/login")
        })
    }

    React.useEffect(() => {

        if (callback) {
            axios.get(`${api}/callback?code=${callback}`).then((response) => {
                window.localStorage.setItem('jwt', response.data.token)
                login(response.data.token)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            if (window.localStorage.getItem('jwt') === null) { navigate("/login") } else { login(window.localStorage.getItem('jwt')) }
        }

        
    }, [])

    React.useEffect(() => {
        if (data.channels[focusedChannel] !== undefined) {
            if (socket.connected !== true) {
                setSocket(io.connect(api, {
                    query: {
                        token: window.localStorage.getItem('jwt')
                    }
                }).on('message', function(message) {
                    setData((prev) => {
                        return {
                            ...prev,
                            users: {
                                ...prev.users,  
                                [message.users.snowflake]: {
                                    avatar: message.users.avatar,
                                    display_name: message.users.display_name
                                }
                            },
                            channels: {
                                ...prev.channels,
                                [focusedChannel]: {
                                    ...prev.channels[focusedChannel],
                                    messages: [
                                        {...message.message},
                                        ...prev.channels[focusedChannel].messages,
                                    ]
                                }
                            }
                        }                 
                    })
                }))

            }
            data.channels[focusedChannel].messages.map((message) => {
                document.title = `Utesu | ${data.channels[focusedChannel].display_name}`;
                let matches = message.content.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/g)
                if (matches == null) {
                    messagesTemp.push(
                        <div key={message.snowflake} className={`flex flex-row${message.author_snowflake == data.user_data.snowflake?'-reverse':''} mb-[10px]`}>
                            <img src={data.users[message.author_snowflake].avatar} className='mx-[10px] h-[40px] w-[40px] rounded-full' alt="" />
                            <div className='flex flex-col'>
                                <div className='my-auto bg-neutral-200 py-[4px] px-[14px] rounded-full max-w-md'>
                                    {message.content}
                                </div>
                                <p className={`text-neutral-600 text-[0.8rem] text-${message.author_snowflake == data.user_data.snowflake?'right':'left'}`}>{data.users[message.author_snowflake].display_name}</p>
                            </div>
                            <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="" className={`${message.author_snowflake == data.user_data.snowflake?'':'hidden'} mb-auto mt-[1px] ml-2 mr-2 bg-neutral-200 p-[4px] rounded h-[24px]`} onClick={() => {
                                axios.delete(`${api}/channels/${focusedChannel}/messages/${message.snowflake}`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            channels: {
                                                ...prev.channels,
                                                [focusedChannel]: {
                                                    ...prev.channels[focusedChannel],
                                                    messages: prev.channels[focusedChannel].messages.filter((message) => {
                                                        return message.snowflake !== response.data.snowflake
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }} />
                        </div>
                    )
                } else {
                    let new_string = message.content.replace(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/g, '')
                    if (new_string !== '') {
                        messagesTemp.push(
                            <div key={message.snowflake} className={`flex flex-row${message.author_snowflake == data.user_data.snowflake?'-reverse':''} mb-[10px]`}>
                                <img src={data.users[message.author_snowflake].avatar} className='mx-[10px] h-[40px] w-[40px] rounded-full' alt="" />
                                <div className='flex flex-col'>
                                    <div className='my-auto bg-neutral-200 py-[4px] px-[14px] rounded-full max-w-md'>
                                    {new_string}
                                    </div>
                                    <p className={`text-neutral-600 text-[0.8rem] text-${message.author_snowflake == data.user_data.snowflake?'right':'left'}`}>{data.users[message.author_snowflake].display_name}</p>
                                </div>
                                <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="" className={`${message.author_snowflake == data.user_data.snowflake?'':'hidden'} mb-auto mt-[1px] ml-2 mr-2 bg-neutral-200 p-[4px] rounded h-[24px]`} onClick={() => {
                                    axios.delete(`${api}/channels/${focusedChannel}/messages/${message.snowflake}`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                        setData((prev) => {
                                            return {
                                                ...prev,
                                                channels: {
                                                    ...prev.channels,
                                                    [focusedChannel]: {
                                                        ...prev.channels[focusedChannel],
                                                        messages: prev.channels[focusedChannel].messages.filter((message) => {
                                                            return message.snowflake !== response.data.snowflake
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }} />
                            </div>
                        )
                    }
                    for (let i = 0; i < matches.length; i++) {
                        messagesTemp.push(
                            <div key={message.snowflake + i} className={`flex flex-row${message.author_snowflake == data.user_data.snowflake?'-reverse':''} mb-[10px]`}>
                                <img src={data.users[message.author_snowflake].avatar} className='mx-[10px] h-[40px] w-[40px] rounded-full max-w-md' alt="" />
                                <div className='flex flex-col'>
                                    <img src={matches[0]} className='h-[160px] rounded' alt="" onClick={() => {
                                        setPreview(matches[0])
                                    }} />
                                    <p className={`text-neutral-600 text-[0.8rem] text-${message.author_snowflake == data.user_data.snowflake?'right':'left'}`}>{data.users[message.author_snowflake].display_name}</p>
                                </div>
                                <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="" className={`${message.author_snowflake == data.user_data.snowflake?'':'hidden'} mb-auto mt-[1px] ml-2 mr-2 bg-neutral-200 p-[4px] rounded h-[24px]`} onClick={() => {
                                    axios.delete(`${api}/channels/${focusedChannel}/messages/${message.snowflake}`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                        setData((prev) => {
                                            return {
                                                ...prev,
                                                channels: {
                                                    ...prev.channels,
                                                    [focusedChannel]: {
                                                        ...prev.channels[focusedChannel],
                                                        messages: prev.channels[focusedChannel].messages.filter((message) => {
                                                            return message.snowflake !== response.data.snowflake
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }} />
                            </div>
                        )
                    }
                }
            })
            setMessages(messagesTemp)
            Object.keys(data.channels).forEach(function(key, index) {
                if (data.channels[key].messages !== undefined) {
                    channelsTemp.push(
                        <button key={key} id={key} className={`flex ${focusedChannel==key?'bg-white':''}`} onClick={() => {
                            navigate("/channels/" + key)
                            document.title = `Utesu | ${data.channels[key].display_name}`;
                            setFocusedChannel(key)
                        }}>
                            <img className='w-[40px] rounded-full m-[10px]' src={data.channels[key].avatar} alt="" />
                            <div className='flex-col w-full pr-[10px] my-auto'>
                                <div className='flex'>
                                    <p className='mr-auto'>{data.channels[key].display_name}</p>
                                    <p className='ml-auto'>{moment(data.channels[key].messages[0].timestamp).subtract(5, 'hours').format('H:mm')}</p>
                                </div>
                                <div className='flex'>
                                    <p className='mr-auto overflow-hidden text-ellipsis whitespace-nowrap w-[190px] text-left'>{data.channels[key].messages[0].content}</p>
                                    {/* <p className='ml-auto bg-neutral-300 px-[6px] rounded-full'>9+</p> */}
                                </div>
                            </div>
                        </button>  
                    )
                }
            });
            setChannels(channelsTemp)
        }
        
    }, [focusedChannel, data])

    

    console.log(data)

    return (
        <div className={`flex flex-col`}>

            {
                preview==''
                ?
                <></>
                :
                <Image preview={preview} setPreview={setPreview} />
            }

            {
                channel
                ?
                <New_channel data={data} setData={setData} translate={props.translate} setChannel={setChannel} api={props.api} />
                :
                <></>
            }

            {
                channelView
                ?
                <ChannelsPopUp setChannel={setChannel} api={props.api} setChannelView={setChannelView} setSettings={setSettings} translate={props.translate} channels={channels} data={data} />
                :
                <></>
            }

            {
                infoView
                ?
                <InfoPopUp setFocusedChannel={setFocusedChannel} focusedChannel={focusedChannel} api={props.api} setInfoView={setInfoView} setSettings={setSettings} translate={props.translate} channels={channels} data={data} />
                :
                <></>
            }

            {
                upload
                ?
                <Upload api={props.api} focusedChannel={focusedChannel} setData={setData} setUpload={setUpload} translate={props.translate} />
                :
                <></>
            }
            {   
                data.user_data.last_channel !== undefined
                ?
                <div className={`flex w-screen my-auto`}>
                    {
                        settings
                        ?
                        <Profile api={props.api} setSettings={setSettings} setData={setData} data={data} translate={props.translate} setLang={props.setLang} />
                        :
                        <></>
                    }
                    {
                        props.mobile
                        ?
                        <></>
                        :
                        <div className='bg-neutral-100 flex flex-col h-screen w-1/6 min-w-[260px] border-r-[1px]'>
                            <div className='flex h-[60px]'>
                                <img src="https://cdn-icons-png.flaticon.com/512/70/70115.png" className='h-[20px] w-[20px] mx-[20px] m-auto' alt="" />
                                <p className='my-auto'>chat.utesu</p>
                            </div>
                            <div className='flex flex-col mb-auto pt-[1px]'>
                                {channels}
                                {/* <button className='h-[60px]' onClick={() => {
                                    setChannel(true)
                                }}>
                                    {props.translate('create_channel')}
                                </button> */}
                            </div>
                            <div className='flex' onClick={() => {
                                    setSettings(prevSettings => !prevSettings)
                                }}>
                                <img className='w-[40px] rounded-full m-[10px]' src={data.user_data.avatar} alt="" />
                                <div className='my-auto'>
                                    <p className='my-auto'>{data.user_data.display_name}</p>
                                    <button className='my-auto text-neutral-700'>{props.translate('settings')}</button>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={`flex flex-col xl:w-4/6 h-screen w-screen sm:min-w-[280px]`}>
                        <div className='flex-row flex bg-neutral-100'>
                            {
                                props.mobile
                                ?
                                <img src="https://cdn-icons-png.flaticon.com/512/70/70115.png" className='h-[20px] w-[20px] ml-[20px] mr-[10px] my-auto' alt="" onClick={() => {
                                    setChannelView(true)
                                }} />
                                :
                                <></>
                            }
                            <div className='pl-[10px] h-[60px] flex-col flex'>
                                <p className='mt-auto'>{data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].display_name:''}</p>
                                <p className='text-neutral-700 mb-auto '>{data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].members:''}{props.translate('members')}</p>
                            </div>
                            {
                                props.mobile
                                ?
                                <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_info_outline_48px-512.png" className='h-[30px] w-[30px] ml-auto mr-[18px] my-auto' alt="" onClick={() => {
                                    setInfoView(true)
                                }} />
                                :
                                <></>
                            }
                            
                        </div>
                        <hr />
                        <div id='scroller' onScroll={() => {
                            if (Math.abs(document.getElementById('scroller').scrollTop) > (document.getElementById('scroller').scrollHeight - document.getElementById('scroller').offsetHeight) - 40 && executed == false) {
                                executed = true
                                axios.get(`${api}/channels/${focusedChannel}/messages/${data.channels[focusedChannel].messages.length}`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            users: {
                                                ...prev.users,
                                                ...response.data.users
                                            },
                                            channels: {
                                                ...prev.channels,
                                                [focusedChannel]: {
                                                    ...prev.channels[focusedChannel],
                                                    messages: [
                                                        ...prev.channels[focusedChannel].messages,
                                                        ...response.data.messages,
                                                    ]
                                                }
                                            }
                                        }
                                    })
                                })
                            }
                        }} className='mt-auto flex flex-col-reverse overflow-scroll overflow-x-hidden grow pt-[10px]'>
                            {messages}
                        </div>
                        <hr />
                        <div className='h-[60px] flex'>
                            <div className='bg-neutral-100 '>
                                <img src="https://www.freeiconspng.com/thumbs/paper-clip-icon/paper-clip-icon-10.png" alt="" className='h-[30px] m-[15px]' onClick={() => {
                                    setUpload(prevUpload => !prevUpload)
                                }} />
                            </div>
                            <input type="text" placeholder={props.lang=='ja'?`${data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].display_name:''} へメッセージを送信`:`Message ${data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].display_name:''}`} value={message} onChange={() => {
                                setMessage(event.target.value)
                            }} className='bg-neutral-100 h-full w-full focus:outline-none' onKeyDown={() => {
                                if (event.key === 'Enter') {
                                    axios.post(`${api}/channels/${focusedChannel}/messages`, { content: message }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                        setMessage('')
                                    })
                                }
                            }} />
                        </div>
                    </div>
                    {
                        props.mobile
                        ?
                        <></>
                        :
                        <div className='flex-col min-w-[260px] h-screen w-1/6 bg-neutral-100 border-l-[1px]'>
                            <div className='h-[60px] flex'>
                                <p className='my-auto ml-[10px]'>{props.translate('channel_info')}</p>
                            </div>
                            <div className='flex'>
                                <img className='w-[80px] rounded-full m-[10px]' src={data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].avatar:''} alt="" />
                                <div className='my-auto '>
                                    <p>{data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].display_name:''}</p>
                                    <p className='text-neutral-700'>{data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].members:''}{props.translate('members')}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='m-[10px]'>
                                <div className='mb-[10px]'>
                                    <p>{data.channels[focusedChannel]!==undefined?data.users[data.channels[focusedChannel].owner_snowflake].display_name:''}</p>
                                    <p className='text-neutral-700'>{props.translate('channel_owner')}</p>
                                </div>
                                <div className='mb-[10px]'>
                                    <p>{data.channels[focusedChannel]!==undefined?moment(data.channels[focusedChannel].timestamp).format('YYYY/MM/DD'):''}</p>
                                    <p className='text-neutral-700'>{props.translate('channel_creation_date')}</p>
                                </div>
                                <div>
                                    <a href={`www.utesu.com/join/${data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].snowflake:''}`}>utesu.com/join/{data.channels[focusedChannel]!==undefined?data.channels[focusedChannel].snowflake:''}</a>
                                    <p className='text-neutral-700'>{props.translate('channel_url')}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='m-[10px]'>
                                <button onClick={() => {
                                    axios.delete(`${api}/channels/${focusedChannel}/leave`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                        setFocusedChannel(1311000000000000000)
                                        setData((prev) => {
                                            let temp = prev
                                            delete temp.channels[focusedChannel]
                                            return temp
                                        })
                                    }).catch((error) => {
                                        if (error.response.status == 405) {
                                            alert('You cannot leave this channel.')
                                        }
                                    })
                                }}>{props.translate('leave_channel')}</button>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className='h-screen w-screen flex'>
                    <div className='m-auto text-6xl font-bold'>LOADING</div>    
                </div>
            }
        </div>  
    )
}