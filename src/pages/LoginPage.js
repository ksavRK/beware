import { useNavigate } from 'react-router'
import { Header } from '../components/Header'
import { Login } from '../components/Login'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { notifyUser } from '../utils/notify'

export const LoginPage = () => {
    const navigate = useNavigate()
    const { userSignIn } = useContext(AuthContext)

    //Handle Login API Integration here
    const authenticateUser = async (loginState) =>{
        console.log('login state = ', loginState);
        try {
            await userSignIn(loginState)
        }catch(err) {
            console.log("error in signin page == ", err);
            notifyUser('Something went wrong. Unable to login', 'danger')
        }
        // navigate('/dashboard')
    }

    return(
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login authenticateUser={(userData) => authenticateUser(userData)}/>
        </>
    )
}