import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMemoA } from '../actions/memoAction'

export const MemoScreen = ({history}) => {
    const [tytle,setTytle]=useState("")
    const [content,setContent]=useState("")
    const {loading,memo,error}=useSelector((s)=>s.createMemo)
    const {userInfo}=useSelector((s)=>s.userLogin)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(!userInfo){
            history.push("/login")
        }
    },[userInfo,history])

    const submitHandler=()=>{
        dispatch(createMemoA(tytle,content))
        history.push("/")
    }
  return (
    <div>
        <div className='container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            <form className='md:w-3/5 mx-auto'>
                <input type="text" onChange={(e)=>setTytle(e.target.value)} value={tytle} placeholder='Enter the tytle' className='input font-bold my-4'></input>
                <textarea rows={7} onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Enter the memo' className='input h-990'></textarea>
            </form>
            <button onClick={submitHandler} className='btn'>Upload</button>
        </div>
    </div>
  )
}