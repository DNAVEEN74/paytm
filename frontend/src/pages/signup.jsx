import { useRecoilState } from 'recoil';
import BottomWarning from '../components/bottomWarning';
import ButtonComponent from '../components/button';
import Header from '../components/header';
import InputBox from '../components/inputBox';
import SubHeading from '../components/subHeading';
import '../styles/signup.css';
import { signUpAtom } from '../atoms/sign_Up_In_Atom';

export default function SignUp() {
    const [signUpData, setSignUpData] = useRecoilState(signUpAtom);

    const inputFields = [
        { name: 'firstname', title: 'First Name', placeholder: 'Enter your first name' },
        { name: 'lastname', title: 'Last Name', placeholder: 'Enter your last name' },
        { name: 'email', title: 'Email', placeholder: 'Enter your email address' },
        { name: 'password', title: 'Password', placeholder: 'Create a password' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="SignUpOuterContainer">
            <div className="signUpContainer">
                <Header title={'SignUp'} />
                <SubHeading SubHeading={"Enter your information to create an account"} />
                {inputFields.map((field, index) => (
                    <InputBox
                        key={index}
                        title={field.title}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={signUpData[field.name]}
                        onChange={handleChange}
                    />
                ))}
                <ButtonComponent type={'SignUp'} />
                <BottomWarning text={"Already have an account?"} hyperText={'SignIn'} />
            </div>
        </div>
    );
}