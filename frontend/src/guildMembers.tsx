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

import './App.css'


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

















function GuildMembers({guild}){
 
 console.log(guild)

  return ( 
    <>
    <div className='flex items-center flex-col justify-center  w-full  m-1  mt-25  h-full'>
      <img src={Hamburger} alt='Hamburger' className='w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2' />
     <div className="flex  flex-col lg:flex-row  w-full  md:w-full gap-4 h-auto  items-center">
     <div className='flex  flex-col basis-2/3 text-white p-2 m-1  items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>GUILD MEMBERS</h1>
      <h3 className='font-sans text-[16px] text-[#A1A1AA]'>View guild members</h3>
       </div>
        <div className=' flex  flex-col md:flex-row flex-1  justify-base gap-1  '>
        
        <input type='text' placeholder='Search for character...'  className='flex basis-2/3  rounded-sm text-[#A8A39A]  w-auto xl:w-70 border border-[#7C3AED] h-10 justify-center items-center   p-1 m-auto' ></input></div>
     </div>
    <div className='flex items-start flex-1 flex-col  lg:flex-row  gap-4 justify-base  h-screen  w-full  '>
    
       <Content5 />
      
       

    </div>
     </div>
  </>)}
  function Content5(){
    return (
       <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1  gap-5  w-full  p-3 items-start '>
       <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-3 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='flex items-center justify-content text-white flex-col lg:flex-row gap-1 p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
        <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-2 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='grid  grid-cols-2 gap-1 lg:grid-cols-5 items-center justify-content text-white flex-col lg:flex-row  p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /><img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
        <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-3 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='flex items-center justify-content text-white flex-col lg:flex-row gap-1 p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
        <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-3 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='flex items-center justify-content text-white flex-col lg:flex-row gap-1 p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
        <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-3 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='flex items-center justify-content text-white flex-col lg:flex-row gap-1 p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
        <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-3 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='flex items-center justify-content text-white flex-col lg:flex-row gap-1 p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
        <div className='flex w-full items-center min-h-25 h-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] gap-4'>
          <img src={ILogo} alt='Logo' className='w-0  sm:w-15 sm:h-15 sm:ml-5 ' />
                          <div className='grid  grid-cols-5 sm:grid-cols-5 w-full gap-3 '>
                         <p className='flex justify-center text-white text-sm lg:text-xl items-center my-1'>Dadix</p>
                         <p className='flex justify-center text-white items-center text-sm lg:text-xl  m-1'>Warrior</p>
                         <div className='flex my-3 justify-center flex-row sm:flex-row items-center gap-3 text-white text-center'> <img src={SPEC_EMOJIS['ARMS_WARRIOR']} className=' w-6 lg:w-8' />Main</div>
                         <div className='flex items-center justify-content text-white flex-col lg:flex-row gap-1 p-1'>Alt <img src={SPEC_EMOJIS['BALANCE_DRUID']} className='w-8'     /> <img src={SPEC_EMOJIS['BLOOD_DK']} className='w-8'     /> <img src={SPEC_EMOJIS['DEMO_WARLOCK']} className='w-8'     /></div>
                         <p className='flex justify-center text-center text-white text-sm lg:text-xl items-center'> Guild Master</p>
                 
                          </div>

       </div> 
       </div>

    )

  }



  export default GuildMembers