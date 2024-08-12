import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'


const Landing = () => {

  const [longUrl, setLongUrl] = useState()

  const navigate = useNavigate()

  const handleShorten = (e) =>{

    e.preventDefault()

    if(longUrl)navigate(`/auth?createNew=${longUrl}`)

  }

  console.log(longUrl);
  return (
    <div className='flex flex-col items-center'>

      <h2 className='my-10 sm:my-16  text-3xl sm:6xl lg:text-7xl text-white text-center  font-extrabold '>
        The only url shortner <br /> you'll ever need!
        </h2>

       <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 items-center' >

        <Input type= 'url' placeholder ="paste your loooong URL"
        className = 'h-full flex-1 py-4 px-4'
        value = {longUrl}

        onChange = {(e) => setLongUrl(e.target.value)}
        />
        <Button variant= 'destructive' className='h-full' type='submit' >Shorten!</Button>
       </form>

       <img src="/banner.jpeg" alt="banner" className='w-full my-11 md:px-11' />

       <Accordion type="multiple" collapsible='true' className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Trimrr URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my ?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default Landing
