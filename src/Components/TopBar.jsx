import React from 'react'
import { FaUserCircle } from "react-icons/fa";
const TopBar = ({name}) => {
  return (
    <div className='flex items-center rounded-xl justify-between px-6 py-4 bg-(--secondary-color) shadow-md'>
      <span className='text-md font-semibold'>Welcome to, {name}</span>
      <FaUserCircle className='text-gray-600 cursor-pointer' />
    </div>
  )
}

export default TopBar