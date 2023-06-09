import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodoA, editTodoA, getTodoA } from '../actions/todoAction'

export const EditTodoScreen = ({history,match}) => {
    const todoId=match.params.id
    const [category, setCategory] = useState("")
    const [todoItems, setTodoItems] = useState([])
    const [disabled,setDisabled]=useState(true)

    const {loading,todo,error}=useSelector((s)=>s.getTodo)
    const {userInfo}=useSelector((s)=>s.userLogin)
    const dispatch=useDispatch()

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

  return (
    <div>
        <div className='container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            <form className='md:w-3/5 mx-auto'>

                {todo && todo.writeUser.includes(userInfo._id) && disabled==false && 
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
                            }}  disabled={disabled} ><i className='fas fa-trash ml-2 fa-2x'></i></button>
                        </div>    
                        )
                    })}

                    {todo && todo.writeUser.includes(userInfo._id) && disabled ? 
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
        </div>
    </div>
  )
}
