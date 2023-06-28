import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserProfileA, updateUserProfileA } from '../actions/userAction'
import axios from 'axios'

export const UserProfileScreen = ({location,history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [image,setImage]=useState("")
    const [message,setMessage]=useState("")
    const [uploading,setUploading]=useState(false)
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
                setImage(user.image)
            }
        }
    },[dispatch,userInfo,user,history])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage("Passwords doesn't much")
        }else{
            dispatch(updateUserProfileA(name,email,password,image))
            history.push("/")
        }
    }

    const uploadingHandler=async(e)=>{
        const file=e.target.files[0]
        const formDate=new FormData()
        formDate.append("image",file)
        setUploading(true)
        try{
            const config={headers:{"Content-Type":"multipart/form-data"}}
            const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadApi`,formDate,config)
            console.log(data)
            setImage(data)
            setUploading(false)
        }catch(e){
            setUploading(false)
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
                <div className='mt-3'>
                <form action="/upload" method="/POST" encrtype="multipart/form-data" onChange={uploadingHandler}>
                    <label for="image" className='mr-7' >Upload Image</label>
                    <input type="file" name="image" id="image" className='input'></input>
                </form>
                </div>
                <button onClick={submitHandler} className='btn btn-size-big'>Update</button>
            </form>
        </div>
    </div>
  )
}
