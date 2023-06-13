import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMemoA, editMemoA, getMemoA } from '../actions/memoAction'
import { getSearchUserA } from '../actions/userAction'

export const EditMemoScreen = ({match,history}) => {
    const [tytle,setTytle]=useState("")
    const [content,setContent] = useState("")
    const [disabled,setDisabled]=useState(true)
    const [userKeyword,setUserKeyword]=useState("")
    const [selectedUser,setSelectedUser]=useState(null)

    const {userInfo}=useSelector((s)=>s.userLogin)
    const {loading,memo,error}=useSelector((s)=>s.getMemo)
    const {loading:loadingSearchUser, searchUserList,error:errorSearchUser} = useSelector((s)=>s.getSearchUser)
    const dispatch=useDispatch()
    const memoId=match.params.id

    useEffect(()=>{
        if(userInfo){
            if(memo==null || memo._id !== memoId){
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

    const saveHandler=()=>{
        dispatch(editMemoA(match.params.id,tytle,content))
        history.push("/")
    }

    const deleteHandler=()=>{
        dispatch(deleteMemoA(match.params.id))
        history.push("/")
    }

    const onChangeHandler=(e)=>{
        setUserKeyword(e.target.value)
        dispatch(getSearchUserA(userKeyword))
    }

    const writePermissionHandler=(e)=>{
        e.preventDefault()
        // dispatch(givewriteA(match.params.id,selectedUser))
    }

    const readPermissionHandler=(e)=>{
        e.preventDefault()
        // dispatch(giveReadA(match.params.id,selectedUser))
    }
  return (
    <div>
        <div className='container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            <form className='md:w-3/5 mx-auto'>
                <input type="text" onChange={(e)=>setTytle(e.target.value)} value={tytle} disabled={disabled} placeholder='Enter the tytle' className='next_input '></input>
                <textarea rows={7} onChange={(e)=>setContent(e.target.value)} value={content} disabled={disabled} placeholder='Enter the memo' className='input h-990'></textarea>
                    {memo&&memo.writeUser&&memo.writeUser.includes(userInfo._id) && disabled ? 
                        <div className='flex justify-center'> 
                            <button onClick={editBtnHandler} className='btn btn-size-big'>Edit</button> 
                        </div>
                        :
                        <div className='grid grid-cols-4 gap-6'> 
                            <button onClick={deleteHandler} className="col-span-2 btn btn-size-big">Delete</button>
                        <button onClick={saveHandler} className="col-span-2 btn btn-size-big">Save</button>
                        </div>
                    }
            </form>

 
            <div class="md:flex md:flex-row md:justify-around md:items-center my-6">
                {/* {searchUserList==undefined && <p className=''>// Give your friends the permissions? //</p>} */}
                <p className=''>Give your friends the permissions</p>
                <div className='md:w-6/12 '>
                <input type ="text" value={userKeyword} onChange={onChangeHandler} placeholder="Enter your frinend's user name or email" className='input' />    
                    {selectedUser && <button>{selectedUser.name}</button> } 
                </div>
                
            </div>
        
            {searchUserList && 
            <div className='border-2 border-green-600 shadow-2xl md:w-1/3 h-max mx-auto p-3 rounded-md bg-lime-100'>  
                {searchUserList && searchUserList.map((item)=>{
                    return (
                    <div className='flex'>
                        <img src={item.image} className='photo-img mb-2' ></img>
                        <button onClick={()=>{setSelectedUser(item);setUserKeyword("");}} class="" >{item.name}</button>
                        {/* searchUserList==null; <-- how can i reset it */}
                    </div>
                    )
                })}
            </div>
            }
            {/* aa.map((e)=>{setUser(e.target.value)}) */}
            {/* aa.map(e=>setUser(e.target.value)) */}

                {/* select the permissiond */}

            <div className='flex flex-col justify-center items-center'>
                    <div className='grid grid-cols-4 gap-4'>
                        <button className='col-span-2 text-green-600 font-extrabold'>Shra</button>
                        <button onClick={writePermissionHandler} className='col-span-1 btn btn-green'>Add the edit permission</button>
                        <button onClick={readPermissionHandler} className='col-span-1 btn btn-green'>Add the read only </button>
                    </div>
            </div>
  
        </div>
    </div>
  )
}
