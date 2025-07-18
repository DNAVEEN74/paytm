import BottomWarning from '../components/bottomWarning';
import ButtonComponent from '../components/button';
import Header from '../components/header';
import InputBox from '../components/inputBox';
import SubHeading from '../components/subHeading';
import '../styles/signup.css';

export default function SignUp() {

    const inputFields = [
        { title: 'First Name', placeholder: 'Enter your first name' },
        { title: 'Last Name', placeholder: 'Enter your last name' },
        { title: 'Email', placeholder: 'Enter your email address' },
        { title: 'Password', placeholder: 'Create a password' }
    ]

    return (
        <div className="SignUpOuterContainer">
            <div className="signUpContainer">
                <Header title={'SignUp'} />
                <SubHeading SubHeading={"Enter your information to create an account"} />
                {inputFields.map((field, index) => (
                    <InputBox key={index} title={field.title} placeholder={field.placeholder} />
                ))}
                <ButtonComponent type={'SignUp'} />
                <BottomWarning text={"Already have an account?"} hyperText={'SignIn'} />
            </div>
        </div>
    )
}