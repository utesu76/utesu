import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

import '../index.css'

const api = 'https://api.utesu.com'

export default function Join(props) {
    const navigate = useNavigate();
    const { channel } = useParams();
    const [data, setData] = React.useState({})
    React.useEffect(() => {
        if (window.localStorage.getItem('jwt') == null) {
            navigate("/login")
        } else {
            axios.get(`${api}/channels/${channel}`, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
                setData(response.data)
            }).catch((err) => {
                navigate("/login")
            })
        }
    }, [])
    
    function join() {
        axios.post(`${api}/channels/${channel}/join`, {}, { headers: { 'Authorization': `Bearer ${window.localStorage.getItem('jwt')}` } }).then((response) => {
            navigate("/channels/me")
        }).catch((err) => {
            navigate("/login")
        })
    }

    return (
        <div className='h-screen w-screen flex'>
            <div className='sm:w-[450px] w-[360px] bg-neutral-100 m-auto rounded-[10px] flex flex-col px-[20px]'>
                <img src={data.avatar} className='mx-auto w-[100px] h-[100px] rounded-full my-[20px]' alt="" />
                <p className='mx-auto'>あなたに招待が来ています</p>
                <p className='text-2xl font-bold mx-auto'>{data.display_name}</p>
                <button className='w-full bg-blue-500 text-white rounded h-[40px] my-[20px]' onClick={() => {
                    join()
                }}>
                    {data.display_name}に参加する
                </button>
            </div>
        </div>
    )
}