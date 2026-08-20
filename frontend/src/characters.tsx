
import Guildy from './assets/guildy.png'

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

import './App.css'
import { useEffect, useState } from 'react'
import type { PlayerSignup } from './upcoming-raids'
import axios from 'axios'


const SPEC_LABELS: Record<Spec, string> = {
  PROT_PALADIN: 'Protection Paladin',
  PROT_WARRIOR: 'Protection Warrior',
  BEAR: 'Bear Druid',

  HOLY_PALADIN: 'Holy Paladin',
  RETRI_PALADIN: 'Retribution Paladin',
  HOLY_PRIEST: 'Holy Priest',
  SHADOW_PRIEST: 'Shadow Priest',
  DISC_PRIEST: 'Discipline Priest',

  BLOOD_DK: 'Blood DK',
  FROST_DK: 'Frost DK',
  UNHOLY_DK: 'Unholy DK',

  BM_HUNTER: 'Beast Mastery Hunter',
  MM_HUNTER: 'Marksmanship Hunter',
  SURV_HUNTER: 'Survival Hunter',

  FROST_MAGE: 'Frost Mage',
  FIRE_MAGE: 'Fire Mage',
  ARCANE_MAGE: 'Arcane Mage',

  FERAL_DRUID: 'Feral Druid',
  BALANCE_DRUID: 'Balance Druid',
  RESTO_DRUID: 'Restoration Druid',

  RESTO_SHAMAN: 'Restoration Shaman',
  ENHA_SHAMAN: 'Enhancement Shaman',
  ELE_SHAMAN: 'Elemental Shaman',

  COMBAT_ROGUE: 'Combat Rogue',
  ASSASSIN_ROGUE: 'Assassination Rogue',
  SUB_ROGUE: 'Subtlety Rogue',

  FURY_WARRIOR: 'Fury Warrior',
  ARMS_WARRIOR: 'Arms Warrior',

  DEMO_WARLOCK: 'Demonology Warlock',
  AFFLI_WARLOCK: 'Affliction Warlock',
  DESTRO_WARLOCK: 'Destruction Warlock',
};
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




interface Chars {
   id : number ,
  name : string ,
  spec : Spec,
  isMain : boolean,
  guildMemberId : number ,
  playerSignups : PlayerSignup[],

   
}

function CharactersDiv({selectedGuild}){
  const [chars , setChars] = useState<Chars | []>([])

async   function getChars (){
 
    const chars =  await axios.post('http://localhost:3060/characters/by/user',{
      
        discordGuildId : selectedGuild
      },
      {
        withCredentials : true,
    }  )
    
    setChars(chars.data)    }

    useEffect(()=> {getChars()}, [])
  return ( 
    <>
    <div className='flex items-center flex-col justify-center  w-full  m-1  mt-25  h-full'>
      <img src={Hamburger} alt='Hamburger' className='w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2' />
     <div className="flex  flex-col lg:flex-row  w-full  md:w-full gap-4 h-auto  items-center">
     <div className='flex  flex-col basis-2/3 text-white p-2 m-1  items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>MY CHARACTERS</h1>
      <h3 className='font-sans text-[16px] text-[#A1A1AA]'>Manage your registered characters</h3>
       </div>
       <div className=' flex  flex-col md:flex-row flex-1  justify-base gap-1  '>
         
        <input type='text' placeholder='Search for character...'  className='flex basis-2/3  rounded-sm text-[#A8A39A] w-70 border border-[#7C3AED] h-10 justify-center items-center   p-1 m-auto' ></input>
        <button type='submit' className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer lg:ml-2 w-full md:w-40 items-center bg-[#2B2350] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center m-auto' > ADD CHARACTER </button>
       </div>
     </div>
    <div className='flex items-center  flex-col  lg:flex-row  gap-4 justify-evenly h-screen  w-full  '>
    
       <Content3 chars={chars} />
      
       

    </div>
     </div>
  </>)
}
function Content3({chars}){
  return  <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid [1600px]:grid-cols-3 xxl:grid-cols-3 w-auto lg:justify-center overflow-y-auto gap-6 h-auto lg:flex-col   mb-auto mt-10  flex-col p-4 lg:gap-4'> 
    {chars.map( (char) => <div key={char.id} className='flex  text-white w-70 lg:w-auto flex-col lg:justify-center items-center p-5  lg:flex-row shadow-[0_0_20px_rgba(255,255,255,0.08)] lg:border lg:border-[#2B2350] rounded-xl  lg:bg-[#10161d] lg:p-3 '>  <img src={Guildy} alt='Guildy' className='w-23 h-23 rounded-2xl ' />  <div className='flex flex-col justify-center lg:p-4 m-2'><h1 
     className='flex  lg:text-2xl justify-center text-[#8B5CF6]'>{char.name}</h1>
     <p >Level 80 {SPEC_LABELS[char.spec]} </p></div> 
     <p className='flex lg:p-4 m-3 xl:justify-center   items-center'><img src={SPEC_EMOJIS[char.spec]} alt='BDK' className='w-10'/></p>
      <button  className='flex bg-[#2B2350] w-auto m-2 p-2  lg:ml-auto justify-center lg:ml-auto items-center rounded-sm'> Update</button>
     <button  className='flex bg-[#2B2350] w-auto m-2 p-2  lg:ml-auto justify-center  items-center rounded-sm'> Remove</button></div>
)}
     </div>
}
export default CharactersDiv