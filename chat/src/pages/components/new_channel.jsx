import React from "react"
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function new_channel(props) {

    const api = props.api

    const [file, setFile] = React.useState(null);

    const [image, setImage] = React.useState('https://files.utesu.com/avatars/default.png');

    const [name, setName] = React.useState(`${props.data.user_data.display_name}${props.translate('someones_channel')}`);

    const handleChange = (file) => {
        setFile(file);
    };

    React.useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file])
  
    const children = (
        <img src={image} alt="" className="object-cover h-[80px] w-[80px] rounded-full mx-auto" />
    )

    return (
        <div className="z-10 fixed h-full w-full flex backdrop-blur">
            <div className="mx-auto my-auto w-[400px] bg-neutral-100 flex flex-col">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/344/496/small/x-transparent-free-png.png" alt="" className="fixed w-[40px] fixed ml-[360px]" onClick={() => {
                    props.setChannel(false)
                }}/>
                <p className="text-center font-bold text-2xl my-[20px]">{props.translate('customize_channel')}</p>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} dropMessageStyle={{backgroundColor: 'lightblue'}} label="Upload or drop a file" multiple={false} hoverTitle=' ' maxSize='20' children={children} />
                <div className="px-[20px] w-full my-[20px]">
                    <p className="fixed mt-[-12px] ml-[10px] bg-neutral-100 px-[10px]">{props.translate('channel_name')}</p>
                    <input type="text" value={name} onChange={() => {
                        if (event.target.value.length < 1) {
                            setName(`${props.data.user_data.display_name}${props.translate('someones_channel')}`)
                        } else {
                            setName(event.target.value)
                        }
                    }} className="w-full bg-neutral-100 pl-[20px] border border-neutral-300 h-[40px] rounded" />
                </div>
                <div className="bg-neutral-200 mt-auto h-[50px] flex">
                    <button className="my-auto ml-[20px] mr-auto">{props.translate('back')}</button>
                    <button className="bg-white px-[12px] py-[2px] my-auto mr-[20px] rounded" onClick={() => {
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('name', name);
                        axios.post(`${api}/channels/create`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                            }
                        }).then(response => {
                            props.setChannel(false)
                            props.setData((prev) => {
                                return {
                                    ...prev,
                                    channels: {
                                        ...prev.channels,
                                        [response.data.channels.snowflake]: response.data.channels
                                    }
                                }                 
                            })
                        })
                    }}>{props.translate('create_new_channel')}</button>
                </div>
            </div>
        </div>
    )
}