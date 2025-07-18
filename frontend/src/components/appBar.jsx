import '../styles/appBar.css';

export default function AppBar() {
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
                    Hello, User
                </p>
                <div className="avatar-circle">U</div>
            </div>
        </div>
    )
}