import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWriteUserTodoA,addReadUserTodoA,deleteTodoA, editTodoA, getTodoA } from '../actions/todoAction'
import { getSearchUserA } from '../actions/userAction'

export const EditTodoScreen = ({history,match}) => {
    const [category, setCategory] = useState("")
    const [todoItems, setTodoItems] = useState([])
    const [disabled,setDisabled]=useState(true)
    const [userKeyword,setUserKeyword]=useState("")
    const [selectedUser,setSelectedUser]=useState(null)

    const {userInfo}=useSelector((s)=>s.userLogin)
    const {loading,todo,error}=useSelector((s)=>s.getTodo)
    const {loading:loadingSearchUser, searchUserList,error:errorSearchUser} = useSelector((s)=>s.getSearchUser)
    const dispatch=useDispatch()
    const todoId=match.params.id

    useEffect(()=>{
        if(userInfo){
            if(todo == null || todo._id !== todoId){
                dispatch(getTodoA(todoId))
            }else{
                setCategory(todo.category)
                setTodoItems(todo.todoItems)
            }
        }
    },[dispatch,history,userInfo,todo])

    const editBtnHandler=(e)=>{
        e.preventDefault()
        setDisabled(false)
    }

    const saveHandler=()=>{
        dispatch(editTodoA(match.params.id,category,todoItems))
        history.push("/")
    }

    const deleteHandler=()=>{
        dispatch(deleteTodoA(match.params.id))
        history.push("/")
    }

    useEffect(()=>{
        dispatch(getSearchUserA(userKeyword))
    },[dispatch, userKeyword])

    const writePermissionHandler=(e)=>{
        e.preventDefault()
        dispatch(addWriteUserTodoA(match.params.id,selectedUser))
        setSelectedUser(null)
    }

    const readPermissionHandler=(e)=>{
        e.preventDefault()
        dispatch(addReadUserTodoA(match.params.id,selectedUser))
        setSelectedUser(null)
    }

  return (
    <div>
        <div className='container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            <form className='md:w-3/5 mx-auto'>

                {todo&&todo.writeUser&&(todo.writeUser.includes(userInfo._id) || todo.owner ==userInfo._id )
                && disabled &&
                <div className='flex flex-col'>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        const updatedItems = [...todoItems];
                        updatedItems.push({checkbox: false, list: ""});
                        setTodoItems(updatedItems);
                    }} className='btn-green self-end'>+ Add to do list</button>
                </div>
                }
                
                <input type="text" onChange={(e)=>setCategory(e.target.value)} value={category} disabled={disabled} placeholder='Enter the category' className='next_input mb-4'></input>
                    {todoItems.map((item,i)=>{
                        return (
                        <div className='flex items-center mb-2 '>

                            <input type='checkbox' onChange={(e)=>{
                                const updatedItems = [...todoItems];
                                updatedItems[i].checkbox = e.target.checked;
                                setTodoItems(updatedItems);
                            }} checked={item.checkbox} className='mr-4 form-checkbox w-8 h-8' disabled={disabled}>
                            </input>

                            <input type="text" onChange={(e)=>{
                                const updatedItems = [...todoItems];
                                updatedItems[i].list = e.target.value;
                                setTodoItems(updatedItems);
                            }} value={item.list} placeholder='Enter the content' className='input w-max' disabled={disabled}>
                            </input>

                            <button onClick={(e)=>{
                                e.preventDefault()
                                const updatedItems = [...todoItems];
                                updatedItems.splice(i, 1);
                                setTodoItems(updatedItems);
                            }}  disabled={disabled} ><i className='fas fa-trash ml-2 fa-2x'></i>
                            </button>
                        </div>    
                        )
                    })}

                {todo&&todo.writeUser&&todo.writeUser.includes(userInfo._id) && disabled &&
                    <div className='flex justify-center'> 
                        <button onClick={editBtnHandler} className='btn btn-size-big'>Edit</button> 
                    </div>
                }

                <div className='grid grid-cols-4 gap-6'> 
                    {!disabled &&
                        <button onClick={saveHandler} className="col-span-2 btn btn-size-big">Save</button>
                    }                    
                    {!disabled && todo && userInfo && todo.owner == userInfo._id &&
                            <button onClick={deleteHandler} className="col-span-2 btn btn-size-big">Delete</button>
                    }
                </div>
                
            </form>

            {todo && userInfo && todo.owner == userInfo._id && <div className="md:flex md:flex-row md:justify-around md:items-center">
                <div className='md:w-6/12 '>
                    <p className=''>Give your friends the permissions</p>
                    {selectedUser ? 
                        <div className='flex'>
                            <img src={process.env.REACT_APP_BACKEND_URL+"/static"+selectedUser.image} className='col-span-1 photo-img mb-2' ></img>
                            <button className='col-span-2 text-green-600 font-extrabold'>{selectedUser.name}</button>
                        </div>
                    : 
                        <input type ="text" onChange={(e)=>{setUserKeyword(e.target.value)}} value={userKeyword} placeholder="Enter your frinend's user name or email" className='input' />
                    }
                </div>
            </div>}

            {selectedUser &&
            <div className='flex flex-row justify-between items-center md:w-3/5 mx-auto'>
                    <div className='w-3/5 md:flex mx-auto'>
                        <button onClick={writePermissionHandler} className='col-span-1 btn btn-green'>Add the edit permission</button>
                        <button onClick={readPermissionHandler} className='col-span-1 btn btn-green'>Add the read only </button>
                    </div>
            </div> 
                } 
                
        
            {searchUserList && searchUserList.length >0 && 
            <div className='border-2 border-green-600 shadow-2xl md:w-1/3 h-max mx-auto p-3 rounded-md bg-lime-100'>  
                {searchUserList && searchUserList.map((item)=>{
                    return (
                    <div className='' key={item._id}>                      
                        <button onClick={()=>{setSelectedUser(item);setUserKeyword("");}} className="flex items-center" ><img src={process.env.REACT_APP_BACKEND_URL+"/static"+item.image} className='photo-img mb-2' />{item.name}</button>
                    </div>
                    )
                })}
            </div>
            }

        </div>
    </div>
  )
}
