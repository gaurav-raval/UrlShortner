import { UrlState } from '@/Context'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import Error from '@/components/Error';
import useFetch from '@/hooks/UseFetch';
import { getClicksForUrls } from '@/db/apiClicks';
import { getUrls } from '@/db/apiUrls';
import LinkCard from '@/components/LinkCard';
import CreateLink from '@/components/CreateLink';


const Dashboard = () => {

  // const {isAuthenticated} = UrlState()
  const {user} =  UrlState()
  // console.log(isAuthenticated);

  const [searchQuery,setSearchQuery] = useState('');
  const {loading, error, data:urls, fn: fnUrls} = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );


  useEffect(() => {
    fnUrls()
  },[])

  const filteredUrls = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(()=>{
    if(urls?.length)fnClicks()
  },[urls?.length])



 
  return (
    <div className='flex flex-col gap-8'>
{ loading || loadingClicks && <BarLoader width={'100%'} color='blue'/>}   

<div className='grid grid-cols-2 gap-4' >
  
<Card >
  <CardHeader>
    <CardTitle>Links Created</CardTitle>
    
  </CardHeader>
  <CardContent>
    <p>{urls?.length}</p>
  </CardContent>
  
</Card>


<Card>
  <CardHeader>
    <CardTitle>Total Clicks</CardTitle>
    
  </CardHeader>
  <CardContent>
    <p>{clicks?.length}</p>
  </CardContent>
  
</Card>
  
</div> 

<div className='flex justify-between'>
  <h1 className= 'text-4xl font-extrabold'>My Links</h1>
  <CreateLink/>
  
</div>

<div className='relative flex'>
  <Input type= 'text' placeholder = 'Filter Links...'
  
  value = {searchQuery}
  onChange = {(e) =>setSearchQuery(e.target.value)}
  />
  <Filter className='relative top-2 right-6  '/>
</div>

<Error message = {error?.message}/>

{
  (filteredUrls || []).map((url,i)=>{
    return <LinkCard key={i} url = {url} fetchUrl = {fnUrls} />
  })
}
</div>
  )
}

export default Dashboard