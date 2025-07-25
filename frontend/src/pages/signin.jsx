import '../styles/signIn.css';
import Header from "../components/header";
import SubHeading from "../components/subHeading";
import InputBox from '../components/inputBox';
import ButtonComponent from '../components/button';
import BottomWarning from '../components/bottomWarning';
import { useRecoilState } from 'recoil';
import { signInAtom } from '../atoms/sign_Up_In_Atom';

export default function SignIn() {
    const [signInData, setSignInData] = useRecoilState(signInAtom);

    const inputFields = [
        {name: 'email', title: 'Email', placeholder: 'Enter your email address'},
        {name:'password', title:'Password', placeholder:'Enter your password'}
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="signInOuterContainer">
            <div className="signInContainer">
                <Header title={'SignIn'} />
                <SubHeading SubHeading={'Enter your credentials to access your account'} />
                {inputFields.map((field, index) => (
                    <InputBox
                    key={index}
                    title={field.title}
                    name={field.name}
                    value={signInData[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange} />
                ))}
                <ButtonComponent type={'signIn'} />
                <BottomWarning text={'Dont have an account?'} hyperText={'SignUp'} />
            </div>
        </div>
    )
}