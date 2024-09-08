"use client"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {socket} from "../socket"
import { LobbyPlayers } from "../create/page";

import { useEffect, useRef, useState } from "react";

export default function Page(){

  const inputRef = useRef<HTMLInputElement>(null)
  const [players, setPlayers] = useState<string[]>([])

  useEffect(() => {
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  
  function onConnect() {
    console.log("successfully connected");
  }

  function onDisconnect() {
    console.log("successfully disconnected");
  }

  function handleJoinLobby(e:React.FormEvent){
    e.preventDefault()
    console.log("submitted")
    socket.emit("join", {lobbyId:inputRef?.current?.value, username:localStorage.getItem("username")})
  }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("lobbiesUpdate", (v)=>{
      if(v.length > 0){
        setPlayers([v[1]])
      }
    });

    return (
      <main className="h-screen flex flex-col gap-8 p-16 text-[3rem]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="mouse-memoirs-regular">Enter lobby code</p>
            <form onSubmit={handleJoinLobby} className="flex gap-2 items-center">
              <input className="bg-[#2d2d2d] text-[#e0e0e0] text-lg p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary h-10" ref={inputRef} />
              <button className="bg-secondary rounded-md h-10 w-10 flex items-center justify-center hover:bg-[#B24F75]">
                <FontAwesomeIcon
                  className="text-lg transform transition-transform duration-150"
                  icon={faArrowRight}
                  type="submit"
                />
              </button>
            </form>
        </div>
      </main>
    );
}