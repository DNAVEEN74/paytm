

export default function BottomWarning ({text, hyperText}) {
    return (
        <p style={{
            fontFamily:"sans-serif",
            opacity:"80%",
            margin:"0px auto",
            fontWeight:"600",
            fontSize:"medium"
        }}  >
            {text}
            <a href={`/${hyperText}`} style={{
                color:'black'
            }}>
                {hyperText}
            </a>
        </p>
    )
}