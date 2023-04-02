import { useNavigate } from "react-router-dom";
import React from "react"

export default function Main(props) {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate("/")
    }, [])

    return (
        <div className="h-screen w-full flex">
            <div className="m-auto flex flex-col w-[600px]">
                <p className="font-bold text-9xl mx-auto">utesu</p>
                <div className="flex flex-col mt-8">
                    {/* <button className="border shadow-md border-neutral-400 font-bold text-2xl w-full py-3 rounded mb-4" onClick={() => {
                        navigate('/auth/login')
                    }}>{props.translate('login_with_google')}</button> */}
                    <button className="border shadow-md border-neutral-400 font-bold text-2xl w-full py-3 rounded" onClick={() => {
                        navigate('/login')
                    }}>{props.translate('login_with_email')}</button>
                </div>
            </div>
        </div>
    )
}