import '../styles/signUp_In_Button.css'

export default function ButtonComponent ({type}) {
    return (
        <>
        <button className="signUp_In_Button">{type}</button>
        </>
    )
}