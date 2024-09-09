"use client"
import { cn } from "../util";

type props = {
    text:string,
    onClick?:React.MouseEventHandler<HTMLButtonElement>, // remove the optional later
    classes?:string,
    id?:string,
    type?: "submit" | "reset" | "button" | undefined
}

export default function Button({text, onClick, classes, id, type}:props) {
    return (
      <button 
      id={id ? id : ""}
      type={type? type : "button"}
      onClick={onClick}
      className={cn("bg-secondary mouse-memoirs-regular rounded-md p-2 hover:bg-[#B24F75] transform transition-transform duration-150 hover:scale-105", classes)}>
        {text}
      </button>
    );
}
 