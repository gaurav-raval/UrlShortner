import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu ,DropdownMenuTrigger,DropdownMenuLabel,DropdownMenuItem,DropdownMenuContent,DropdownMenuSeparator } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/Context'
import { BarLoader } from 'react-spinners'
import useFetch from '@/hooks/UseFetch'
import { logout } from '@/db/apiAuth'

const Header = () => {

    const navigate = useNavigate()

    const {user,fetchUser} = UrlState()

    const {loading,fn:fnLogout} = useFetch(logout)

    const goTOAuth = () =>{
      navigate('/auth')
    }

  return (
    <>
    <nav className=' py-4 flex justify-between items-center '>
        <Link to= '/'>
        <img src='/logo.png' alt='logo' className='h-16'/>
        </Link>

       <div >
       {
        user? 
        <DropdownMenu>
        <DropdownMenuTrigger className='className="w-10 rounded-full overflow-hidden'>
        <Avatar>
  <AvatarImage src={user.user_metadata.profile_pic} className= 'object-contain' />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user?.user_metadata.name}</DropdownMenuItem>
          <DropdownMenuItem onClick= {()=> navigate('/dashboard')} > <LinkIcon className='mr-2 h-4 w-4'/> My Links</DropdownMenuItem>
          <DropdownMenuItem> <LogOut className='mr-2 h-4 w-4'/> 
          <span onClick={() => {
          fnLogout().then(()=> {
            fetchUser()
            navigate('/auth')})
        }}> Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        : <Button onClick = {goTOAuth}  >Log In</Button>
       }
       </div>
    </nav>
    {loading && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}

    </>
  )
}

export default Header