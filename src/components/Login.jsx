import React,{useEffect, useState} from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'

import * as Yup from 'yup'
import useFetch from '@/hooks/UseFetch'

import login from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'


const Login = () => {

  const [errors,setErrors] = useState([])
  const [formData,setFormData] = useState({
    email:'',
    password : ""

  })

  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  const longLink = searchParams.get('createNew')

  const handleInputChange = (e) =>{
    

    const {name,value } = e.target;

    setFormData((prev)=>(
      {...prev,[name]:value}
    ))

  }

 const {data,error,loading,fn:fnLogin } = useFetch(login,formData)

 const {fetchUser} = UrlState();
 useEffect(() => {
  console.log(data);

  if(error == null && data ){
    navigate(`/dashboard/${longLink?`?createNew=${longLink}`:""}`)
   fetchUser();
  }

  //

  


 },[data,error])

  const handleLogin = async (e) =>{
    setErrors([])

  try {

    const schema =  Yup.object().shape({
      email : Yup.string().email(" Invalid Email").required('Email is required')
      ,
      password : Yup.string().min(6,'Password must be at least 6 characters').required('Password is required')
    })

    await schema.validate(formData, {abortEarly:false})
    await fnLogin()

    // api call
  } catch (error) {

    const newErrors = {};

    error?.inner?.forEach((err) =>{
      newErrors[err.path] = err.message
    })

    setErrors(newErrors)
    
  }

  }
  return (
    <div>
      <Card className= ''>
  <CardHeader>
    <CardTitle  className = 'text-center sm:text-left'>Login</CardTitle>
    <CardDescription  className = 'text-center sm:text-left' >Login to your account if you already have one</CardDescription>
{error && <Error message={error.message}/>}  </CardHeader>
  <CardContent className = 'space-y-2' >
    <div className='space-y-1'>
    <Input name='email' type='email' placeholder ='Enter Email'
    
    onChange={handleInputChange}
     
    />
    {errors.email && <Error message={errors.email} />}
    </div>
    <div className='space-y-1'>
    <Input name='password' type='password' placeholder ='Enter Password'
        onChange={handleInputChange}

        

    />
    {errors.password && <Error message={errors.password} />}
    </div>
  </CardContent>
  <CardFooter className= ' '>
    <Button onClick = {handleLogin}   >
      {
        loading? <BeatLoader size={10} color='#36d7b7'/> : 'Login'
      }
    </Button>
  </CardFooter>
</Card>

    </div>
  )
}

export default Login

// 1:01:32