
import ILogo from './assets/raidLogo.png'

import Hamburger from './assets/hambruger.png'
import './App.css'











function MySignups({guildMembers  , guild }){

  console.log(guildMembers)
  console.log(guild)
  return ( 
    <>
    <div className='flex items-center flex-col justify-center  w-full  m-1  mt-25  h-full'>
      <img src={Hamburger} alt='Hamburger' className='w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2' />
     <div className="flex  flex-col lg:flex-row  w-full  md:w-full gap-4 h-auto  items-center">
     <div className='flex  flex-col basis-2/3 text-white p-2 m-1  items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>MY SIGNUPS</h1>
      <h3 className='font-sans text-[16px] text-[#A1A1AA]'>View your raid signups</h3>
       </div>
       
     </div>
    <div className='flex items-start flex-1 flex-col  lg:flex-row  gap-4 justify-base  h-screen  w-full  '>
    
       <Content4 />
      
       

    </div>
     </div>
  </>)}
  function Content4(){
    return (
     <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1  gap-5  w-full  p-3 items-start '>
      
      <div className='flex  bg-[#10161d] w-full flex-col  sm:flex-row  items-center rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]' > 
         <img src={ILogo} alt='Logo' className='w-0 sm:w-15 sm:h-15 sm:ml-5 ' />
        <div className='flex flex-col sm:flex-row m-3 w-full p-2 sm:justify-between sm:gap-2'>
          <h1 className='flex text-white text-lg justify-center  items-center'>Icecrown Citadel 25 HC</h1>
          <div className='flex items-center text-white text-sm gap-2 justify-center flex-row sm:flex-col'> Sunday, 25 May 2026 19:00 </div>
          <div className='flex   text-white items-center flex-col text-sm gap-1'> Signed as: <h3 className='text-[#8B5CF6]'>Dadix</h3> (Death Knight)</div>
        </div>
        <div> <button className='text-[#03fc07] p-2'>CONFIRMED</button></div>
      </div>
      <div className='flex  bg-[#10161d] w-full flex-col  sm:flex-row  items-center rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]' > 
         <img src={ILogo} alt='Logo' className='w-0 sm:w-15 sm:h-15 sm:ml-5 ' />
        <div className='flex flex-col sm:flex-row m-3 w-full p-2 sm:justify-between sm:gap-2'>
          <h1 className='flex text-white text-lg justify-center  items-center'>Icecrown Citadel 25 HC</h1>
          <div className='flex items-center text-white text-sm gap-2 justify-center flex-row sm:flex-col'> Sunday, 25 May 2026 19:00 </div>
          <div className='flex   text-white items-center flex-col text-sm gap-1'> Signed as: <h3 className='text-[#8B5CF6]'>Dadix</h3> (Death Knight)</div>
        </div>
        <div> <button className='text-[#03fc07] p-2'>CONFIRMED</button></div>
      </div>
      <div className='flex  bg-[#10161d] w-full flex-col  sm:flex-row  items-center rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]' > 
         <img src={ILogo} alt='Logo' className='w-0 sm:w-15 sm:h-15 sm:ml-5 ' />
        <div className='flex flex-col sm:flex-row m-3 w-full p-2 sm:justify-between sm:gap-2'>
          <h1 className='flex text-white text-lg justify-center  items-center'>Icecrown Citadel 25 HC</h1>
          <div className='flex items-center text-white text-sm gap-2 justify-center flex-row sm:flex-col'> Sunday, 25 May 2026 19:00 </div>
          <div className='flex   text-white items-center flex-col text-sm gap-1'> Signed as: <h3 className='text-[#8B5CF6]'>Dadix</h3> (Death Knight)</div>
        </div>
        <div> <button className='text-[#03fc07] p-2'>CONFIRMED</button></div>
      </div><div className='flex  bg-[#10161d] w-full flex-col  sm:flex-row  items-center rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]' > 
         <img src={ILogo} alt='Logo' className='w-0 sm:w-15 sm:h-15 sm:ml-5 ' />
        <div className='flex flex-col sm:flex-row m-3 w-full p-2 sm:justify-between sm:gap-2'>
          <h1 className='flex text-white text-lg justify-center  items-center'>Icecrown Citadel 25 HC</h1>
          <div className='flex items-center text-white text-sm gap-2 justify-center flex-row sm:flex-col'> Sunday, 25 May 2026 19:00 </div>
          <div className='flex   text-white items-center flex-col text-sm gap-1'> Signed as: <h3 className='text-[#8B5CF6]'>Dadix</h3> (Death Knight)</div>
        </div>
        <div> <button className='text-[#03fc07] p-2'>CONFIRMED</button></div>
      </div><div className='flex  bg-[#10161d] w-full flex-col  sm:flex-row  items-center rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]' > 
         <img src={ILogo} alt='Logo' className='w-0 sm:w-15 sm:h-15 sm:ml-5 ' />
        <div className='flex flex-col sm:flex-row m-3 w-full p-2 sm:justify-between sm:gap-2'>
          <h1 className='flex text-white text-lg justify-center  items-center'>Icecrown Citadel 25 HC</h1>
          <div className='flex items-center text-white text-sm gap-2 justify-center flex-row sm:flex-col'> Sunday, 25 May 2026 19:00 </div>
          <div className='flex   text-white items-center flex-col text-sm gap-1'> Signed as: <h3 className='text-[#8B5CF6]'>Dadix</h3> (Death Knight)</div>
        </div>
        <div> <button className='text-[#03fc07] p-2'>CONFIRMED</button></div>
      </div>
    </div>
    )
  }

  export default MySignups