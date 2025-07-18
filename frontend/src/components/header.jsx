export default function Header({title}) {
    return (
        <>
        <h1 style={{
            fontFamily: "sans-serif",
            fontWeight:"bolder",
            margin:'0px auto',
            fontSize:"40px"
            }} > 
            {title} 
        </h1>
        </>
    )
}