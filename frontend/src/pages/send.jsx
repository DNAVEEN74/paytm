import '../styles/send.css'
import Header from "../components/header";

export default function Send() {
    return (
        <div className="sendPage">
            <div className="sendContainer">
                <Header title={'Send Money'} />
                <div className='sendSubHeader'>
                    <div className="avatar-circle">u</div>
                    <p>Friends name</p>
                </div>
                <div className='amountInputContainer'>
                    <p>Amount</p>
                    <input type="text" placeholder='Enter Amount' />
                </div>
                <button className='transferButton' >Initiate Transaction</button>
            </div>
        </div>
    )
}