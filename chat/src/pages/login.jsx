import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../index.css'

const api = 'https://api.utesu.com'

export default function Login(props) {
    const [form, setForm] = React.useState({username: '', password: ''})
    const navigate = useNavigate();

    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        if (window.localStorage.getItem('jwt') !== null) {
            navigate("/channels/me")
        }
    }, [])

    function onUpdate(event) {
        setForm((prevFields) => {
            return {
              ...prevFields,
              [event.target.id]: event.target.value
            }
        })
    }

    function login() {
        axios.post(`${api}/auth/login`, form).then((response) => {
            window.localStorage.setItem('jwt', response.data.token)
            navigate("/channels/me")
        }).catch((err) => {
            if (err.response.status === 403) {
                window.localStorage.setItem('reg', err.response.data.token)
                navigate("/verify")
            } else {
                setError(true)
                console.log(err)
            }
        })
    }

    return (

        // React.useEffect(() => {
        //     document.getElementById('qrcode').innerHTML = ''

        //     const qrCode = new QRCodeStyling({
        //         width: window.innerWidth/2,
        //         height: window.innerWidth/2,
        //         type: "svg",
        //         imageOptions: {
        //             imageSize: 0.6,
        //             margin: 6
        //         },
        //         qrOptions: {
        //             errorCorrectionLevel: "H"
        //         }
        //     });
        
        //     qrCode.update({ image: "https://files.utesu.com/dbc92V.png", data: "https://qr.utesu.com/?u=894859674957767" })
        //     qrCode.append(document.getElementById("qrcode"))
        // }, [])

        // <div className='flex flex-col bg-blue-500 w-screen h-screen px-[20px]'>
        //     <p className='text-white text-lg my-[10px]'>{'< Collect'}</p>
        //     <div className='bg-white w-full mb-auto rounded-xl flex flex-col px-[20px]'>
        //         <p className='mr-auto text-2xl my-[14px]'>Pay Me</p>
        //         <hr className='' />
        //         <p className='mx-auto my-[40px] text-xl text-neutral-700' >Scan to pay me</p>
        //         <div id='qrcode' className='mx-auto'></div>
        //         <div className='flex text-neutral-500 my-[40px]'>
        //             <p className='mx-auto text-xl' >Specify an amount</p>
        //             <p className='mx-auto text-xl' >Save image</p>
        //         </div>
        //         <hr className='' />
        //         <p className='mr-auto text-2xl my-[14px]'>Transaction History</p>
        //     </div>
        // </div>

        <div className='h-screen w-screen flex'>
            <div className='sm:h-[520px] sm:w-[450px] h-[460px] w-[360px] m-auto border border-neutral-300 rounded-[10px] flex flex-col'>
                <p className='mx-auto text-[2rem] sm:my-[66px] my-[54px]'>{props.translate('login')}</p>
                <p className={`fixed sm:mt-[140px] sm:ml-[40px] ml-[10px] mt-[120px] text-red-500 ${error?'':'hidden'}`}>{props.translate('error')}</p>
                <div className='sm:px-[40px] px-[10px] w-full mb-[20px]'>
                    <p className={`fixed mt-[-12px] ml-[10px] bg-white px-[10px] ${error?'text-red-500':''}`}>{props.translate('username')}</p>
                    <input onChange={onUpdate} type="text" name="" id="username" className={`border ${error?'border-red-500':'border-neutral-300'} rounded w-full h-[40px] pl-[20px]`} />
                </div>
                <div className='sm:px-[40px] px-[10px] w-full mb-[20px]'>
                    <p className={`fixed mt-[-12px] ml-[10px] bg-white px-[10px] ${error?'text-red-500':''}`}>{props.translate('password')}</p>
                    <input onChange={onUpdate} type="password" name="" id="password" className={`border ${error?'border-red-500':'border-neutral-300'} rounded w-full h-[40px] pl-[20px]`} />
                </div>
                <button className='bg-blue-500 text-white h-[40px] sm:mx-[40px] mx-[10px] rounded' onClick={login}>{props.translate('login')}</button>
                <div className='flex w-full mt-auto sm:ml-[40px] ml-[10px] mb-[34px]'>
                    <p>{props.translate('create_account')}</p>  
                    <button className='text-blue-500 text-left' onClick={() =>{
                        navigate("/register")
                    }}>{props.translate('register')}</button>                  
                </div>
            </div>
        </div>
    )
}