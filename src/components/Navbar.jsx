import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center backdrop-blur-xl bg-gradient-to-r from-[#0f2027]/80 via-[#203a43]/80 to-[#2c5364]/80 text-white px-10 py-4 xl shadow-md border-b border-slate-700'>
      <div className="logo">
        <span className='font-bold text-3xl tracking-wide drop-shadow-md'>iTask</span>
      </div>
      <ul className="flex gap-8 text-lg font-medium">
        <li className='cursor-pointer hover:text-cyan-300 hover:scale-105 transition-all duration-300'>Home</li>
        <li className='cursor-pointer hover:text-cyan-300 hover:scale-105 transition-all duration-300'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
