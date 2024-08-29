import React, { useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from '@/Context'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

import * as yup from 'yup'
import { QRCode } from 'react-qrcode-logo';
import useFetch from '@/hooks/UseFetch';
import { createUrl } from '@/db/apiUrls';
import Error from './Error';


const CreateLink = () => {

  const {user} = UrlState();
  console.log(user);
  
  const navigate = useNavigate();
  let [searchParams,setSearchParams] = useSearchParams()

  const longLink = searchParams.get('createNew')

  const ref = useRef()
 

  const [errors,setErrors] = useState({});
  const [formValues,setFormValues] = useState({
    title :"",
    longUrl : longLink ? longLink :"",
    customUrl : "",
  });

  const schema = yup.object().shape({
    title : yup.string().required("title is required"),
    longUrl : yup.string().url("long url is required"),
    customUrl : yup.string()
  })

  
  const handleChange = (e) => {
    setFormValues({...formValues,[e.target.id]:e.target.value})
  }

  const {data, loading, error, fn:fnCreateUrl} = useFetch(createUrl,{...formValues,user_id:user.id})

  const creatNewLink = async () =>{

    setErrors([]);

    try{
      await schema.validate(formValues,{abortEarly:false})
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
      

      

    }
    catch(e){
      const newErrors = {}

      e?.inner?.forEach((err) =>{
        newErrors[err.path] = err.message;

      });
      setErrors(newErrors)
    }


  }
  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);
  return (
    <div>

<Dialog 
defaultOpen = {longLink}
onOpenChange={(res) => {if (!res)setSearchParams({})  } } >
  <DialogTrigger asChild>
  <Button variant="destructive">Create New Link</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New</DialogTitle>
     
  </DialogHeader>
  {formValues.longUrl && <QRCode value={formValues.longUrl} size={250} ref={ref}/>}

  <Input id='title' placeholder= "Short Link's title" 
  value = {formValues.title}
  onChange = {handleChange}
  />
  {errors.title && <Error message = {errors.title}/>}
  <Input id = 'longUrl' placeholder= 'Enter your Long URL'
  value = {formValues.longUrl}
  onChange = {handleChange}
  />
   {errors.longUrl && <Error message = {errors.longUrl}/>}

  <div className='flex items-center gap-2'>
    <Card className= 'p-2'>trimrr.online/</Card>
    <Input id='customUrl' placeholder="Custom URL(optional)" onChange= {handleChange} />
  </div>

  {error && <Error message = {error.message}/>}

    <DialogFooter className="sm:justify-start">

      <Button type="button"
            variant="destructive" onClick = {creatNewLink}>Create New</Button>
    </DialogFooter>

    
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateLink
