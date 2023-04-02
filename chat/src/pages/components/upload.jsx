import React from "react"
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function Upload(props) {

    const api = 'https://api.utesu.com'
    const [file, setFile] = React.useState(null);
    const [image, setImage] = React.useState(null);
    
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
        <div className='bg-neutral-100 flex flex-col mt-[40px] h-[170px]'>
            <img src="http://cdn.onlinewebfonts.com/svg/img_150954.png" alt="" className="w-[100px] mx-auto mt-[-5px]" />
            <p className="mx-auto my-auto">Click or drag 'n' drop to upload files!</p>
        </div>
    )

    return (
        <div className="z-10 fixed h-full w-full flex backdrop-blur">
            <div className="mx-auto my-auto w-[400px] bg-neutral-100 flex flex-col">
                {
                    file==null
                    ?
                    <>
                        <button className="z-10">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/344/496/small/x-transparent-free-png.png" alt="" className="w-[40px] fixed ml-[360px]" onClick={() => {
                                props.setUpload(false)
                            }} />
                        </button>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} dropMessageStyle={{backgroundColor: 'lightblue'}} label="Upload or drop a file" multiple={false} hoverTitle=' ' maxSize='20' children={children} />
                    </>
                    :
                    file.type.slice(0, 5) === 'image'
                    ?
                    <>
                        <div className="absolute ml-[20px] mt-[-40px] flex flex-col">
                            <img src={image} alt="" className="h-[130px] rounded mr-auto mb-[4px]" />
                            <p className="font-bold text-[1.3rem]">{file.name}</p>
                            <p>Uploading to General</p>
                        </div>
                        <div className="h-[210px] flex flex-col">
                            <div className="bg-neutral-200 mt-auto h-[50px] flex">
                                <button className="my-auto ml-[20px] mr-auto">Cancel</button>
                                <button className="bg-white px-[12px] py-[2px] my-auto mr-[20px] rounded" onClick={() => {
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    axios.post(`${api}/channels/${props.focusedChannel}/attachments`, formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
                                        }
                                    }).then(response => {
                                        props.setUpload(false)
                                        // props.setData((prev) => {
                                        //     return {
                                        //         ...prev,
                                        //         users: {
                                        //             ...prev.users,
                                        //             [response.data.users.snowflake]: {
                                        //                 avatar: response.data.users.avatar,
                                        //                 display_name: response.data.users.display_name
                                        //             }
                                        //         },
                                        //         channels: {
                                        //             ...prev.channels,
                                        //             [props.focusedChannel]: {
                                        //                 ...prev.channels[props.focusedChannel],
                                        //                 messages: [
                                        //                     {...response.data.message},
                                        //                     ...prev.channels[props.focusedChannel].messages,                       
                                        //                 ]
                                        //             }
                                        //         }
                                        //     }                 
                                        // })
                                    })
                                }}>Upload</button>
                            </div>
                        </div>
                    </> 
                    :
                    <></>
                }
            </div>
        </div>
    )
}