import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-center bg-[#0F375E] w-full h-15'>
        <img src="../image/logo.png" alt="logo" className='size-15 rounded-4xl absolute left-0'/>
        <h1 className="flex items-center text-[#999] text-3xl font-semibold text-shadow-lg/30 text-shadow-[#FFA14A]">Welcome my friend</h1>
    </div>
  )
}

export default Navbar