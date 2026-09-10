import axios from 'axios'
import ILogo from './assets/raidLogo.png'
import { useEffect, useState } from 'react'
import Hamburger from './assets/hambruger.png'
import './App.css'
import  type { PlayerSignups } from './upcoming-raids'
import type { Spec } from './composition'
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


interface Chars {
   id : number ,
  name : string ,
  spec : Spec,
  isMain : boolean,
  guildMemberId : number ,
  playerSignups : PlayerSignups[],

   
}
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




const url = 'http://localhost:3060' 
function MySignups({  selectedGuild }){
   
   const [signups , setSignups] = useState([])
   const [chars , setChars] = useState<Chars[]>([])
  const getSignups = async (guildId : string) => {
 
 const response = await axios.post(`${url}/signup`, {
  
    selectedGuild : guildId,
  },
  {
    withCredentials: true
  }
 )
   
   setSignups(response.data.signup)
  
  }
 useEffect(() => { getSignups(selectedGuild)},[selectedGuild])

 

async   function getChars (){
 
    const response =  await axios.post('http://localhost:3060/characters/by/user',{
      
        discordGuildId : selectedGuild
      },
      {
        withCredentials : true,
    }  )
    
    setChars(response.data)    }

    useEffect(()=> {getChars()}, [])
   console.log(chars)
  
    const filterChars = chars.map(x => x.name)

const filterSignups = signups.filter(signup =>
  signup.playerSignups.some(playerSignup =>
    filterChars.includes(playerSignup.character.name)
  )
)
     
     console.log(filterSignups)
  
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
    
       <Content4 filterSignups={filterSignups}  filterChars={filterChars}/>
      
       

    </div>
     </div>
  </>)}
  function Content4({filterSignups, filterChars}){
    return (
     <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1  gap-5  w-full  p-3 items-start '>
      
      { 
      filterSignups.map( (x) =>  {const  e = x.playerSignups.filter(ps => filterChars.includes(ps.character.name))
  .map(ps => ps.character.name).join(' / ')
  const emoji = x.playerSignups.filter( ps=> filterChars.includes(ps.character.name)).map(ps=> ps.character.spec)
  
  
   return (<div  key={x.id} className='flex  w-full flex-col  sm:flex-row  items-center rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]' > 
         <img src={ILogo} alt='Logo' className='w-0 sm:w-15 sm:h-15 sm:ml-5 ' />
        <div className='flex flex-col sm:flex-row m-3 w-full p-2 sm:justify-between sm:gap-2'>
          <h1 className='flex text-white text-lg justify-center  items-center'>{x.title}</h1>
          <div className='flex items-center text-white text-sm gap-2 justify-center flex-row sm:flex-col'> {x.date} </div>
          <div className='flex justify-center  sm:grid sm:grid-col-1  text-white items-center flex-col text-sm gap-1'> Signed as: <h3 className='text-[#8B5CF6] flex flex-col'>{e}</h3> <div className='flex flex-row xl:grid grid-cols-11 '>  {emoji.map( x => <img src={SPEC_EMOJIS[x]} alt='Calendar' className='  w-10 lg:w-10  h-10 lg:h-8 lg:h-auto' /> )}</div>  </div>
        </div>
        <div> <button className='text-[#03fc07] p-2'>ACTIVE</button></div>
      </div>
     ) })} 
      </div>

)
  }

  export default MySignups