import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../../services/authServices'
import { setAuthorizationHeader } from '../../services/interceptors'
import { deleteStorage, getStorageDate, setStorageData } from '../../utils/localStorage'
import { notifyUser } from '../../utils/notify'
import { api } from '../../services/api'


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUserData, setLoadingUserData] = useState(false)
  const navigate = useNavigate()
  const token = getStorageDate('TOKEN')
  const isAuthenticated = !!token

  useEffect(() => {
    const id = getStorageDate('USER_ID')
    const name = getStorageDate('USER_NAME')
    const email = getStorageDate('USER_EMAIL')
    if(!user && id && name && email) {
      setUser({
        id,
        name,
        email
      })
    }
  }, [user])

  async function userSignIn(loginstate) {
    try {
      setLoadingUserData(true)
      const response = await signIn(loginstate)
      setLoadingUserData(false)
      const { accessToken } = response.data
      setStorageData('TOKEN', accessToken)
      setStorageData('USER_ID', response.data.id)
      setStorageData('USER_NAME', response.data.name)
      setStorageData('USER_EMAIL', response.data.email)
      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      })
      setAuthorizationHeader(api.defaults, accessToken)
    } catch (error) {
      setLoadingUserData(false)
      if (error?.response?.data) {
        notifyUser(error?.response?.data.message, 'danger')
      }else {
        notifyUser('Unable to login. Please try again later.', 'danger')
      }
    }
  }

  async function userSignUp(registerState) {
    try {
      setLoadingUserData(true)
      const response = await signUp(registerState)
      setLoadingUserData(false)
      if(response.status === 200) {
        notifyUser("User registration successful, please login to continue", 'success')
        navigate('/login')
      }
      console.log("signup response == ", response);
    } catch (error) {
      setLoadingUserData(false)
      if (error?.response?.data) {
        notifyUser(error?.response?.data.message, 'danger')
      }else {
        notifyUser('Unable to signup. Please try again later.', 'danger')
      }
    }
  }

  function signOut(pathname = '/login') {
    setUser(null)
    deleteStorage()
    navigate(pathname)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      loadingUserData,
      user,
      userSignIn,
      userSignUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
