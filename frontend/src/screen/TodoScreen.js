import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodoA } from '../actions/todoAction'

export const TodoScreen = ({history}) => {
    const [category, setCategory] = useState("")
    const [todoItems, setTodoItems] = useState([{checkbox: false, list: ""}])
    const {loading,data,error}=useSelector((s)=>s.createTodo)
    const {userInfo}=useSelector((s)=>s.userLogin)
    const dispatch = useDispatch()

    useEffect(() => {},[userInfo,history])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(createTodoA(category,todoItems))
        history.push("/")
    }

    const deleteHandler=(e)=>{
        e.preventDefault()

    }

  return (
    <div>
        <div className='container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            <form className='md:w-3/5 mx-auto'>

                <div className='flex flex-col'>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        const updatedItems = [...todoItems];
                        updatedItems.push({checkbox: false, list: ""});
                        setTodoItems(updatedItems);
                    }} className='btn-green self-end'>+ Add to do list</button>
                </div>
                
                <input type="text" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder='Enter the category' className='next_input mb-4'></input>
                    {todoItems.map((item,i)=>{
                        return (
                        <div className='flex items-center mb-2 '>

                            <input type='checkbox' onChange={(e)=>{
                                // todoItems[i].checkbox = e.target.value.checked
                                const updatedItems = [...todoItems];
                                updatedItems[i].checkbox = e.target.checked;
                                setTodoItems(updatedItems);
                            }} value={item.checkbox} className='mr-4 form-checkbox w-8 h-8'>
                            </input>

                            <input type="text" onChange={(e)=>{
                                // todoItems[i].checkbox = e.target.value.checked
                                const updatedItems = [...todoItems];
                                updatedItems[i].list = e.target.value;
                                setTodoItems(updatedItems);
                            }} value={item.list} placeholder='Enter the content' className='input w-max'>
                            </input>

                            <button onClick={(e)=>{
                                e.preventDefault()
                                const updatedItems = [...todoItems];
                                updatedItems.splice(i, 1);
                                setTodoItems(updatedItems);
                            }} ><i className='fas fa-trash ml-2 fa-2x'></i></button>
                        </div>    
                        )
                    })}
                
            </form>
            <button onClick={submitHandler} className='btn btn-size-big'>Create</button>
        </div>
    </div>
  )
}
