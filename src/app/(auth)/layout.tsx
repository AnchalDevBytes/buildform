"use client"
import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import React from 'react'

const AuthLayout = ({ children } : { children : React.ReactNode     }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
        <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
            <Logo/>
            <div className='flex gap-4 items-center'>
              <ThemeSwitcher/>
            </div>
        </nav>
        <main className='w-full flex flex-grow h-full items-center justify-center'>
            {children}
        </main>
    </div>
  )
}

export default AuthLayout;
