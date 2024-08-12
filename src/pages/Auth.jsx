import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import { UrlState } from '@/Context'

// import { useSelector } from 'react-redux'


const Auth = () => {
 
  

  const [searchParams] = useSearchParams()

  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();

  const {isAuthenticated,loading} = UrlState()
  

  // const isAuthenticated = useSelector(state => state.isAuthenticated)

  useEffect(()=>{
    if(isAuthenticated ){
    navigate(`/dashboard/${longLink?`?createNew=${longLink}`:""}`)

    }
    console.log(isAuthenticated);

  },[isAuthenticated,longLink])
  return (
    <div className='flex justify-center '>

<div className='mt-20 flex flex-col items-center gap-10  '>
    <h1 className=' text-3xl sm:text-5xl font-extrabold'>{

      longLink?"Hold up! Let's login fitst...":"Login/SignUp"
}</h1>


<Tabs defaultValue="Login" className="w-[300px] sm:w-[400px]">
  <TabsList className='grid w-full grid-cols-2' >
    <TabsTrigger value="Login" >Login</TabsTrigger>
    <TabsTrigger value="SignUp">SignUp</TabsTrigger>
  </TabsList>
  <TabsContent value="Login"><Login/></TabsContent>
  <TabsContent value="SignUp"> <SignUp/> </TabsContent>
</Tabs>

    </div>
    </div>
  )
}

export default Auth