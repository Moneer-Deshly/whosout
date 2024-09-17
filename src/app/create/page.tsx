"use client"

import Button from "@/lib/components/Button"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import ShortUniqueId from "short-unique-id";
import { socket } from "../socket";
import { UsernameModalContext } from "@/lib/components/PagesWrapper";
import { useRouter } from "next/navigation";

interface Player {
    username: string;
    socketId: string;
}

export default function page() {
    const [isCopied, setIsCopied] = useState(false);
    const [link, setLink] = useState("")
    const [players, setPlayers] = useState<Player[]>([]);
    const { setShowModal } = useContext(UsernameModalContext);
    const router = useRouter()

    useEffect(()=>{
        if(!localStorage.getItem("username")){
            setShowModal(true)
        }
    },[])

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            setShowModal(false)
        };
    }, [link]); 

    function onConnect() {
        console.log("successfully connected")
    }

    function onDisconnect() {
        console.log("successfully disconnected");
    }

    const handleCreation = () => {
        const uid = new ShortUniqueId({ length: 8 });
        const lobbyId = uid.rnd()
        setLink(lobbyId);
        socket.emit("create", {lobbyId, username: localStorage.getItem("username")});
    }

    const showCopiedMessage = () => {
        if (isCopied) {
            return (<div className="text-sm">Key copied!</div>)
        }
    }

    function startGame() {
        socket.emit("startGame", {lobbyId: link});
    }

    socket.on("game-starting", (v:string) => {
        router.push(`/game/${v}`);
        });

    socket.on("lobbiesUpdate", (v: Player[]) => { 
        if (v.length > 0) {
            setPlayers([...v]);
        }
    });

    return (
        <div className="grid grid-cols-1 place-items-center">
            <div className="grid grid-cols-1 place-items-center">
                <div className="flex flex-col items-center"><Button text="Generate Lobby Key" onClick={handleCreation} classes="text-[3rem]"/></div>
                <div className="flex flex-col items-center w-full"><CopyTextField setIsCopied={setIsCopied} link={link}/><div className="mt-1 min-h-10">{showCopiedMessage()}</div></div>
            </div>
            <LobbyPlayers players={players}/>
            {players.length > 0 &&(
                <div className="flex flex-col items-center mt-2">
                    <Button text="Start Game" onClick={startGame} classes="text-[3rem]"/>
                </div>
            )}
        </div>
    )
}

const CopyTextField = ({setIsCopied, link}:{setIsCopied: Dispatch<SetStateAction<boolean>>, link: string}) => {

    const handleCopy = () => {
        if (link) {
            navigator.clipboard.writeText(link);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 500);
        }
    }

    return (
        <div className="bg-[#2d2d2d] rounded-md mt-2 w-full relative focus-within:outline focus-within:outline-secondary">
            <input type="text" value={link} readOnly className="bg-[#2d2d2d] text-[#e0e0e0] p-2 rounded-md focus:outline-none w-[90%]"/>
            <button onClick={handleCopy} className="p-2 hover:bg-secondary rounded-md transform transition-transform duration-150 ml-auto w-[10%] absolute top-0 right-0"><FontAwesomeIcon icon={faClipboard} /></button>
        </div>
    )
}

export function LobbyPlayers({ players }: { players: Player[] }) {
    return (
        <div className="flex flex-col items-center">
            <div className="mouse-memoirs-regular w-full flex flex-col items-center">
                <h2 className="text-7xl">Connected Players</h2>
                <ul className="grid grid-cols-2 text-5xl place-items-center gap-2 mt-4 w-full">
                    {players.length > 0 ? (
                        players.map((player, index) => (
                            <li key={index} className="text-center">{player.username}</li>
                        ))
                    ) : (
                        <li className="col-span-2 text-center">No players connected</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
