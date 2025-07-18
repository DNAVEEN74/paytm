import '../styles/signIn.css';
import Header from "../components/header";
import SubHeading from "../components/subHeading";
import InputBox from '../components/inputBox';
import ButtonComponent from '../components/button';
import BottomWarning from '../components/bottomWarning';

export default function SignIn() {

    const inputFields = [
        {title: 'Email', placeholder: 'Enter your email address'},
        {title:'Password', placeholder:'Enter your password'}
    ]

    return (
        <div className="signInOuterContainer">
            <div className="signInContainer">
                <Header title={'SignIn'} />
                <SubHeading SubHeading={'Enter your credentials to access your account'} />
                {inputFields.map((field, index) => (
                    <InputBox key={index} title={field.title} placeholder={field.placeholder} />
                ))}
                <ButtonComponent type={'SignIn'} />
                <BottomWarning text={'Dont have an account?'} hyperText={'SignUp'} />
            </div>
        </div>
    )
}