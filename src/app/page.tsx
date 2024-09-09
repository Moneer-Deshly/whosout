"use client"
import Button from "@/lib/components/Button"
import Link from "next/link";

export default function page() {
    return (
      <main className="flex flex-col gap-32">
        <div className="flex items-center justify-center w-full flex-col gap-2 text-[3rem]">
          <div className="grid grid-cols-2 gap-2">
            <Link href="/create"><Button id="create" text="Create Lobby" /></Link>
            <Link href="/join"><Button id="join" text="Join Lobby"/></Link>
          </div>
          <Button text="How To Play" />
        </div>
      </main>
    );
}

