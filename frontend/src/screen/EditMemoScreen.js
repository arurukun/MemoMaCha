import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMemoA } from '../actions/memoAction'

export const EditMemoScreen = ({match,history}) => {
    const [tytle,setTytle]=useState("")
    const [content,setContent] = useState("")
    const [disabled,setDisabled]=useState(true)
    const {loading,memo,error}=useSelector((s)=>s.getMemo)
    const {userInfo}=useSelector((s)=>s.userLogin)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(userInfo){
            if(memo==null){
                dispatch(getMemoA(match.params.id))
            }else{
                setTytle(memo.tytle)
                setContent(memo.content)
            }
        }
    },[dispatch,userInfo,memo,history])

    const editBtnHandler=(e)=>{
        e.preventDefault()
        setDisabled(false)
    }

    const saveHandler=()=>{}

    const deleteHandler=()=>{}
  return (
    <div>
        <div className='container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            <form className='md:w-3/5 mx-auto'>
                <input type="text" onChange={(e)=>setTytle(e.target.value)} value={tytle} disabled={disabled} placeholder='Enter the tytle' className='next_input '></input>
                <textarea rows={7} onChange={(e)=>setContent(e.target.value)} value={content} disabled={disabled} placeholder='Enter the memo' className='input h-990'></textarea>
                    {memo&&memo.writeUser.includes(userInfo._id) &&disabled ? 
                        <div className='grid grid-cols-4 gap-6'> 
                            <button onClick={editBtnHandler} className='col-span-2 btn'>Edit</button> 
                            <button className="col-span-2 btn">Delete</button>
                        </div>
                        :
                        <div className='grid grid-cols-4 gap-6'> 
                            <button onClick={saveHandler} className="col-span-2 btn">Save</button>
                            <button onClick={deleteHandler} className="col-span-2 btn">Delete</button>
                        </div>
                    }
            </form>
        </div>
    </div>
  )
}
