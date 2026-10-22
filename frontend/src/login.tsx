import Ilogo from './assets/guildy.png'
import Classic from './assets/main-icons/shield.png'
import DiscordW from './assets/main-icons/discord-bijeli.png'
import DiscordP from './assets/main-icons/discord-ljubicasti.png'
import Munja from './assets/main-icons/munja.png'
import UpcomingR from './assets/main-icons/cal-ljubicasti.png'
import TotalS from './assets/main-icons/raid-sig.png'
import GuildM from './assets/main-icons/guild-members.png'
import YChars from './assets/main-icons/your-chars.png'
import DKPOver from './assets/main-icons/dkp-overview.png'
import Chars  from './assets/main-icons/karakter-ljubicasti.png'
import BiSL from './assets/main-icons/dkp-import.png'
import RaidS from './assets/main-icons/raid-stats.png'
import api from "./api/api"
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface  Data {
  totalSignups : number,
  guild : number ,
  guildMembers : number ,
  dkp : number

}



function Login(){
const [data , setData] = useState<Data | null>(null)

  async function landingInfo(){
   try{ const response = await api.get('/signup/landing')
    setData(response.data)
   } catch(err){
    console.error(err)
    toast.error("failed to fetch dashboard info")
   }}

  useEffect(()=> {  landingInfo()}, [])
   async  function  login(){
     const getUrl = await api.get('/auth/discord')

     window.location.href = getUrl.data



    }
    return (<div  className="content-enter flex w-full h-auto justify-center items-center flex-col  max-w-[1980px] mx-auto  ">
     <div className="flex items-center justify-center  flex-col gap-4  m-5 ">
         <div className="flex  border border-white/7  justify-center items-center rounded-[50%] overflow-hidden   shadow-xl shadow-indigo-500/100  
 "><img src={Ilogo} className=" w-60   p-3.5   " /></div>
         <div className="flex flex-col md:text-4xl justify-center items-center w-auto mx-auto "><h1 className="text-white/80 justify-center items-center  mx-auto"> Manage your <span className="text-[#A855F7] "> WoTLK raids </span></h1> <h3 className="flex text-white/50  w-[60%] sm:w-[100%] justify-center items-center mx-auto text-[12px]  md:text-2xl">All your signups
          , characters and guild management in one simple dashboard. </h3></div>

     <div className='grid  grid-cols-1  sm:grid-cols-1  lg:grid-cols-3 gap-3'>      <button   onClick={()=> window.open('https://discord.com/oauth2/authorize?client_id=1519061003147542642', '_blank')} className="
    inline-flex items-center justify-center gap-7
    
    w-auto
    rounded-lg
    bg-white/7
    px-6 py-4
    text-sm font-semibold text-white
    transition-colors
    hover:bg-[#4752C4]
    focus:outline-none
    focus:ring-2 focus:ring-[#5865F2]/50
  "
>
  <svg
    width="25"
    height="23"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.54 5.18A16.2 16.2 0 0 0 15.5 4l-.5 1.02a14.7 14.7 0 0 0-6 0L8.5 4a16.2 16.2 0 0 0-4.04 1.18C1.9 9.02 1.2 12.78 1.55 16.49a16.3 16.3 0 0 0 4.96 2.5l1.2-1.65c-.66-.24-1.3-.54-1.9-.9l.47-.36c3.66 1.7 7.62 1.7 11.23 0l.48.36c-.6.36-1.24.66-1.9.9l1.2 1.65a16.3 16.3 0 0 0 4.96-2.5c.41-4.3-.7-8.02-2.71-11.31ZM8.02 14.6c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Zm7.96 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Z" />
  </svg>
 Add Bot To Discord</button>
      
      <button onClick={login}
  className="
    inline-flex items-center justify-center gap-3
    
    rounded-lg
    bg-[#5865F2]
    px-6 py-4
    text-sm font-semibold text-white
    transition-colors
    hover:bg-[#4752C4]
    focus:outline-none
    focus:ring-2 focus:ring-[#5865F2]/50
  "
>
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.54 5.18A16.2 16.2 0 0 0 15.5 4l-.5 1.02a14.7 14.7 0 0 0-6 0L8.5 4a16.2 16.2 0 0 0-4.04 1.18C1.9 9.02 1.2 12.78 1.55 16.49a16.3 16.3 0 0 0 4.96 2.5l1.2-1.65c-.66-.24-1.3-.54-1.9-.9l.47-.36c3.66 1.7 7.62 1.7 11.23 0l.48.36c-.6.36-1.24.66-1.9.9l1.2 1.65a16.3 16.3 0 0 0 4.96-2.5c.41-4.3-.7-8.02-2.71-11.31ZM8.02 14.6c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Zm7.96 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Z" />
  </svg>

  Continue with Discord
</button>
 <button   onClick={()=> window.open('https://discord.gg/5jnX8DXrSN', '_blank')} className="
    inline-flex items-center justify-center gap-7
    
    w-auto
    rounded-lg
    bg-white/7
    px-6 py-4
    text-sm font-semibold text-white
    transition-colors
    hover:bg-[#4752C4]
    focus:outline-none
    focus:ring-2 focus:ring-[#5865F2]/50
  "
>
  <svg
    width="56"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.54 5.18A16.2 16.2 0 0 0 15.5 4l-.5 1.02a14.7 14.7 0 0 0-6 0L8.5 4a16.2 16.2 0 0 0-4.04 1.18C1.9 9.02 1.2 12.78 1.55 16.49a16.3 16.3 0 0 0 4.96 2.5l1.2-1.65c-.66-.24-1.3-.54-1.9-.9l.47-.36c3.66 1.7 7.62 1.7 11.23 0l.48.36c-.6.36-1.24.66-1.9.9l1.2 1.65a16.3 16.3 0 0 0 4.96-2.5c.41-4.3-.7-8.02-2.71-11.31ZM8.02 14.6c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Zm7.96 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2 2 .99 2 2.2-.89 2.2-2 2.2Z" />
  </svg>
 Guildy  Support </button></div>
       </div>
       <div className=" flex text-white flex-col sm:flex-row gap-5"> <div className="flex items-center  justify-base  rounded-2xl"> <img src={Classic} alt="log"  className="w-15 sm:w-12"/> <h1> Built for WotLK  Classic </h1></div>
       <div className="flex  items-center justify-base p-3 rounded-2xl"> <img src={DiscordW} alt="log"  className="w-12"/> <h1>  Works with your Discord server </h1></div>
       <div className="flex  items-center justify-base p-3 rounded-2xl ">  <img src={Munja} alt="log"  className="w-12"/> <h1> No setup. Free to use. </h1></div></div>
       <div className="grid grid-cols-1 w-[90%] lg:w-[75%]  border border-white/3 rounded-xl h-auto text-white/70 bg-[#060b17] p-6  shadow-md shadow-indigo-500/50  "> <div><h1 className="flex p-3"> Dashboard</h1></div>
          <div className="grid  grid-cols-1 sm:grid-cols-4  my-2 mx-auto items-center justify-center  w-full gap-3 "> <div className="flex flex-col   w-auto  h-35 p-2 border border-white/2 rounded-lg gap-3 bg-[#0b111c]  shadow-sm shadow-indigo-500/35"><div className="flex flex-row gap-2 text-[12px] items-center">  <img src={UpcomingR} alt="log"  className="w-10 lg:w-14"/> Guild's</div> <div className="flex justify-center  items-center text-xl p-2">{data?.guild}</div></div>
          <div  className="flex p-2 w-auto  h-35 border border-white/2 rounded-lg flex-col gap-3 bg-[#0b111c] shadow-sm shadow-indigo-500/35"> <div className="flex flex-row gap-2 text-[12px] items-center">   <img src={TotalS} alt="log"  className="w-10 lg:w-15"/>Total Signups </div> <div className="flex justify-center  items-center text-xl p-2">{data?.totalSignups}</div></div>
          <div  className="flex p-2 w-auto h-35  rounded-lg flex-col gap-3 bg-[#0b111c] shadow-sm shadow-indigo-500/35"> <div className="flex flex-row gap-2 text-[12px] items-center">   <img src={GuildM} alt="log"  className="w-10 lg:w-15"/> Guild Members </div> <div className="flex justify-center  items-center text-xl p-2">{data?.guildMembers}</div></div>
          <div  className="flex p-2 w-auto h-35 border border-white/2 rounded-lg flex-col gap-3 bg-[#0b111c] shadow-sm shadow-indigo-500/35"> <div className="flex flex-row gap-2 text-[12px] items-center">   <img src={DKPOver} alt="log"  className="w-12 lg:w-16"/> DKP Pool</div> <div className="flex justify-center  items-center text-xl p-2">{data?.dkp}</div></div>
          
          
      </div> 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 text-white gap-5 w-full justify-center  items-center h-auto  my-3  mx-auto justify-base items-center">
        <div  className="flex w-full h-70 border border-white/5 rounded-lg justify-center  items-center flex-col ">  <h1 className="flex justify-base items-start">Your Activity</h1>
        <div className="flex flex-row justify-center items-center w-[90%] mx-auto "> <div className="flex  p-4 ">  <img src={UpcomingR} alt="log"  className="w-14"/> </div> <div className="flex flex-col w-[100%] "><h1 className="flex text-lg"> Your Upcoming Raids  </h1> <p className="text-[12px] text-white/65"> View and manage the raids you have created </p> </div></div>

        <div className="flex flex-row justify-base items-center w-[90%] mx-auto"> <div className="flex  p-4 "> <img src={TotalS} alt="log"  className="w-17"/> </div>   <div className="flex flex-col  w-[100%]" ><h1 className="flex text-lg"> Your Signups  </h1> <p className="text-[12px] text-white/65"> Track and manage signups for your raids </p> </div></div>
        <div className="flex flex-row justify-base items-center w-[90%] mx-auto"> <div className="flex  p-4 "> <img src={YChars} alt="log"  className="w-12"/> </div> <div className="flex flex-col"><h1 className="flex text-xl"> Your Characters  </h1> <p className="text-[12px] text-white/65"> Manage your characters and roles </p> </div></div>
        
        
         </div>
         


          <div className="flex w-full h-70 border border-white/5 rounded-lg justify-center  items-center flex-col"> <h1 className="flex justify-base items-start">Guild Overview</h1>
           <div className="flex flex-row mx-auto  w-[90%] justify-base items-center"> <div className="flex  p-4 "> <img src={GuildM} alt="log"  className="w-15"/> </div> <div className="flex flex-col"><h1 className="flex text-lg"> Members </h1> <p className="text-[12px] text-white/65"> See your guild members and their roles. </p> </div></div>

        <div className="flex flex-row justify-base items-center mx-auto w-[90%]"> <div className="flex  p-4 "> <img src={DKPOver} alt="log"  className="w-17"/> </div> <div className="flex flex-col"><h1 className="flex text-lg"> DKP overview  </h1> <p className="text-[12px] text-white/65"> View guild DKP summary and top contributors </p> </div></div>
        <div className="flex flex-row justify-base items-center w-[90%] mx-auto "> <div className="flex  p-4 "> <img src={RaidS} alt="log"  className="w-15"/> </div> <div className="flex flex-col"><h1 className="flex text-lg "> Raid Stats  </h1> <p className="text-[12px] text-white/65"> View and manage the raids you have created </p> </div></div></div></div></div>
      <div className="flex flex-col text-white"> <div className="flex items-center p-2  justify-center "> <h1> Everything you need </h1></div>
         <div className="grid  grid-cols-3 sm:grid-cols-6 justify-center items-center gap-5 "> <div className=" flex flex-col  justify-center items-center test-sm text-white/50 "> <img src={UpcomingR} alt="log"  className="w-15"/>Raid Signups</div>
         <div className="flex flex-col justify-center items-center text-sm text-white/50"> <img src={GuildM} alt="log"  className="w-15"/>Guild Members</div>
         <div className="flex flex-col justify-center items-center text-sm text-white/50"> <img src={Chars} alt="log"  className="w-15"/>Characters </div>
         <div className="flex flex-col text-sm justify-center items-center text-white/50"> <img src={DKPOver} alt="log"  className="w-15"/> DKP Import </div>
         <div className="flex flex-col justify-center  items-center text-sm text-white/50"> <img src={BiSL} alt="log"  className="w-15"/> Loot & BiS Lists</div>
         <div className="flex flex-col justify-center items-center text-sm text-white/50"> <img src={DiscordP} alt="log"  className="w-15"/> Discord Integration</div>
         
         </div></div>
         <div className="flex m-3 p-3 text-white/60 flex-col">  &copy; 2026 Guildy. All rights reserved.<h3 className='flex justify-center  text-white/40'> Developed  by Danijel "Dadix" G.</h3></div>
       </div>
    )
}









export default Login