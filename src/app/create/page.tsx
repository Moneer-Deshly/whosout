"use client"

import Button from "@/lib/components/Button"
import { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'


export default function page() {
    const [isCopied, setIsCopied] = useState(false);

    const generateLink = () => {
        console.log("link generated"); // implement logic later
    }

    const showCopiedMessage = () => {
        if (isCopied) {
            return (<div className="text-sm">Link copied!</div>)
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center"><Button text="Click to Create Link" onClick={generateLink} classes="text-[3rem]"/></div>
            <div className="flex flex-col items-center"><CopyTextField setIsCopied={setIsCopied}/><div className="mt-1">{showCopiedMessage()}</div></div>
        </div>
    )
}

const CopyTextField = ({setIsCopied}:{setIsCopied: Dispatch<SetStateAction<boolean>>}) => {
    const [link] = useState("http://google.com/") // change to the generated link later

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 500);
    }

    return (
        <div className="text-[1.084rem] bg-[#2d2d2d] rounded-md mt-2">
            <input type="text" value={link} readOnly className="bg-[#2d2d2d] text-[#e0e0e0] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"/>
            <button onClick={handleCopy} className="p-2 hover:bg-secondary rounded-md transform transition-transform duration-150"><FontAwesomeIcon icon={faClipboard} /></button>
        </div>
    )
}