import React from "react"
import axios from 'axios';

export default function Image(props) {

    const api = 'https://api.utesu.com'

    return (
        <div className="z-10 fixed h-full w-full flex backdrop-blur p-20" onClick={() => {
            props.setPreview('')
        }}>
            <img src={props.preview} className="h-auto w-auto m-auto max-h-full max-w-full" alt="" />
        </div>
    )
}