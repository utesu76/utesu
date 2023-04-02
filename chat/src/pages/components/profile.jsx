import React from "react"

import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function Profile(props) {

    const api = 'https://api.utesu.com'

    const navigate = useNavigate();

    const [changingEmail, setChangingEmail] = React.useState(false)

    const [changingUsername, setChangingUsername] = React.useState(false)

    const [changingPassword, setChangingPassword] = React.useState(false)

    const [nameChange, setNameChange] = React.useState('')

    const [emailChange, setEmailChange] = React.useState('')

    const [passwordChange, setPasswordChange] = React.useState('')

    const [passwordToken, setPasswordToken] = React.useState('')

    const [stage, setStage] = React.useState(1)

    return (
        <div className="z-10 fixed h-screen w-screen flex backdrop-blur">
            <div className="mx-auto mb-auto pb-[10px] mt-[200px] w-[400px] bg-neutral-100 rounded">
                <div className="px-[20px] pt-[10px] flex-col flex">
                    <div className="flex">
                        <p className="mb-[20px]">{props.translate('account')}</p>
                        <button className="ml-auto mb-[20px]" onClick={() => {
                            props.setSettings(prevSettings => !prevSettings)
                        }}>{props.translate('back')}</button> 
                    </div>
                    <div className='flex'>
                        <img className='w-[80px] rounded-full mr-[20px]' src={props.data.user_data.avatar} alt="" />
                        <div className='my-auto'>
                            <p className='my-auto'>{props.data.user_data.display_name}</p>
                            <p className='my-auto text-neutral-700'>{props.data.user_data.username}</p>
                        </div>
                    </div>
                </div>
                <hr className="my-[14px]" />
                <div className="px-[20px] flex flex-col mb-[10px]">
                    <div className="flex mb-[0px]">
                        <p className="mr-auto">{props.translate('email')}</p>
                        <p>{props.data.user_data.email}</p>
                    </div>
                </div>
                <hr className="my-[14px]" />
                <div className="px-[20px] flex flex-col">
                    {
                        changingUsername
                        ?
                        <input autoFocus className="mb-[20px] mr-auto bg-transparent focus:outline-none w-full" onBlur={() => {
                            setChangingUsername(false)
                        }} placeholder={props.translate('enter_new_display_name')} value={nameChange} type="text" onChange={() => {
                            setNameChange(event.target.value)
                        }} onKeyDown={() => {
                            if (event.key === 'Enter') {
                                axios.put(`${api}/users/update/display_name`, { display_name: nameChange }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                    setNameChange('')
                                    setChangingUsername(false)
                                    props.setData((prev) => {
                                        return {
                                            ...prev,
                                            user_data: {
                                                ...prev.user_data,
                                                display_name: response.data.user_data.display_name
                                            }
                                        }
                                        
                                    })
                                })
                            }
                        }} />
                        :
                        <button className="mb-[20px] mr-auto" onClick={() => {
                            setChangingUsername(true)
                        }}>{props.translate('edit_username')}</button>
                    }
                    {
                        changingPassword
                        ?
                        stage==1
                        ?
                        <input autoFocus className="mb-[20px] mr-auto bg-transparent focus:outline-none w-full" onBlur={() => {
                            setChangingPassword(false)
                        }} placeholder={props.translate('enter_current_password')} value={passwordChange} onChange={() => {
                            setPasswordChange(event.target.value)
                        }} type="password" onKeyDown={() => {
                            if (event.key === 'Enter') {
                                axios.post(`${api}/users/verify/password`, { password: passwordChange }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                    setPasswordChange('')
                                    setPasswordToken(response.data.token)
                                    setStage(2)
                                })
                            }
                        }} />
                        :
                        <input autoFocus className="mb-[20px] mr-auto bg-transparent focus:outline-none w-full" onBlur={() => {
                            setChangingPassword(false)
                        }} placeholder={props.translate('enter_new_password')} type="password" value={passwordChange} onChange={() => {
                            setPasswordChange(event.target.value)
                        }} onKeyDown={() => {
                            if (event.key === 'Enter') {
                                axios.put(`${api}/users/update/password`, { password: passwordChange, token: passwordToken }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                    setPasswordChange('')
                                    setChangingPassword(false)
                                    setStage(1)
                                })
                            }
                        }} />
                        :
                        <button className="mb-[20px] mr-auto" onClick={() => {
                            setChangingPassword(true)
                        }}>{props.translate('change_password')}</button>
                    }
                    {
                        changingEmail
                        ?
                        <input autoFocus className="mb-[20px] mr-auto bg-transparent focus:outline-none w-full" onBlur={() => {
                            setChangingEmail(false)
                        }} placeholder={props.translate('enter_new_email')} type="text" onChange={() => {
                            setEmailChange(event.target.value)
                        }} onKeyDown={() => {
                            if (event.key === 'Enter') {
                                axios.put(`${api}/users/update/email`, { email: emailChange }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                                    setEmailChange('')
                                    setChangingEmail(false)
                                    // props.setData((prev) => {
                                    //     return {
                                    //         ...prev,
                                    //         user_data: {
                                    //             ...prev.user_data,
                                    //             display_name: response.data.user_data.display_name
                                    //         }
                                    //     }
                                        
                                    // })
                                })
                            }
                        }} />
                        :
                        <button className="mb-[20px] mr-auto" onClick={() => {
                            setChangingEmail(true)
                        }}>{props.translate('change_email')}</button>
                    }
                    <button className="flex" onClick={() => {
                        props.setLang(prevLang => {
                            if (prevLang === 'en') {
                                return 'ja'
                            } else {
                                return 'en'
                            }
                        })
                    }}>
                        <p>{props.translate('language')}</p>
                        <p className="ml-auto">{props.translate('lang')}</p>
                    </button>
                </div>
                <hr className="my-[14px]" />
                <div className="px-[20px] flex flex-col mb-[8px]">
                    <button className="flex" onClick={() => {
                        window.localStorage.removeItem('jwt')
                        navigate('/')
                    }}>
                        <p>{props.translate('logout')}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}