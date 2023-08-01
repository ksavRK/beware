import { useContext } from 'react';
import { Header } from "../components/Header";
import { Signup } from "../components/Signup";
import { AuthContext } from '../context/AuthContext';
import { notifyUser } from '../utils/notify';

export const SignupPage = () => {
    const { userSignUp } = useContext(AuthContext)

    //handle Signup API Integration here
    const createAccount= async (signupState) =>{
        console.log("signup state = ", signupState);
        try {
            await userSignUp(signupState)
        } catch(err) {
            notifyUser("Something went wrong. Please try again later.", 'danger')
        }
    }

    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup createAccount={(userData) => createAccount(userData)}/>
        </>
    )
}