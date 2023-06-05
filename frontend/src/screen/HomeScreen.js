import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import { listMemoA } from '../actions/memoAction'
import { listTodoA } from '../actions/todoAction'

export const HomeScreen = ({history}) => {
  const {userInfo}=useSelector((s)=>s.userLogin)
  const {data:listMemo}=useSelector((s)=>s.listMemo)
  const {data:listTodo}=useSelector((s)=>s.listTodo)

  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo){
      dispatch(listMemoA())
      dispatch(listTodoA())
    }
  },[userInfo, dispatch])

  const memoStartHandler=()=>{
    history.push("/memo")
  }

  const todoStartHandler=()=>{
    history.push("/todo")
  }

  return (
    <div>
      <div className='container'>

        <div className='md:flex md:justify-between md:my-10'>

          {userInfo ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 border-2 border-orange-800 p-4 shadow-xl rounded-md mt-4 mr-4'>
        {listMemo&&listMemo.map((memo)=>{return(
          <Link to="">
            <div className='border border-orange-800 text-sm p-2 rounded-md shadow-xl hover:border-2'>
              <div className='font-bold mx-2'>{memo.tytle.length>10 ? memo.tytle.substring(0,10)+"..." : memo.tytle}</div>
              <div>{memo.content.length>30 ? memo.content.substring(0,30)+"..." : memo.content}</div>
            </div>
          </Link>
        )})}
        {listTodo&&listTodo.map((todo,i)=>{return(
          <Link to="">
            <div className='border border-orange-800 text-sm p-2 rounded-md shadow-xl hover:border-2'>
              <div className='font-bold mx-2'>{todo.category.length>10 ? todo.category.substring(0,10)+"..." : todo.category}</div>
              {todo.todoItems.map((item,i)=>{return(
                <div className={i<2?"":"hidden"}><i className={item.checkbox?"fas fa-check text-green-600":"fas fa-times text-red-500"}></i> {item.list.length>10 ? item.list.substring(0,10)+"..." : item.list}</div>
              )})}
            </div>
          </Link>
        )})}
      </div>
      ) : (
      <div>
        <div className='flex flex-col justify-center items-start '>
            <h1 className='text-3xl'><span className='text-4xl'>MEMO</span> is </h1>
            <h1 className='text-3xl'>your thinking, mind and <span className='text-4xl'>Yourself</span></h1>
        </div>
        <div className='flex flex-col justify-center items-start pt-6'>
            <p>Let's start with MemoMaCha that was new released in 2023!</p>
            <p>Expand your idea and furthermore your life</p>
        </div>
      </div>
        )}
          <div className='border border-orange-800 p-4 divide-y divide-yellow-950 my-4'>  
            <div>
              <h1 className='sm_tytle'>--Memo Box--</h1>
              <ul className='list'>
                <li>Freely descrive : Can be customaized as you like</li>
                <li>Categorization : Searchable for tytle</li>
              </ul>
              <button onClick={memoStartHandler} className='btn btn-size-big'>Start</button>
            </div>
            <div>
              <h1 className='sm_tytle'>--To Do List--</h1>
              <ul className='list'>
                <li>Obviously : Easy to graps whether completed or not</li>
              </ul>
              <button onClick={todoStartHandler} className='btn btn-size-big'>Start</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
