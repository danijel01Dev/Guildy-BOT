import User from './assets/user.png'
import Guildy from './assets/guildy.png'
import Raids from './assets/raid.png'
import Members from './assets/members.png'
import Signups from './assets/signups.png'

import Character from './assets/characters.png'
import Logout from './assets/logout.png'
import { NavLink, useNavigate } from 'react-router-dom'



function Navbar(){
    const navigate = useNavigate()
  return (
    <div  className="  flex-col hidden   2xl:flex border-r border-white/10  h-screen p-5 w-auto sm:w-80 "> 
    <div onClick={()=> navigate("/")} className='flex flex-1 justify-center  flex-col lg:flex-row items-center border-b border-white/5 p-5 gap-2 m-3'>
       <img src={Guildy} alt='Guildy' className='flex w-23  border border-white/10 rounded-4xl ' />
      <h1 className='flex flex-col text-[#8B5CF6] text-4xl gap-1'>Guildy <p className='text-[#F5F3FF] text-sm'>Wotlk Raid Signups</p></h1>
     </div>
     <div className='flex flex-col text-white'>
    <NavLink to='/upcoming-raids'  className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}>  <div className='flex p-3 justify-base items-center text-[#9c9d9e] '> <img src={Raids} alt='Raids' className='w-25'  /> Upcoming Raids</div></NavLink>
     <NavLink to='/chars' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"} >  <div className='flex p-3  justify-base items-center text-[#9c9d9e]'> <img src={Character} alt='Character' className='w-25'  />  Characters</div></NavLink>
      <NavLink to='/signups' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}> <div className='flex p-3 pl-7  justify-base items-center text-[#9c9d9e] gap-2'> <img src={Signups} alt='Signups' className='w-18 '   /> My Signups </div></NavLink>
     
     <NavLink to='/gmembers' className={({ isActive }) => isActive  ? " border-l-8 border-[#2B2350]" : "text-gray-400 border-none"}>   <p className='flex p-3  pl-7  items-center text-[#9c9d9e] gap-2'><img src={Members} alt='Members' className='w-18'  />Guild Members    </p> </NavLink> 
     
     </div>
     <div className='flex flex-col basis-2/3'>
      <div className='flex  items-center h-auto flex-row text-white mt-auto gap-5 border-y p-3 border-white/13'>
        <h1><img  src={User} alt='User' className='w-13' /></h1>
        <h3 className='flex flex-col text-[#7C3AED]'>Dadix
        <p className='text-[#A8A39A]'> Guild Leader</p></h3>
         </div>
     <div className='flex items-center m-5 text-white gap-3'><img src={Logout} alt='Logout' className='w-10  '/><h1 className='text-[#A8A39A]'>
      LOG OUT</h1></div>
      </div>
      
     
    
    </div>
  )
}



export default Navbar