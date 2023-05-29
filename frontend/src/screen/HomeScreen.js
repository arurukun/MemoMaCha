import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const HomeScreen = ({history}) => {
  const {userInfo}=useSelector((s)=>s.userLogin)
  const [memoList, setMemoList] = useState([])
  const [toDoList, setToDoList] = useState([])


  useEffect(() => {
    // if(userInfo&&userInfo.user._id==)
  },[userInfo])

  const memoStartHandler=()=>{
    history.push("/memo")
  }

  return (
    <div>
      <div className='container'>
        <div className='flex flex-col justify-center items-start '>
            <h1 className='text-3xl'><span className='text-4xl'>MEMO</span> is </h1>
            <h1 className='text-3xl'>your thinking, mind and <span className='text-4xl'>Yourself</span></h1>
        </div>
        <div className='flex flex-col justify-center items-start pt-6'>
            <p>Let's start with MemoClear that was new released in 2023!</p>
            <p>Expand your idea and furthermore your life</p>
        </div>

        <div className='md:flex justify-end items-center my-4'>
          <div className='border border-orange-800 p-4 divide-y divide-yellow-950'>  
            <div>
              <h1 className='sm_tytle'>--Memo Box--</h1>
              <ul className='list'>
                <li>Freely descrive : Can be customaized</li>
                <li>Categorization : Searchable for tytle</li>
              </ul>
              <button onClick={memoStartHandler} className='btn'>Start</button>
            </div>
            <div>
              <h1 className='sm_tytle'>--To Do List--</h1>
              <ul className='list'>
                <li>Obviously : Easy to graps whether completed or not</li>
              </ul>
              <button className='btn'>Start</button>
            </div>
          </div>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2 border border-orange-800 w-6/12'>
          
        </div>

      </div>
    </div>
  )
}
