import { useRecoilValue } from 'recoil';
import '../styles/appBar.css';
import { userAtom } from '../atoms/usersatom';

export default function AppBar() {
    const { firstname } = useRecoilValue(userAtom);

    return (
        <div className="appBarContainer">
            <p style={{
                fontFamily:'sans-serif',
                fontSize:'25px',
                fontWeight:'bold',
                margin:'0px'
            }} >
                Payments App
            </p>
            <div className="userField">
                <p style={{
                    fontFamily:"sans-serif",
                    fontWeight:'550',
                    fontSize:'18px'
                }} >
                    Hello,{firstname}
                </p>
                <div className="avatar-circle">{firstname[0]}</div>
            </div>
        </div>
    )
}