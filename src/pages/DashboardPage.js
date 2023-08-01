import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DashboardConext } from '../context/DashboardConext';

export const DashboardPage = () => {

  const [causeData, setCauseData] = useState([])
  const { signOut } = useContext(AuthContext)
  const { causes, getCauses, dataLoading } = useContext(DashboardConext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!dataLoading && causes) {
      setCauseData(causes)
    }
  }, [causes])

  const applySearch = (e) => {
      e.preventDefault()
      console.log(" you are searching for ", e.target.value);
  }

  const handleCauseCardClick = (e, cause) => {
    e.preventDefault()
    navigate('/cause', {state: cause})
  }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut()
  }
 
  return (
      <>
        <Navbar applySearch={(query) => applySearch(query)} showSearch={true} logout={handleLogout}/>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Causes Dashboard</h1>
          <div className="grid grid-cols-4 gap-4">
              {causeData.map((cause, index) => (
                <div key={index} className="bg-white p-4 shadow-md rounded-md hover:bg-purple-600" onClick={(e) => handleCauseCardClick(e, cause)}>
                    <h2 className="text-lg font-semibold mb-2">{cause.name}</h2>
                    <p className="text-gray-600 mb-2">Business: {cause.business}</p>
                    <p className="text-gray-600 mb-2">{cause.description}</p>
                </div>
              ))}
          </div>
        </div>
      </>
  )
}
