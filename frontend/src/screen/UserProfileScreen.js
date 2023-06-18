import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserProfileA, updateUserProfileA } from '../actions/userAction'

export const UserProfileScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState("")
    const {loading,user,error}=useSelector((s)=>s.userProfile)
    const {success}=useSelector((s)=>s.userProfile)
    const {userInfo}=useSelector((s)=>s.userLogin)

    const dispatch=useDispatch()
    // const redirect=location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(!userInfo){
            history.push("/login")
        }else{
            if(!user || !user.name){
                dispatch(getUserProfileA())
            }else{
                console.log(userInfo)
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,userInfo,user,history])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage("Passwords doesn't much")
        }else{
            dispatch(updateUserProfileA({id:user._id,name,email,password}))
            history.push("/")
        }
    }
  return (
    <div className='container py-8'>
        <div className=' border-2 border-orange-800 flex flex-col md:w-6/12 mx-auto py-4'>
            <h1 className='tytle'>Profile</h1>
            <form className='p-3'>
                {loading && <div className='loading'>Loading...</div>}
                {error && <div className='error'>{error}</div>}
                {message && <div className='error'>{message}</div>}
                <div className='mt-3'>
                    <label className='mr-14'>Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)}  type="text" placeholder='Enter your Name' className='input'></input>
                </div>
                <div className='mt-3'>
                    <label className='mr-14'>Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter your Email' className='input'></input>
                </div>
                <div className='mt-3'>
                    <label className='mr-7' >Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter the new password' className='input'></input>
                </div>
                <div className='mt-3'>
                    <label className='mr-7' >Confirm Password</label>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" placeholder="confirm the password" className='input'></input>
                </div>
                <button onClick={submitHandler} className='btn btn-size-big'>Update</button>
            </form>
        </div>
    </div>
  )
}
