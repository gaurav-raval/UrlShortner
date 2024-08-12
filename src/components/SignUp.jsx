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

import login, { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'


const Signup = () => {

  const [errors,setErrors] = useState([])
  const [formData,setFormData] = useState({
    name : "",
    email:'',
    password : "",
    profile_pic : null  
  


  })

  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  const longLink = searchParams.get('createNew')

  const handleInputChange = (e) =>{
    

    const {name,value,files } = e.target;

    setFormData((prev)=>(
      {...prev,[name]:files?files[0]:value}
    ))

  }

 const {data,error,loading,fn:fnSignup } = useFetch(signup,formData)

 const {fetchUser} = UrlState();
 useEffect(() => {
  // console.log(data);

  if(error == null && data ){
    navigate(`/dashboard/${longLink?`?createNew=${longLink}`:""}`)
   fetchUser();
  }

  //

  


 },[error,loading])

  const handleSignup = async (e) =>{
    setErrors([])

  try {

    const schema =  Yup.object().shape({
      name : Yup.string().required('Name is required'),
      email : Yup.string().email(" Invalid Email").required('Email is required')
      ,
      password : Yup.string().min(6,'Password must be at least 6 characters').required('Password is required'),
      // profile_pic : Yup.mixed().required('Profile Picture is required')
    })

    await schema.validate(formData, {abortEarly:false})
    await fnSignup()

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
      <Card>
  <CardHeader>
    <CardTitle>SignUp</CardTitle>
    <CardDescription>Create a new account if you haven't already </CardDescription>
{error && <Error message={error.message}/>}  </CardHeader>
  <CardContent className = 'space-y-2' >
  <div className='space-y-1'>
    <Input name='name' type='text' placeholder ='Enter Name'
    
    onChange={handleInputChange}
    />
    {errors.name && <Error message={errors.name} />}
    </div>
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
    <div className='space-y-1'>
      <label className=' text-sm text-muted-foreground ml-1' htmlFor="profile_pic">Profile Photo(optional)</label>
    <Input placeholder= 'Profile Photo(optional)' name='profile_pic' type='file' accept = 'image/*'
        onChange={handleInputChange}
        className = 'cursor-pointer'

    />
    {errors.profile_pic && <Error message={errors.password} />}
    </div>
  </CardContent>
  <CardFooter>
    <Button onClick = {handleSignup} >
      {
        loading? <BeatLoader size='10px' color='#36d7b7'/> : 'Create Account'
      }
    </Button>
  </CardFooter>
</Card>

    </div>
  )
}

export default Signup