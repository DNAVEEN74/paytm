import AppBar from '../components/appBar'
import BalanceComponent from '../components/balanceComp'
import Users from '../components/users'
import '../styles/dashboard.css'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const users = ['User1', 'User2', 'User3','User1', 'User2']
    const navigate = useNavigate();

    return (
        <div className="dashboardContainer">
            <AppBar />
            <BalanceComponent />
            <Users />
            <div className="usersSubContainer">
                {users.map((user, index) => (
                    <div className='userFields' key={index}>
                        <div style={{
                            display:'flex',
                            width:'150px',
                            justifyContent:'space-between',
                            alignItems:'center',
                            gap:'12px'
                        }} >
                            <div className="avatar-circle">{user[0]}</div>
                            <p style={{
                                flexGrow:'1',
                                fontFamily:'sans-serif',
                                fontSize:'20px',
                                fontWeight:550
                            }} >{user}</p>
                        </div>
                        <button
                            className='sendMoneyButton'
                            onClick={() => navigate('/Send')}
                        >
                            Send Money
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}