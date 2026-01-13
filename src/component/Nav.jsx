import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../stores/authStore';
import Loading from './Loading';
import { Toaster, toast } from 'sonner';

export default function Nav({navList}) {
  const [isLoading, setLoading] = useState(false);
  
  let classStr = "font-semibold text-sm mobile:text-lg lg:text-2xl text-bold border border-blue-300 px-4 py-2 shadow-[5px_5px_10px_#ccc] hover:bg-blue-400 hover:cursor-pointer hover:text-white transition duration-150 active:scale-90 rounded-2xl";
  const isActive = ({isActive}) => {
    if(!isActive) {
      return `text-black ${classStr}`;
    } else {
      return `text-red-500 ${classStr}`;
    }
  }

  const {token, user, setUser, logout} = useAuth(state => state);
  
  useEffect(() => {
    if(!token?.access_token) return;
    const getUser = async () => {
      try {
        setLoading(true);
        await setUser();
      } catch(error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [token])
  return (
    <div className='flex flex-start items-center gap-2 my-3 sm:gap-8 sm:my-6'>
      {navList.map(nav => <NavLink key={nav.id} className={isActive} to={nav.path} end>{nav.title}</NavLink>)}
      {user?.name && (isLoading ? <Loading width="w-8" borderColor="border-blue-500"/> : (<div>
        <span className='text-xl font-semibold mr-2'>Hi, {user.name}</span>  
        <button className='font-semibold text-sm mobile:text-lg lg:text-2xl text-bold border border-blue-300 px-4 py-2 shadow-[5px_5px_10px_#ccc] hover:bg-blue-400 hover:cursor-pointer hover:text-white transition duration-150 active:scale-90 rounded-2xl' onClick={logout}>Logout</button>
      </div>))}
      <Toaster position='top-right' richColors/>
    </div>
  )
}
