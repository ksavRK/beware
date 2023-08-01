import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../../services/authServices'
import { notifyUser } from '../../utils/notify'
import { getCausesData, postCommentOnCause } from '../../services/dashboardServices'
import { AuthContext } from '../AuthContext'


export const DashboardConext = createContext({})

export function DashboardProvider({ children }) {
  const [causes, setCauses] = useState(null)
  const [dataLoading, setDataLoading] = useState(false)

  const { isAuthenticated, user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(isAuthenticated && !causes) {
      getCauses()
    }
  }, [isAuthenticated, causes])
  
  async function getCauses() {
    try {
      setDataLoading(true)
      const response = await getCausesData()
      console.log("response == ", response);
      setCauses(response?.data)
      setDataLoading(false)
    } catch (error) {
      setDataLoading(false)
      if (error?.response?.data) {
        notifyUser(error?.response?.data.message, 'danger')
      }else {
        notifyUser('Unable to load cause data. Please try again later.', 'danger')
      }
    }
  }

  async function postComment(comment, causeId) {
    console.log("data to post == ", comment, causeId);
    try {
      setDataLoading(true)
      const response = await postCommentOnCause({
        causeId: causeId,
        userId: user.id,
        comment: comment
      })
      console.log("response == ", response);
      // let newData = causes.find((cause) => cause._id === response?.data?.cause?._id)
      // console.log("new dada = ", newData );
      let newArr = causes
      newArr = newArr.map((arr) => arr._id === response?.data?.cause?._id ? response.data.cause : arr)
      console.log("mewaaa = ", newArr);
      setCauses(newArr)
      // setCauses(response?.data)
      setDataLoading(false)
    } catch (error) {
      setDataLoading(false)
      if (error?.response?.data) {
        notifyUser(error?.response?.data.message, 'danger')
      }else {
        notifyUser('Unable to post your comment. Please try again later.', 'danger')
      }
    }
  }
  

  return (
    <DashboardConext.Provider value={{
      causes,
      dataLoading,
      getCauses,
      postComment
    }}>
      {children}
    </DashboardConext.Provider>
  )
}
