
import Guildy from './assets/guildy.png'
import Raids from './assets/raid.png'
import Members from './assets/members.png'
import Signups from './assets/signups.png'

import Character from './assets/characters.png'
import Logout from './assets/logout.png'
import { NavLink, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import api from './api/api'
import toast from 'react-hot-toast'



function Navbar({hamburger , setHamburger , setGuild}){
     const [userInfo , setUserInfo] = useState(null)
    const navigate = useNavigate()
async function getUserInfo ( ){
  const response = await api.post('/characters/user-info',{}, {withCredentials:true,})

  setUserInfo(response.data)
}


useEffect( ()=> {  if(userInfo === null) getUserInfo()}, [userInfo])



const getDiscordDefaultAvatar = (discordId: string) => {
  if(!discordId ){ return }
  const index = Number((BigInt(discordId) >> 22n) % 6n);

  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
};

const avatarUrl = userInfo?.avatar
  ? `https://cdn.discordapp.com/avatars/${userInfo?.discordId}/${userInfo?.avatar}.png`
  : getDiscordDefaultAvatar(userInfo?.discordId);



  async function  logout(){
   try{ await api.post('/auth/logout',{}, {withCredentials: true})
   
   toast.success("Logout successfull!")
   setGuild('')
   window.location.href = "/"
  }
  catch(err){
    console.error(err)
    toast.success("failed to logout")

  }
  }
  return <>
  {  hamburger ? (<div  className={`${ hamburger && "dropdown-enter flex-col  fixed inset-0 z-40  w-auto bg-[black]"}  none `}> 
   <div  className='flex flex-1 justify-center  flex-col lg:flex-row items-center border-b border-white/5 p-5 gap-2 m-3'>
    

       <img onClick={()=> navigate("/")} src={Guildy} alt='Guildy' className='flex w-23   rounded-4xl ' />
      <h1 className='flex flex-col text-[#8B5CF6] text-4xl gap-1'>Guildy <p className='text-[#F5F3FF] text-sm'>Wotlk Raid Signups</p></h1>
     </div>
     {<div className='flex fixed right-10 top-10 '> {hamburger && <button onClick={() => setHamburger(false)} className=' text-white text-3xl'> x </button>} </div>}
     <div className='flex flex-col text-white'>
    <NavLink to='/upcoming-raids'  className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}>  <div className='flex p-3 justify-base items-center text-[#9c9d9e] '> <img src={Raids} alt='Raids' className='w-25'  /> Upcoming Raids</div></NavLink>
     <NavLink to='/chars' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"} >  <div className='flex p-3  justify-base items-center text-[#9c9d9e]'> <img src={Character} alt='Character' className='w-25'  />  Characters</div></NavLink>
      <NavLink to='/signups' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}> <div className='flex p-3 pl-7  justify-base items-center text-[#9c9d9e] gap-2'> <img src={Signups} alt='Signups' className='w-18 '   /> My Signups </div></NavLink>
     
     <NavLink to='/gmembers' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}>   <p className='flex p-3  pl-7  items-center text-[#9c9d9e] gap-2'><img src={Members} alt='Members' className='w-18'  />Guild Members    </p> </NavLink> 
     
     </div>
     <div className='flex flex-col basis-2/3'>
     <div className='flex  items-center h-auto flex-row text-white mt-auto gap-5 border-y p-3 border-white/13'>
        <h1><img  src={avatarUrl} alt='User' className='w-13 rounded-[50%]' /></h1>
        <h3 className='flex flex-col text-[#7C3AED]'>{`#${userInfo?.name}`}
        <p className='text-[#A8A39A]'> </p></h3>
         </div>
     <div  onClick={()=> navigate("/")}     className='flex items-center m-5 text-white gap-3'><img src={Logout} alt='Logout' className='w-10  '/><h1 className='text-[#A8A39A]'>
      LOG OUT</h1></div>
      </div>
      
     
    
    </div>) : (<div  className={`  hidden  2xl:flex  flex-col border-r border-white/10  h-screen p-5 w-auto sm:w-80 `}> 
   <div  className='flex flex-1 justify-center  flex-col lg:flex-row items-center border-b border-white/5 p-5 gap-2 m-3'>
    

       <img onClick={()=> navigate("/")} src={Guildy} alt='Guildy' className='flex w-23   rounded-4xl ' />
      <h1 className='flex flex-col text-[#8B5CF6] text-4xl gap-1'>Guildy <p className='text-[#F5F3FF] text-sm'>Wotlk Raid Signups</p></h1>
     </div>
     {<div className='flex fixed right-10 top-10 '> {hamburger && <button onClick={() => setHamburger(false)} className=' text-white text-3xl'> x </button>} </div>}
     <div className='flex flex-col text-white'>
    <NavLink to='/upcoming-raids'  className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}>  <div className='flex p-3 justify-base items-center text-[#9c9d9e] '> <img src={Raids} alt='Raids' className='w-25'  /> Upcoming Raids</div></NavLink>
     <NavLink to='/chars' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"} >  <div className='flex p-3  justify-base items-center text-[#9c9d9e]'> <img src={Character} alt='Character' className='w-25'  />  Characters</div></NavLink>
      <NavLink to='/signups' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}> <div className='flex p-3 pl-7  justify-base items-center text-[#9c9d9e] gap-2'> <img src={Signups} alt='Signups' className='w-18 '   /> My Signups </div></NavLink>
     
     <NavLink to='/gmembers' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}>   <p className='flex p-3  pl-7  items-center text-[#9c9d9e] gap-2'><img src={Members} alt='Members' className='w-18'  />Guild Members    </p> </NavLink> 
     
     </div>
     <div className='flex flex-col basis-2/3'>
      <div className='flex  items-center h-auto flex-row text-white mt-auto gap-5 border-y p-3 border-white/13'>
        <h1><img  src={avatarUrl} alt='User' className='w-13 rounded-[50%]' /></h1>
        <h3 className='flex flex-col text-[#7C3AED]'>{`#${userInfo?.name}`}
        <p className='text-[#A8A39A]'> </p></h3>
         </div>
     <div  onClick={()=> logout()}     className='flex items-center m-5 text-white gap-3'><img src={Logout} alt='Logout' className='w-10  '/><h1 className='text-[#A8A39A]'>
      LOG OUT</h1></div>
      </div>
      
     
    
    </div> )}
  </>
}



export default Navbar