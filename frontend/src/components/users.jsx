import '../styles/users.css'

export default function Users() {
    return (
        <div className="userContainer">
            <p style={{
                fontFamily:'sans-serif',
                fontWeight:'550',
                fontSize:'25px'
            }} >
                Users
            </p>
            <input className="searchBox" type="text" placeholder="Search users..." />
        </div>
    )
}