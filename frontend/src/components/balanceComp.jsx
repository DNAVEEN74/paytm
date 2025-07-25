import axios from "axios";
import { useEffect, useState } from "react";

export default function BalanceComponent() {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        async function fetchBalance () {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return setBalance(response.data.balance);
        }

        fetchBalance();
    }, [])

    return (
        <div style={{
            paddingTop:'20px',
            paddingBottom:'10px',
            boxSizing:'border-box'
        }}>
            <h2 style={{
                fontFamily:"sans-serif",
                paddingLeft:"20px",
                borderBottom:'1px solid rgba(0, 0, 0, 0.25)',
                height:'50px',
                margin:"0px"
            }} >
                Your Balance {balance}
            </h2>
        </div>
    )
}