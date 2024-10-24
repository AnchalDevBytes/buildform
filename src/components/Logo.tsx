import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link 
        href={"/"}
        className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500 text-transparent bg-clip-text hover:cursor-pointer'
    >
        BuildForm
    </Link>
  )
}

export default Logo