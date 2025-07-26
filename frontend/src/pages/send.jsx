import '../styles/send.css'
import Header from "../components/header";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { recepientAtom } from '../atoms/usersatom';
import { useNavigate } from 'react-router-dom';

export default function Send() {
    const [amount, setAmount] = useState(0);
    const recipientData = useRecoilValue(recepientAtom);
    const navigate = useNavigate();

    async function doTransaction() {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert("User not authenticated. Please sign in again.");
                navigate('/SignIn');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/v1/account/transferMoney',
                {
                    amount,
                    recipientId: recipientData.recipientId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
                alert('💸 Transfer successful!');
                navigate('/Dashboard');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error("Transfer failed:", error);

            const errorMessage =
                error?.response?.data?.message || 'An unexpected error occurred.';

            alert(`❌ Transfer failed: ${errorMessage}`);
        }
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    return (
        <div className="sendPage">
            <div className="sendContainer">
                <Header title={'Send Money'} />
                <div className='sendSubHeader'>
                    <div className="avatar-circle">{recipientData.firstname[0]}</div>
                    <p>{recipientData.firstname} {recipientData.lastname}</p>
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