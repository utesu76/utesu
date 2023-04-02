import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../index.css'

const api = 'https://api.utesu.com'

export default function Verify(props) {
    const [verify, setVerify] = React.useState()

    const [error, setError] = React.useState(null)

    const navigate = useNavigate();


    function confirm() {
        axios.post(`${api}/users/verify/register`, { code: verify }, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('reg')}` } }).then((response) => {
            window.localStorage.setItem('jwt', response.data.token)
            navigate("/channels/me")
        }).catch((err) => {
            setError('false_code')
        })
    }

    return (
        <div className='h-screen w-screen flex'>
            <div className='sm:h-[520px] sm:w-[450px] h-[460px] w-[360px] m-auto border border-neutral-300 rounded-[10px] flex flex-col'>
                <p className='mx-auto text-[2rem] my-[54px] sm:my-[66px]'>{props.translate('confirm')}</p>
                <p className={`fixed sm:mt-[140px] sm:ml-[40px] ml-[10px] mt-[120px] text-red-500 ${error?'':'hidden'}`}>{props.translate(error)}</p>
                <div className='sm:px-[40px] px-[10px] w-full mb-[20px]'>
                    <p className={`fixed mt-[-12px] ml-[10px] bg-white px-[10px] ${error?'text-red-500':''}`}>{props.translate('confirmation_code')}</p>
                    <input onChange={() => {
                        setVerify(event.target.value)
                    }} type="text" name="" id="code" className={`border ${error?'border-red-500':'border-neutral-300'} rounded w-full h-[40px] pl-[20px]`} />
                </div>
                <button className='bg-blue-500 text-white h-[40px] sm:mx-[40px] mx-[10px]  rounded' onClick={confirm}>{props.translate('continue')}</button>
                <div className='flex w-full mt-auto sm:ml-[40px] ml-[10px] mb-[34px]'>
                    <p>{props.translate('confirm_email_msg')}</p>              
                </div>
            </div>
        </div>
    )
}