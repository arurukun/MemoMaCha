import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userAction'

export const Header = ({history}) => {
  const {userInfo}=useSelector((s)=>s.userLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    // if(userInfo)
  },[userInfo])

  const logoutHandler=()=>{
    dispatch(logout())

    history.push("/login")
  }

  return (
    <div className='bg-gradient-to-r from-green-600 to-green-800 py-3 border-b-2 border-orange-800 '>
      <div className='container flex flex-row justify-between md:items-center '>
        <h1 className='text-4xl font-bold text-lime-100'><Link to="/">MemoMaCha</Link></h1> 
        <div className="md:w-3/12  sm:h-full sm:w-full">
          {userInfo&&userInfo._id ? 
          <div className="md:flex justify-around md:items-center w-full  sm:flex sm:felx-col ">
            <Link to="/user/profile">
              <div className="flex ">
                <img src={userInfo.image} className="photo-img"></img>
                <p className='text-2xl font-bold text-lime-100'>{userInfo.name}</p> 
              </div>
            </Link>
            <button onClick={logoutHandler} className="text-xl  text-lime-100 sm:t-4">Log Out</button>
          </div>
          : <Link to="/login" className="text-xl  text-lime-100 text-center">Sign In</Link>}
        </div>  
      </div>
    </div>
  )
}
