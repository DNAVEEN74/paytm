import '../styles/send.css'
import Header from "../components/header";
import axios from axios;
import { useState } from 'react';

export default function Send() {
    const [amount, setAmount] = useState(0)

    async function doTransaction () {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`http://localhost:3000/api/v1/account/transferMoney`, {
            headers: {
                        Authorization: `Bearer ${token}`,
                    },
        })
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

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
                    <input type="text" placeholder='Enter Amount' value={amount} onChange={handleAmountChange} />
                </div>
                <button className='transferButton' onClick={doTransaction} >Initiate Transaction</button>
            </div>
        </div>
    )
}