import React from "react"
import axios from 'axios';

export default function ChannelsPopUp(props) {

    const api = 'https://api.utesu.com'

    return (
        <div className="fixed h-full w-screen flex backdrop-blur">
            <div className='bg-neutral-100 flex flex-col h-full w-3/4 border-r-[1px]'>
                <div className='flex h-[60px]'>
                <p className='my-auto mr-auto ml-[20px]'>chat.utesu</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/70/70115.png" className='h-[20px] w-[20px] mx-[20px] m-auto' alt="" onClick={() => {
                        props.setChannelView(false)
                    }} />
                </div>
                <div className='flex flex-col mb-auto pt-[1px]'>
                    {props.channels}
                    {/* <button className='h-[60px]' onClick={() => {
                            props.setChannel(true)
                        }}>
                        {props.translate('create_channel')}
                    </button> */}
                </div>
                <div className='flex' onClick={() => {
                        props.setSettings(prevSettings => !prevSettings)
                    }}>
                    <img className='w-[40px] rounded-full m-[10px]' src={props.data.user_data.avatar} alt="" />
                    <div className='my-auto'>
                        <p className='my-auto'>{props.data.user_data.display_name}</p>
                        <button className='my-auto text-neutral-700'>{props.translate('settings')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}