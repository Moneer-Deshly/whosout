import Button from "@/lib/components/Button"

export default function page() {
    return (
        <main className="h-screen flex flex-col gap-32">
            <h1 className="text-primary text-center mouse-memoirs-regular text-[10rem]">Who's Out</h1>
            <div className="flex items-center justify-center w-full flex-col gap-2 text-[3rem]">
                <div className="grid grid-cols-2 gap-2">
                    <Button text="Create Lobby"/>
                    <Button text="Join Lobby"/>
                </div>
                <Button text="How To Play" />
            </div>
        </main>
    )
}