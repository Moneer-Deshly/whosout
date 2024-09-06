import { cn } from "../util";

type props = {
    text:string,
    onClick?: () => void, // remove the optional later
    classes?:string,
}

export default function Button({text, onClick, classes}:props) {
    return (
      <button 
      onClick={onClick}
      className={cn("bg-secondary mouse-memoirs-regular rounded-md p-2 hover:bg-[#B24F75] transform transition-transform duration-150 hover:scale-105", classes)}>
        {text}
      </button>
    );
}
 