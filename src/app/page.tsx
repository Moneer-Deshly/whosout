"use client"
import Button from "@/lib/components/Button"
import UsernameModal from "@/lib/components/UsernameModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
    const [isOpenModal, setOpenModal] = useState(false)
    const [clickSrc, setClickSrc] = useState("")

    const router = useRouter()

    const CheckUsernameExists = (e:React.MouseEvent<HTMLButtonElement>) =>{

        if (e.currentTarget?.id) setClickSrc(e.currentTarget?.id);

        const username = localStorage.getItem("username");
        if(!username){
            setOpenModal(true)
        }else{
            redirectToClickSrc(e.currentTarget.id);
        }
        
    }

    const redirectToClickSrc = (clickSrc: string) => {
      router.push(`/${clickSrc}`);
    };

    return (
      <main className="flex flex-col gap-32">
        <div className="flex items-center justify-center w-full flex-col gap-2 text-[3rem]">
          <div className="grid grid-cols-2 gap-2">
            <Button id="create" text="Create Lobby" onClick={CheckUsernameExists} />
            <Button id="join" text="Join Lobby" onClick={CheckUsernameExists} />
          </div>
          <Button text="How To Play" />
        </div>
        <UsernameModal isOpen={isOpenModal} setOpenModal={setOpenModal} clickSrc={clickSrc}/>
      </main>
    );
}

