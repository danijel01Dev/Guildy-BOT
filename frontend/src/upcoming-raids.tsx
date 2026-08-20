import User from './assets/user.png'
import ILogo from './assets/raidLogo.png'
import BDK from './assets/icons/dk_blood.png'
import FDK from './assets/icons/dk_frost.png'
import UDK from './assets/icons/dk_unholy.png'
import DruidB from './assets/icons/druid_balance.png'
import DruidF from './assets/icons/druid_feral.png'
import DruidR from './assets/icons/druid_resto.png'
import Guardian from './assets/icons/druid_guardian.png'
import BM from './assets/icons/hunter_bm.png'
import MM from './assets/icons/hunter_mm.png'
import SV from './assets/icons/hunter_survival.png'
import MageA from './assets/icons/mage_arcane.png'
import MageFi from './assets/icons/mage_fire.png'
import MageFr from './assets/icons/mage_frost.png'
import PaladinH from './assets/icons/paladin_holy.png'
import PaladinR from './assets/icons/paladin_ret.png'
import PaladinP from './assets/icons/paladin_protection.png'
import PriestD from './assets/icons/priest_disc.png'
import PriestH from './assets/icons/priest_holy.png'
import PriestS from './assets/icons/priest_shadow.png'
import RogueA from './assets/icons/rogue_assa.png'
import RogueC from './assets/icons/rogue_sub.png'
import ShamanE from './assets/icons/shaman_elem.png'
import ShamanR from './assets/icons/shaman_resto.png'
import ShamanEn from './assets/icons/shaman_enhancement.png'
import WarlockA  from './assets/icons/warlock_affli.png'
import WarlockD from './assets/icons/warlock_demono.png'
import WarlockDest from './assets/icons/warlock_destru.png'
import Arms from './assets/icons/warrior_arms.png'
import Fury from './assets/icons/warrior_fury.png'
import ProtWarr from './assets/icons/warrior_prot.png'
import Hamburger from './assets/hambruger.png'
import Crown from './assets/crown.png'
import TankIcon from './assets/tank.png'
import HealIcon from './assets/heal.png'
import DpsIcon from  './assets/dps.png'
import Calendar from './assets/time.png'
import  Location from './assets/location.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import {  useState } from 'react'



 export type Spec = 
  | "PROT_PALADIN"
  | "PROT_WARRIOR"
  |"BEAR"
  |"HOLY_PALADIN"
  |"RETRI_PALADIN"
  |"HOLY_PRIEST"
  |"SHADOW_PRIEST"
  |"DISC_PRIEST"
  |"BLOOD_DK"
  |"FROST_DK"
  |"UNHOLY_DK"
  |"BM_HUNTER"
  |"MM_HUNTER"
  |"SURV_HUNTER"
  |"FROST_MAGE"
  |"FIRE_MAGE"
  |"ARCANE_MAGE"
  |"FERAL_DRUID"
  |"BALANCE_DRUID"
  |"RESTO_DRUID"
  |"RESTO_SHAMAN"
  |"ENHA_SHAMAN"
  |"ELE_SHAMAN"
  |"COMBAT_ROGUE"
  |"ASSASSIN_ROGUE"
  |"SUB_ROGUE"
  |"FURY_WARRIOR"
  |"ARMS_WARRIOR"
  |"DEMO_WARLOCK"
  |"AFFLI_WARLOCK"
  |"DESTRO_WARLOCK"

const SPEC_EMOJIS: Record<Spec, string> = {
  PROT_PALADIN: PaladinP,
  PROT_WARRIOR: ProtWarr,
  BEAR: Guardian,

  HOLY_PALADIN: PaladinH,
  RETRI_PALADIN: PaladinR,
  HOLY_PRIEST: PriestH,
  SHADOW_PRIEST: PriestS,
  DISC_PRIEST: PriestD,

  BLOOD_DK: BDK,
  FROST_DK: FDK,
  UNHOLY_DK: UDK,

  BM_HUNTER: BM,
  MM_HUNTER:  MM,
  SURV_HUNTER: SV,

  FROST_MAGE: MageFr,
  FIRE_MAGE: MageFi,
  ARCANE_MAGE: MageA,

  FERAL_DRUID: DruidF,
  BALANCE_DRUID: DruidB,
  RESTO_DRUID: DruidR,

  RESTO_SHAMAN:  ShamanR,
  ENHA_SHAMAN: ShamanEn,
  ELE_SHAMAN: ShamanE,

  COMBAT_ROGUE: RogueC,
  ASSASSIN_ROGUE: RogueA,
  SUB_ROGUE: RogueC,

  FURY_WARRIOR: Fury,
  ARMS_WARRIOR: Arms,

  DEMO_WARLOCK: WarlockD,
  AFFLI_WARLOCK: WarlockA,
  DESTRO_WARLOCK: WarlockDest,
};
const SPEC_FIND: Record<Spec, "TANK" | "HEAL" | "DPS"> = {
  // TANK
  PROT_PALADIN: "TANK",
  PROT_WARRIOR: "TANK",
  BEAR: "TANK",

  // HEAL
  HOLY_PALADIN: "HEAL",
  HOLY_PRIEST: "HEAL",
  DISC_PRIEST: "HEAL",
  RESTO_DRUID: "HEAL",
  RESTO_SHAMAN: "HEAL",

  // DPS
  RETRI_PALADIN: "DPS",

  BLOOD_DK: "TANK",
  FROST_DK: "DPS",
  UNHOLY_DK: "DPS",

  BM_HUNTER: "DPS",
  MM_HUNTER: "DPS",
  SURV_HUNTER: "DPS",

  FROST_MAGE: "DPS",
  FIRE_MAGE: "DPS",
  ARCANE_MAGE: "DPS",

  FERAL_DRUID: "DPS",
  BALANCE_DRUID: "DPS",

  ENHA_SHAMAN: "DPS",
  ELE_SHAMAN: "DPS",

  COMBAT_ROGUE: "DPS",
  ASSASSIN_ROGUE: "DPS",
  SUB_ROGUE: "DPS",

  FURY_WARRIOR: "DPS",
  ARMS_WARRIOR: "DPS",

  SHADOW_PRIEST: "DPS",

  DEMO_WARLOCK: "DPS",
  AFFLI_WARLOCK: "DPS",
  DESTRO_WARLOCK: "DPS",
};


const url = 'http://localhost:3060' 

export interface Signup {
  id : number;
 title : string ;
 date  : string ;
 note : string ;
 leader :   string ;
 createdAt : string ;
 updatedAt  : string;
 playerSignups : PlayerSignup[]; 
 discordMessageId: string ;
 discordChannelId : string ;

}
export interface PlayerSignup{
   id : number ;
  createdAt : string;
  updatedAt :string ;
  status : string ;
  character : Character;
}
interface Character {
  id : number ;
  name : string ;
  spec : string ;
  isMain : boolean ;
  createdAt : string;
  updatedAt : string ;
  guildMemberId : number;

 guildMember : GuildMember
}
export interface GuildMember {
 id : number ,
 name : string ,
 rank : string ,
 slug : string ,
 createdAt : string ,
 updatedAt : string ,
 dkp : number ,
}


function UpcomingRaids({guild , setSelectedGuild ,  setGuildMembers }){
const [signups , setSignups] = useState<Signup[]>([])

 
 const [details , setDetails] = useState<Signup | undefined>(undefined)
 
  
 
  const getSignups = async (guildId : string) => {
 
 const response = await axios.post(`${url}/signup`, {
  
    selectedGuild : guildId,
  },
  {
    withCredentials: true
  }
 )
   setGuildMembers(response.data.signup)
   setSignups(response.data.signup)
   setDetails(response.data.signup[0])
  }


async function callSignups(e : string){
  
    if(e === '') return 
    setSelectedGuild(e)
    
    getSignups(e)
  
}
 
 function showDetails(id : number): any{
  const mapDetails = signups.find((x) =>  x.id === id)
  
  
  setDetails(mapDetails)

 }
  return ( 
    <>
    
    <div className='flex items-center flex-col justify-start  w-screen  m-1 gap-6  lg:gap-1  h-screen '>
        <img src={Hamburger} alt='Hamburger' className='w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2' />
        
     <div className="flex  flex-col lg:flex-row  w-auto  md:w-full gap-4 h-auto justify-center items-center lg:my-10">
     <div className='flex  flex-col basis-2/3 text-white p-2 m-1 items-center  lg:items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>UPCOMING RAIDS</h1>
      <h3 className='font-sans text-[16px] text-[#A1A1AA]'>View and sign up for upcoming raids</h3>
       </div>
       <div className=' flex  flex-col md:flex-row flex-1  justify-center  gap-7 lg:gap-1  '>
         <select  onChange={(e)=> callSignups(e.target.value)} className=' flex  rounded-sm text-[#A8A39A] border border-[#7C3AED] w-aut' > <option value={''}>Select guild</option> { guild.map((x) => <option key={x.id} value={x.discordGuildId}> Guild :  {x.name}</option>)} </select>
        <input type='text' placeholder='Search raids...'  className='flex basis-2/3  rounded-sm text-[#A8A39A] w-70 border border-[#7C3AED] h-10 justify-center items-center   p-1 ' ></input>
     <button type='submit'      className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer    w-full md:w-40 items-center bg-[#2B2350] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center mr-auto' > + CREATE RAID </button>
       </div>
     </div>
    <div className='flex  items-center lg:items-start  flex-col  xl:flex-row  gap-4  justify-center lg:justify-center m-auto  w-full h-auto '>
    
       <Content1 signups={signups} 
          showDetails={showDetails}/>
      {details && <Content2 
       details={details}/>}
       

    </div>
     </div>
  </>)
}
function Content1({showDetails, signups} : {showDetails :(id: number)=>void , signups: Signup[] , }){

  



  
  return ( 
  <div className='grid grid-cols-1  h-auto      w-auto lg:w-auto      gap-1'>
    { 
     signups.map((sig) => {
    
    const tanks  =  sig.playerSignups.filter((x)=> SPEC_FIND[x.character.spec] === "TANK" && x.status === "ACTIVE")
  
  const healers  =  sig.playerSignups.filter((x)=> SPEC_FIND[x.character.spec] === "HEAL" && x.status === "ACTIVE")
  
const dps  =  sig.playerSignups.filter((x)=> SPEC_FIND[x.character.spec] === "DPS" && x.status === "ACTIVE")
    
    
      const activePlayers = new Set(
  sig.playerSignups.map((x) => x.status === "ACTIVE" && x.character.guildMember.id)).size
  
console.log(activePlayers)

     
     
     
     
    return (
     <div key={sig.id} onClick={() => showDetails(sig.id)} className='flex flex-col justify-center  items-center  mx-4 h-auto sm:max-h-85  '>
   <div className='flex flex-col w-auto sm:flex-row bg-[#10161d] justify-center items-center  p-3 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4  '> 
    <div className='flex '> <img src={ILogo} alt='Raid Logo' className=' hidden lg:block max-w-70 ' ></img> </div>
    <div className='flex  flex-col lg:flex-col  '>
    <div className='flex flex-row sm:flex-col w-auto '>
      <div className='flex  flex-col w-auto lg:flex-row  '><div className='flex basis-2/3 text-1xl flex-col gap-1' ><h1 className='flex lg:text-4xl text-white'> {sig.title}</h1>
      <div className='flex flex-row text-[#A8A39A] gap-2'><img src={Calendar} alt='Calendar' className='w-5 h-5' />{sig.date} </div>
      <div className='flex flex-row w-full  lg:flex-row text-[#A8A39A] gap-2 lg:gap-1'><img src={Crown} alt='Calendar' className='w-3 h-3' />Raid Leader : <h1 className='text-[#8B5CF6]'>{sig.leader}</h1></div></div>
      <div className='flex  flex-col  '>
        <h2 className='text-[#64656c] text-2xl ml-auto'>{activePlayers}</h2>
        <p className='text-[#7C3AED] ml-auto'>{Math.max (0,25 - activePlayers )} spots left</p>
      </div>
      </div>
    </div>
     <div className='flex flex-col lg:flex-row gap-12 text-white p-2 border-t border-white/8  '> 
      <div className='flex flex-col justify-center items-center gap-2'> <img src={TankIcon} alt='Tank'  className=' w-6 lg:w-10'/> Tanks <h3 className='text-[#BA8438] text-sm lg:text-xl'> {tanks.length}</h3></div>
      <div  className='flex flex-col justify-center items-center border-x p-3 border-white/10 gap-2'> <img src={HealIcon} alt='Healer'  className='w-6 lg:w-10'/> Healers <h3 className='text-[#51aa53] text-sm lg:text-xl'>{healers.length}</h3></div>
      <div className='flex flex-col justify-center items-center gap-2'> <img src={DpsIcon} alt='Dps'  className='w-6 lg:w-10'/> Dps <h3 className='text-[#9d2a2a] text-sm lg:text-xl '>{dps.length}</h3></div>
      <button className='flex lg:flex 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer lg:ml-auto  my-auto text-[#7C3AED] border border-[#7C3AED] rounded-sm  w-auto h-auto p-3 lg:p-0 lg:w-25 lg:h-11   justify-center items-center '>SIGN UP</button>
     </div></div></div>
     </div>)})
    }
    
    </div>
  )}
function Content2({details,} : {details : Signup | undefined}){
     const uniquePlayers = new Set(
  details.playerSignups.filter((x) => x.status === "ACTIVE")
  .map(
    (x) => x.character.guildMember.id 
  )
).size;


const tanks =  details.playerSignups.filter(
    (x)=> SPEC_FIND[x.character.spec] === "TANK"  && x.status === "ACTIVE"
  )
  const healers =  details.playerSignups.filter(
    (x)=> SPEC_FIND[x.character.spec] === "HEAL" && x.status === "ACTIVE"
  )
  const dps =  details.playerSignups.filter(
    (x)=> SPEC_FIND[x.character.spec] === "DPS" && x.status === "ACTIVE"
  )
 
  const becnh = details.playerSignups.filter((x)=> 
  x.status === "BENCH")
  const tentative = details.playerSignups.filter((x)=> x.status === "TENTATIVE")

const absence = details.playerSignups.filter((x)=> x.status === "ABSENCE")
    const navigate = useNavigate()
  return (
    <>
     <div className='flex flex-col w-70 lg:w-auto lg:flex-col  flex-1  min-h-120  lg:h-screen lg:mx-6 p-1 overflow-y-auto bg-[#10161d]  p-7 lg:p-3 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] '>
       <div className='flex flex-col lg:flex-row w-full justify-end p-4 gap-10 '>  <button className=' flex 
       flex-1  
       justify-center 
       items-center 
       bg-[#2B2350]  
       h-10 rounded-sm 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer
       border border-[#5B21B6] text-[#FFFFFF] shadow-[0_0_20px_rgba(124,58,237,0.15)]'>Sign Up To This Raid</button><button   onClick={()=> navigate("/raid-comp")}    className='flex 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer flex-1  justify-center items-center bg-[#2B2350]  h-10 rounded-sm border border-[#5B21B6] text-[#FFFFFF] shadow-[0_0_20px_rgba(124,58,237,0.15)]'> Composition Tool</button></div>
        <div className='flex  flex-col text-white gap-1 w-full '>
          <h1 className=' text-xl lg:text-2xl'> {details.title}</h1>
          <div className='flex flex-row text-[#A8A39A] p-1 gap-2'> <img src={Calendar} alt='Calendar' className='w-5 h-8 lg:h-auto' /> {details.date}</div> 
          <div className='flex flex-row text-[#A8A39A] p-1 gap-2'><img src={Crown} alt='Calendar' className='w-5 h-8 lg:w-6' /> Raid Leader : <h1 className='text-[#8B5CF6]'>{details.leader}</h1></div>
          <div className='flex flex-row text-[#A8A39A] p-1 gap-2'><img src={Location} alt='Calendar' className='w-5 h-8 lg:h-auto' /> Location : Icecrown Citadel</div>
           <div className='flex r border-t  border-white/10 gap-5 justify-center text-[#A8A39A] p-1'>
             <div className=' flex flex-col justify-center  items-center gap-2 m-auto'> <img src={TankIcon} alt='Tank'  className='w-10'/> Tanks <h3 className='text-[#BA8438]'> {tanks.length}</h3></div>
      <div className='flex flex-col justify-center basis-1/3  m-auto items-center border-x p-1 border-white/10 gap-2'> <img src={HealIcon} alt='Healer'  className=' w-10'/> Healers  <h3 className='text-[#51aa53]'>{healers.length}</h3></div>
      <div className='flex flex-col justify-center items-center m-auto gap-2'> <img src={DpsIcon} alt='Dps'  className='w-10'/> Dps <h3 className='text-[#9d2a2a]'>{dps.length}</h3></div>
           </div>
           <div className='flex  flex-row text-[#A8A39A] my-2 border-y  border-white/10 p-4'> SIGNED UP ({uniquePlayers}) <h3 className='text-[#7C3AED] ml-auto'>Bench({becnh.length})</h3></div>
        </div>
        <div className='text-white flex flex-col 2xl:flex-row lg:w-full lg:gap-5 justify-center  '>
          <div><h3 className='flex flex-row items-center text-[#BA8438] p-5'><img src={TankIcon} alt='Tank'  className='w-10'/>Tanks({tanks.length})</h3>
            {tanks.map((x)=>  x.status !== "BENCH" && x.status !== "TENTATIVE" && x.status !== "ABSENCE" ? <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#F0AB43] gap-2'> <img src={User} alt='User'  className='w-6'/>{x.character.name} <span className='ml-auto'><img  src={SPEC_EMOJIS[ x.character.spec ]} alt='logo' className='w-7 lg:w-7'/></span> </div> : '')}
            
          </div>
          <div> <h3 className='flex flex-row  items-center text-[#00FF18] p-5'> <img src={HealIcon} alt='Healer'  className='w-10'/>Healers ({ healers.length})</h3>
            {healers.map((x) => <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#38F54B] gap-2'> <img src={User} alt='User'  className='w-6'/> {x.character.name} <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div>)}
             
          </div>
          <div>
            <h3 className='flex flex-row items-center text-[#9d2a2a] p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/>Dps ({dps.length})</h3>
           { dps.map((x) => x.status !== "BENCH" && x.status !== "TENTATIVE" && x.status !== "ABSENCE" ? <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-6'/> {x.character.name} <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div> : <div className='text-white' >  0</div>)}
            
          </div>
          
        </div>
        <div>
         <div>
            <h3 className='flex flex-row items-center text-white p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/> Bench ({becnh.length})</h3>
            {becnh.map((x) => <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-6'/> {x.character.name}  <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div>)}
            
          </div>
                   <div>
            <h3 className='flex flex-row items-center text-white p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/> Tentative({tentative.length})</h3>
           { tentative.map((x)=> <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-6'/> {x.character.name}  <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div> )}
            
          </div>
          <div>
            <h3 className='flex flex-row items-center text-white p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/> Absence ({absence.length})</h3>
           { absence.map((x)=>  <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-6'/> {x.character.name}  <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.name]} alt='logo' className='w-7 lg:w-7'/></span> </div>)}
            
     </div>
        
     </div>
        
    
     </div>
     </>)
       
}

export default UpcomingRaids