 import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Applayout() {
  return (
    <div >

        <main className=' min-h-screen container '>
            
           <Header/>
           <Toaster />
           <Outlet/>
        </main>


<div className=' p-10 text-center bg-gray-800 mt-10 '>
  Made with 💖 by Gaurav Raval
</div>
    </div>
  )
}

export default Applayout