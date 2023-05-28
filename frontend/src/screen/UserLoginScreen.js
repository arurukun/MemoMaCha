import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLonginA } from '../actions/userAction'

export const UserLoginScreen = ({location,history}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {loading,userInfo,error}=useSelector((s)=>s.userLogin)

    const dispatch=useDispatch()
    const redirect=location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[dispatch,userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(userLonginA(email,password))
    }
  return (
    <div className='container py-8'>
        <div className=' border-2 border-orange-800 flex flex-col md:w-6/12 mx-auto py-4'>
            <h1 className='tytle'>Login</h1>
            <form className='p-3'>
                {loading && <div className='loading'>Loading...</div>}
                {error && <div className='error'>{error}</div>}
                <div>
                    <label className='mr-14'>Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Enter your Email' className='input'></input>
                </div>
                <div className='mt-3'>
                    <label className='mr-7' >Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your Password' className='input'></input>
                </div>
                <button onClick={submitHandler} className='btn'>Sign In</button>
                <p>Are you a first visiter?<Link to={redirect ? `register?redirect=${redirect}` : "/register"} className='underline'>Register here</Link></p>
            </form>
        </div>
    </div>
  )
}
