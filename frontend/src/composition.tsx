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
import Misery from './assets/raid-buffs/hit.jpg'
import Moonkin from './assets/raid-buffs/moonkin.jpg'
import Rampage from './assets/raid-buffs/rampage.jpg'
import Spellp from './assets/raid-buffs/spell-power.jpg'
import Wrath from './assets/raid-buffs/wrath.jpg'
import Talon from './assets/raid-buffs/icy-talon.jpg'
import Trueshot from './assets/raid-buffs/trueshot.jpg'
import Pack from './assets/raid-buffs/pack.jpg'
import Haste from './assets/raid-buffs/haste.jpg'
import Bleed from './assets/raid-buffs/bleed.jpg'
import FearieFire from './assets/raid-buffs/feari-fire.jpg'
import Hero from './assets/raid-buffs/hero.jpg'
import './App.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

const random = Math.floor(Math.random() *  31)






 function Composition(){
  const [ signedUp , setSignedUp ] = useState([])
  const [signup , setSignup] = useState([])
 const {raidId } = useParams()
  async function getSignups() {
    const response = await axios.post('http://localhost:3060/signup/find', {
       raidId  : Number(raidId)
    }, {
      withCredentials: true,
    })
    console.log(response.data)
    setSignup(response.data.playerSignups)
 }
 useEffect( ()=> { getSignups()}, [raidId])
  console.log(raidId)
  return ( 
    <>
    
    <div className='flex items-center flex-col justify-start  w-screen  m-1  gap-8 lg:gap-1  h-screen p-3 m-2 '>
        <img src={Hamburger} alt='Hamburger' className='w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2' />
        
     <div className="flex  flex-col lg:flex-row  w-auto  md:w-full gap-4 h-auto justify-center items-center lg:my-10  ">
     <div className='flex  flex-col sm:flex-row basis-2/3 text-white p-2 m-1 items-center  lg:items-center  gap-3'><h1 className='font-title  text-xl lg:text-xl tracking-wider text-[#8B5CF6] uppercase'>Icecrown Citadel 25 HC </h1>
      <h3 className='flex  justify-center font-sans text-[16px] text-[#A1A1AA] items-center '>View and sign up for upcoming raids</h3>
       </div>
       <div className=' flex  flex-col md:flex-row   justify-center  gap-6 lg:gap-1 w-full m-1 '>
        <div className='flex  text-white gap-2 justify-center items-center m-auto bg-[#2B2350] p-3 rounded-lg'>
          <p className='flex  w-full'> May 25, 2026 </p>
          <p> 19:00</p>
        </div>
         <button type='submit'      className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer   w-full md:w-40 items-center bg-[#2B2350] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center ' > Update Signup </button> 
      
        <button type='submit'      className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer  lg:mr-5  w-full md:w-40 items-center bg-[#2B2350] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center ' > Delete Signup</button>
       </div>
     </div>
    <div className='flex items-center  flex-col  xl:flex-row  gap-4  justify-center lg:justify-evenly   w-full h-auto '>
    
       <Signup  signup={signup}
       signedUp={signedUp}/>
       

    </div>
     </div>
  </>)
}
function Signup({signup, signedUp}){
  return (
    
    <div className='grid grid-cols-1 text-white w-full h-auto p-3 m-2 justify-start items-start '> 
     <div className='flex justify-center itmes-center '><h1 className='flex justify-center items-center p-4'> Raid Composition</h1></div>
    <div className='grid grid-cols-6  sm:flex sm:flex-row justify-center gap-2'>
      <img src={Misery} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Bleed} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Hero} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Rampage} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Spellp} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Moonkin} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Wrath} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Talon} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Trueshot} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Pack} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={Haste} alt='icon' className='w-7 lg:w-10 rounded-xl' />
      <img src={FearieFire} alt='icon' className='w-7 lg:w-10 rounded-xl' />

    </div>
   
  
    <div className='grid grid-cols-2 lg:grid-cols-5 p-4 gap-3 w-full'>
      { signedUp.map((x) =>  <div key={x.character.id} className='flex flex-row justify-center items-center p-2 gap-2 w-full max-h-20 h-auto border border-[#7C3AED]'>
        <img  src={SPEC_EMOJIS[x.character.spec]} alt='Combat Rogue' className='w-10 lg:w-10' />
       <div><p className='text-[#7C3AED]'>{x.character.name}</p>
           <p>{SPEC_LABELS[x.character.spec]}</p></div>
           <button  className='flex  w-10 lg:w-11 lg:h-8 rounded-sm h-auto justify-center items-center    text-xl lg:text-xl text-[#7C3AED] ' >[ - ]</button>
           </div>)}
          
           </div>

    
   <div className='flex w-full justify-center items-center'> <button className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer   w-full md:w-40 items-center bg-[#8B5CF6] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center ' > Announce</button></div>







    <div className='grid gird-cols-1 h-full p-3 m-2  gap-3'>
      <div className='grid grid-cols-1 lg:grid-cols-4  p-4  bg-[#10161d] shadow-[0_0_20px_rgba(255,255,255,0.08)]  rounded-sm '>
        <h1 className='flex justify-center items-center'>SIGNED UP PLAYERS  (25)</h1> 
       
        
         <div> <input type='text' placeholder='Search for character...'  className='flex   rounded-sm text-[#A8A39A]  w-auto xl:w-60 border border-[#7C3AED] h-10 justify-center items-center   p-1 m-auto' ></input></div>
       <select className='flex   rounded-sm text-[#A8A39A] lg:ml-auto w-auto xl:w-60 border border-[#7C3AED] h-10 justify-center items-center   p-1 ' >
        <option>All Roles</option>
          <option>Tanks</option>
          <option> Healers</option>
          <option> Dps</option>
        </select>
      </div>
    <div className='grid grid-cols-2 gap-3'>{ signup.map( x => <div className='grid  grid-cols-5 border border-[#7C3AED] h-full max-h-15 items-center p-2 '> 
    <img src={ILogo}  alt='Logo' className='w-7 lg:w-10'/>
      <div>
        <p>{x.character.name}</p>
      </div>
      <div className='flex flex-row justify-center items-center gap-2 '>
        <img src={SPEC_EMOJIS[x.character.spec]} alt='Logo' className='w-7 lg:w-10' /> 
       
      </div>
      <div>
        <p>{SPEC_FIND[x.character.spec]}</p>
      </div>
      <div><button  className='flex  w-10 lg:w-11 lg:h-8 rounded-sm h-full justify-center items-center    text-2xl lg:text-4xl text-[#7C3AED] ' >+</button> </div>
      </div>)}
      
      </div>
      </div>
      
      
         </div>
  )
}

export default Composition