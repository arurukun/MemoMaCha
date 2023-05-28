import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='bg-gradient-to-r from-green-600 to-green-800 py-8 border-b-2 border-orange-800 '>
      <div className='container'>
        <h1 className='text-4xl font-bold text-lime-100'><Link to="/">MemoMaCha</Link></h1>   
      </div>
    </div>
  )
}
