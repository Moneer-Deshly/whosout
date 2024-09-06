import Button from "@/lib/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

export default function Page(){
    return (
      <main className="h-screen flex flex-col gap-8 p-16 text-[3rem]">
        <Link className="mouse-memoirs-regular w-fit" href={"/"}>
          <Button text="Back" />
        </Link>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="mouse-memoirs-regular">Enter lobby code</p>
          <div className="flex gap-2 items-center">
            <input className="bg-[#2d2d2d] text-[#e0e0e0] text-lg p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary h-10" />
            <button className="bg-secondary rounded-md h-10 w-10 flex items-center justify-center hover:bg-[#B24F75]">
              <FontAwesomeIcon
                className="text-lg transform transition-transform duration-150"
                icon={faArrowRight}
              />
            </button>
          </div>
        </div>
      </main>
    );
}