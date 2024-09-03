import Button from "@/lib/components/Button"

export default function page() {
    return (
        <main className="h-screen">
            <h1 className="text-primary text-center mouse-memoirs-regular text-[5rem]">Who's Out</h1>
            <div className="flex items-center justify-center w-full flex-col gap-2 mt-10">
                <div className="grid grid-cols-2 gap-2">
                    <Button text="Create Lobby" classes={["rounded-md p-[0.5rem] hover:bg-[#B24F75] transform transition-transform duration-150 hover:scale-105"]}/>
                    <Button text="Join Lobby" classes={["rounded-md p-[0.5rem] hover:bg-[#B24F75] transform transition-transform duration-150 hover:scale-105"]}/>
                </div>
                <div>
                    <Button text="How To Play" classes={["rounded-md p-[0.5rem] hover:bg-[#B24F75] transform transition-transform duration-150 hover:scale-105"]}/>
                </div>
            </div>
        </main>
    )
}