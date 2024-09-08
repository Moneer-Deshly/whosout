"use client"

import { Dispatch, SetStateAction, useRef } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

type ModalProps = {
  isOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  clickSrc: string,
};

export default function UsernameModal({isOpen, setOpenModal, clickSrc}: ModalProps){
    const usernameInputRef= useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleSubmitUsername = () =>{
        const username = usernameInputRef?.current?.value
        if(username && username.length > 0){
            localStorage.setItem("username", username)
            router.push(`/${clickSrc}`)
        }
    }

    return (
      <dialog open={isOpen} className="fixed inset-0" onClick={()=>{setOpenModal(false);}} >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-background text-white p-4 rounded w-1/3 h-1/3 flex items-center justify-center flex-col gap-2" onClick={(e)=>e.stopPropagation()}>
            <h1 className="mouse-memoirs-regular text-center text-[3rem]">Enter username</h1>
            <input ref={usernameInputRef} className="p-2 rounded-md text-black"/>
            <Button text="Create" onClick={handleSubmitUsername} classes="text-2xl"/>
          </div>
        </div>
      </dialog>
    );
}