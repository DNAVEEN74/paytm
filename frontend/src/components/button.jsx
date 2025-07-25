import { useRecoilValue, useSetRecoilState } from 'recoil';
import '../styles/signUp_In_Button.css'
import { signInAtom, signUpAtom } from '../atoms/sign_Up_In_Atom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAtom } from '../atoms/usersatom';

export default function ButtonComponent ({type}) {
    const signUpData = useRecoilValue(signUpAtom);
    const signInData = useRecoilValue(signInAtom);
    const setUserAtom = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const formType = type.toLowerCase();
    let data = formType === 'signup' ? signUpData :
               formType === 'signin' ? signInData : null;

    const handleSubmit = async () => {
        const isEmpty = Object.values(data).some(value => value.trim() === '');

        if (isEmpty) {
            alert('All fields must be filled.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/v1/user/${type}`, data)

            if (response.status === 201) {
                const { token, message, user } = response.data;
                localStorage.setItem('authToken', token);
                setUserAtom(user);

                alert(message);
                navigate('/Dashboard')
            } else {
                alert(`${type} failed: ${response.data.message}`)
            }

        } catch (error) {
            console.error(`Error during ${type}:`, error);
            alert('Something went wrong.');
        }

    }

    return (
        <>
        <button className="signUp_In_Button" onClick={handleSubmit} >{type}</button>
        </>
    )
}