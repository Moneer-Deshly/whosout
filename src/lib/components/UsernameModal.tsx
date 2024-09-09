"use client"

import { useContext, useRef } from "react";
import Button from "./Button";
import { UsernameModalContext } from "@/lib/components/PagesWrapper";


export default function UsernameModal(){
    const usernameInputRef= useRef<HTMLInputElement>(null)
    const { showModal, setShowModal } = useContext(UsernameModalContext);

    const handleSubmitUsername = (e:React.FormEvent) =>{
        e.preventDefault()
        const username = usernameInputRef?.current?.value
        if(username && username.length > 0){
            localStorage.setItem("username", username)
            setShowModal(false)
        }
    }

    return (
      <dialog open={showModal} className="absolute inset-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-background text-white p-4 rounded w-1/3 h-1/3 flex items-center justify-center flex-col gap-2" onClick={(e)=>e.stopPropagation()}>
            <h1 className="mouse-memoirs-regular text-center text-[3rem]">Enter username</h1>
            <form onSubmit={handleSubmitUsername}>
              <input ref={usernameInputRef} className="p-2 rounded-md text-black"/>
              <Button type="submit" text="Create" onClick={handleSubmitUsername} classes="text-2xl"/>
            </form>
          </div>
        </div>
      </dialog>
    );
}