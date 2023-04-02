import React from "react"
import axios from 'axios';
import moment from 'moment';

export default function Info(props) {
    const api = 'https://api.utesu.com'
    return (
        <div className="fixed h-full w-screen flex flex-row-reverse backdrop-blur">
            <div className='flex-col min-w-[260px] xl:flex h-screen w-3/4 bg-neutral-100 border-l-[1px]'>
                <div className="flex mr-auto">
                    <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_info_outline_48px-512.png" className='h-[30px] w-[30px] ml-[16px] my-auto' alt="" onClick={() => {
                        props.setInfoView(false)
                    }} />
                    <div className='h-[60px] flex'>
                        <p className='my-auto ml-[10px]'>{props.translate('channel_info')}</p>
                    </div>
                </div>
                <div className='flex'>
                    <img className='w-[80px] rounded-full m-[10px]' src={props.data.channels[props.focusedChannel]!==undefined?props.data.channels[props.focusedChannel].avatar:''} alt="" />
                    <div className='my-auto '>
                        <p>{props.data.channels[props.focusedChannel]!==undefined?props.data.channels[props.focusedChannel].display_name:''}</p>
                        <p className='text-neutral-700'>{props.data.channels[props.focusedChannel]!==undefined?props.data.channels[props.focusedChannel].members:''}{props.translate('members')}</p>
                    </div>
                </div>
                <hr />
                <div className='m-[10px]'>
                    <div className='mb-[10px]'>
                        <p>{props.data.channels[props.focusedChannel]!==undefined?props.data.users[props.data.channels[props.focusedChannel].owner_snowflake].display_name:''}</p>
                        <p className='text-neutral-700'>{props.translate('channel_owner')}</p>
                    </div>
                    <div className='mb-[10px]'>
                        <p>{props.data.channels[props.focusedChannel]!==undefined?moment(props.data.channels[props.focusedChannel].timestamp).format('YYYY/MM/DD'):''}</p>
                        <p className='text-neutral-700'>{props.translate('channel_creation_date')}</p>
                    </div>
                    <div>
                    <a href={`www.utesu.com/join/${props.data.channels[props.focusedChannel]!==undefined?props.data.channels[props.focusedChannel].snowflake:''}`}>utesu.com/join/{props.data.channels[props.focusedChannel]!==undefined?props.data.channels[props.focusedChannel].snowflake:''}</a>
                        <p className='text-neutral-700'>{props.translate('channel_url')}</p>
                    </div>
                </div>
                <hr />
                <div className='m-[10px]'>
                    <button onClick={() => {
                        axios.delete(`${api}/channels/${props.focusedChannel}/leave`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                            setFocusedChannel(1311000000000000000)
                            setData((prev) => {
                                let temp = prev
                                delete temp.channels[props.focusedChannel]
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
        </div>
    )
}



