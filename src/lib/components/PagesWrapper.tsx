"use client"

import Link from "next/link"
import React, { createContext, useState } from "react"
import UsernameModal from "./UsernameModal"

export const UsernameModalContext = createContext({
    showModal: false,
    setShowModal: (show: boolean) => {}
  });

export default function PagesWrapper({children}: Readonly<{children: React.ReactNode}>){
    const [showModal, setShowModal] = useState(false);
    return(
        <React.Fragment>
                <UsernameModalContext.Provider value={{showModal, setShowModal}}>
                <UsernameModal/>
                <Link href={"/"}><h1 className="text-primary text-center mouse-memoirs-regular text-[10rem]">Who's Out</h1></Link>
                {children}
            </UsernameModalContext.Provider>
        </React.Fragment>
    )
  }

