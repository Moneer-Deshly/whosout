type props = {
    text:string,
    classes?:string[],

}

export default function Button({text, classes}:props) {
    return (
        <button className={`bg-secondary mouse-memoirs-regular ${classes?.join(" ")}`}>{text}</button>
    )
}