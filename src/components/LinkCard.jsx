import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { AlignJustify, Copy, Download, Trash } from 'lucide-react'
import { useToast } from './ui/use-toast'
import useFetch from '@/hooks/UseFetch'
import { deleteUrl, getUrls } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const LinkCard = ({url,fetchUrl}) => {
  const [isClicked, setIsClicked] = useState(false);
  const { toast } = useToast()

  const handleClick = () => {

    navigator.clipboard.writeText(url?.short_url)
    toast({
      title: "Copied",
      variant: "destructive", 
      
    })


  };

  const downloadImage = () => {
    const imageUrl = String(url?.qr);
    const fileName = url?.title;

    
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  
  const {loading: deleteLoading , fn: fnDelete} = useFetch(deleteUrl,url?.id);
  return (
    <>
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg justify-between  '>

     <div className='flex gap-5'>
     <img src={url.qr} alt="" className='h-32 object-contain ring ring-blue-500 self-start' />
       
       <Link to={`/link/${url.id}`} className='flex flex-col gap-1'>
       
       
       <span className='text-3xl font-extrabold hover:underline cursor-pointer'>
         {url.title}
         </span>
       <span className=' text-xs  sm:text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>
         {url?.custorm_url ? `trimmr.online/${url?.custorm_url}`:`trimmr.online/${url?.short_url}`}
         </span>
       <span className=' text-xs  sm:text-2xl flex items-center h-auto hover:underline cursor-pointer'>
         {url?.original}
         </span>
       <span className=' flex items-end font-extralight text-sm flex-1'>
         {new Date(url?.created_at).toLocaleString()}
         </span>

       </Link>
     </div>
        <div className='flex gap-2    '
        >
          <Button  variant= 'ghost'   >
            <Copy   onClick={handleClick}/>
          </Button>
         
          <Button variant= 'ghost' onClick={downloadImage}>
            <Download />
          </Button>
          <Button variant = 'ghost' onClick = {()=> fnDelete().then(()=>fetchUrl())} disable={deleteLoading} >
            {deleteLoading ? <BeatLoader size={5 } color='white'/> : <Trash/>}
          </Button>
        </div>
        
        
        
    </div>
    
</>
  )
}

export default LinkCard