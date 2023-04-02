import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../index.css'

const api = 'https://api.utesu.com'

export default function Register(props) {
    const [form, setForm] = React.useState({email: '', username: '', password: ''})

    const [error, setError] = React.useState(null)

    const navigate = useNavigate();
    function onUpdate(event) {
        setForm((prevFields) => {
            return {
              ...prevFields,
              [event.target.id]: event.target.value
            }
        })
    }

    function register() {
        if (!form.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setError('incorrect_email')
            return
        } else if ( form.username.length < 3) {
            setError('short_username')
            return
        } else if ( form.password.length < 8) {
            setError('short_password')
            return
        } else {
            setError(false)
            axios.post(`${api}/auth/register`, form).then((response) => {
                window.localStorage.setItem('reg', response.data.token)
                navigate("/verify")
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message == 'Account with that username already exists') {
                    setError('username_in_use')
                }
            })
        } 
    }

    return (
        <div className='h-screen w-screen flex'>
            <div className='sm:h-[520px] sm:w-[450px] h-[460px] w-[360px] m-auto border border-neutral-300 rounded-[10px] flex flex-col'>
                <p className='mx-auto text-[2rem] my-[54px] sm:my-[66px]'>{props.translate('register')}</p>
                <p className={`fixed sm:mt-[140px] sm:ml-[40px] ml-[10px] mt-[120px] text-red-500 ${error?'':''}`}>{props.translate(error)}</p>
                <div className='sm:px-[40px] px-[10px] w-full mb-[20px]'>
                    <p className={`fixed mt-[-12px] ml-[10px] bg-white px-[10px] ${error=='incorrect_email'?'text-red-500':''}`}>{props.translate('email')}</p>
                    <input onChange={onUpdate} type="text" name="" id="email" className={`border ${error=='incorrect_email'?'border-red-500':'border-neutral-300'} rounded w-full h-[40px] pl-[20px]`} />
                </div>
                <div className='sm:px-[40px] px-[10px] w-full mb-[20px]'>
                    <p className={`fixed mt-[-12px] ml-[10px] bg-white px-[10px] ${error=='short_username'||error=='username_in_use'?'text-red-500':''}`}>{props.translate('username')}</p>
                    <input onChange={onUpdate} type="text" name="" id="username" className={`border ${error=='short_username'||error=='username_in_use'?'border-red-500':'border-neutral-300'} rounded w-full h-[40px] pl-[20px]`} />
                </div>
                <div className='sm:px-[40px] px-[10px] w-full mb-[20px]'>
                    <p className={`fixed mt-[-12px] ml-[10px] bg-white px-[10px] ${error=='short_password'?'text-red-500':''}`}>{props.translate('password')}</p>
                    <input onChange={onUpdate} type="password" name="" id="password" className={`border ${error=='short_password'?'border-red-500':'border-neutral-300'} rounded w-full h-[40px] pl-[20px]`} />
                </div>
                <button className='bg-blue-500 text-white h-[40px] sm:mx-[40px] mx-[10px]  rounded' onClick={register}>{props.translate('continue')}</button>
                <div className='flex w-full mt-auto sm:ml-[40px] ml-[10px] mb-[34px]'>
                    <p>{props.translate('have_an_account')}</p>
                    <button className='text-blue-500 text-left' onClick={() =>{
                        navigate("/login")
                    }}>{props.translate('login')}</button>                  
                </div>
            </div>
        </div>
    )
}