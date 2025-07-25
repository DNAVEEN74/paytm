import { useRecoilValueLoadable } from 'recoil';
import AppBar from '../components/appBar';
import BalanceComponent from '../components/balanceComp';
import Users from '../components/users';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { userListSelector } from '../atoms/usersatom';
import { useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const usersListLoadable = useRecoilValueLoadable(userListSelector);
    const navigate = useNavigate();

    useEffect(() => {
        async function authenticate () {
            const token = localStorage.getItem('authToken')
        
            if(!token) {
                navigate('/SignUp')
            }
            
            const response = await axios.get('http://localhost:3000/api/v1/user/authenticate', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = response.data;
            if(data.message !== 'authorized') {
                navigate('/SignIn')
            }
        }

        authenticate();
    }, [])

    let content = null;

    if (usersListLoadable.state === 'loading') {
        content = <p>Loading users...</p>;
    } else if (usersListLoadable.state === 'hasError') {
        content = <p>Error loading users</p>;
    } else if (usersListLoadable.state === 'hasValue') {
        const users = usersListLoadable.contents;

        content = users.map((user, index) => (
            <div className='userFields' key={index}>
                <div style={{
                    display: 'flex',
                    width: '150px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                }} >
                    <div className="avatar-circle">{user.firstName[0]}</div>
                    <p style={{
                        flexGrow: '1',
                        fontFamily: 'sans-serif',
                        fontSize: '20px',
                        fontWeight: 550
                    }}>{user.firstName} {user.lastName}</p>
                </div>
                <button
                    className='sendMoneyButton'
                    onClick={() => navigate('/Send')}
                >
                    Send Money
                </button>
            </div>
        ));
    }

    return (
        <div className="dashboardContainer">
            <AppBar />
            <BalanceComponent />
            <Users />
            <div className="usersSubContainer">
                {content}
            </div>
        </div>
    );
}