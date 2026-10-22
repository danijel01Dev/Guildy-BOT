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
import { useNavigate } from 'react-router-dom'
import './App.css'
import {  useEffect, useState } from 'react'
import type { Chars } from './characters'
import api from './api/api'
import toast from 'react-hot-toast'



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



export interface Signup {
  id : number;
 title : string ;
 date  : string ;
 note : string ;
 leader :   string ;
 createdAt : string ;
 updatedAt  : string;
 playerSignups : PlayerSignups[]; 
 discordMessageId: string ;
 discordChannelId : string ;

}
export interface PlayerSignups{
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


function UpcomingRaids({guild , setSelectedGuild , selectedGuild  , setHamburger , hamburger ,  }){
const [signups , setSignups] = useState<Signup[]>([])
const [rank , setRank] = useState('')





//=== Modal for Status change ===//
const [statusModal , setStatusModal] = useState(false)



//============= State for Div Content2 ======
 const [details , setDetails] = useState<Signup | undefined>(undefined)
const [optionStatus , setOptionStatus] = useState("ACTIVE")


 //=== Chars state ====
 const [chars , setChars] = useState<Chars[] | []>([])
 const [selectedChar , setSelectedChar] = useState(null)
 const [charModal , setCharModal] = useState(false)
//===== Get Chars ==== //
   async   function getChars (){
 
    const chars =  await api.post('/characters/by/user',{
      
        discordGuildId : selectedGuild.id
      },
      {
        withCredentials : true,
    }  )
    
    setChars(chars.data)    }

    useEffect(()=> {getChars()}, [])
  
  // ====  get Guild members and set role ====//
 async function getRanks() {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await api.post('/characters/get/ranks', {
      discordGuildId: selectedGuild
    }, {
      withCredentials: true
    });

    setRank(response.data.rank);
  } catch (err) {
    console.error(err);
    toast.error("Failed to get rank");
  }
}

 useEffect(() => {
  getRanks().catch(err => {
    console.error('Unhandled getRanks error:', err);
  });
}, [selectedGuild]);




    //=== SignUp Button  : create new PlayerSignup ===//
 
  const charId = chars.map(x=> x.id)
   const detailId = details?.id
    async function createSignup () {
   try{const response =  await api.post('/signup/player-signup',{
      signupId : detailId,
      characterId : Number(selectedChar),
      guildMemberCharacterIds : charId
   }, {
    withCredentials: true,
   } )

   if(response.status === 201)
     setCharModal(false)
    
    getSignups(selectedGuild)
    toast.success("Signup successfull!")
   } 
  catch(err){
    console.error(err)
    toast.error("Something went wrong.")
  }}
    

 

 

    //==== Get Signups ==== //
  const getSignups = async (guildId : string) => {
 
 const response = await api.post(`/signup`, {
  
    selectedGuild : guildId,
  },
  {
    withCredentials: true
  }
 )
   
   setSignups(response.data.signup)
   setDetails(response.data.signup[0])
  }

 //====  Guild select option  - target value ===//
async function callSignups(e : string){
  
    if(e === '') return 
    setSelectedGuild(e)
    setSelectedGuild
    getSignups(e)
  
}
 useEffect(() => {
  if (selectedGuild) {
    getSignups(selectedGuild);
  }
}, [selectedGuild]); 



//==== Find signup by id that is selected in ui . OnClick function div Content1 ===//
 function showDetails(id : number): any{
  const mapDetails = signups.find((x) =>  x.id === id )
  
  
  setDetails(mapDetails)}
   async function  changeStatus() : Promise<void> {
    try{const filterChars = details.playerSignups.map(x => x.character.id)
  .filter(id => charId.includes(id));
   if(optionStatus === '') { setOptionStatus("ACTIVE")}
     await api.post('/signup/update/status',{
      signupId : details.id,
      characterId : filterChars,
      status :  optionStatus
    }, {
      withCredentials: true,
    })
    
    
    
    setStatusModal(false)
    getSignups(selectedGuild)
    toast.success("Status change successfully!")
    } catch(err){
      console.error(err)
      toast.error("Something went wrong.")
    }}

  
  return ( 
    
    <>
     { charModal && <div className='dropdown-enter fixed inset-0 z-40 bg-black/50 '> <div className=' fixed inset-0 z-50 flex  flex-col  gap-4 items-center justify-center text-white lg:w-200 h-160 bg-black/90 m-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]'> <select className='flex w-[50%] bg-[gray] rounded-sm  h-10' onChange={(e) => setSelectedChar(e.target.value)}> <option> Select your Char </option>{chars.map(x=>  <option className="bg-[blue]" value={x.id}> {x.name}</option>)}</select> <button className='flex  justify-center items-center bg-[green] rounded-sm w-[50%] h-10'      onClick={()=> createSignup()}> Submit </button> <button   
     className='flex justify-center items-center bg-[red] w-[50%] rounded-sm h-10'   onClick={()=> setCharModal(false)}> Close</button></div></div>}
   
   
    
    <div className='content-enter flex items-center flex-col justify-start  w-screen  m-1 gap-6  lg:gap-1  h-screen '>
        <img  onClick={() => setHamburger(true)} src={Hamburger} alt='Hamburger' className={` ${hamburger && ' w-5 itmes-start xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2'} w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2`} />
        
     <div className="flex  flex-col lg:flex-row  w-auto  md:w-full gap-4 h-auto justify-center items-center lg:my-10">
     <div className='flex  flex-col basis-2/3 text-white p-2 m-1 items-center  lg:items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>UPCOMING RAIDS</h1>
      <h3 className='font-sans text-[16px] text-[#A1A1AA]'>View and sign up for upcoming raids</h3>
       </div>
       <div className=' flex  flex-col md:flex-row flex-1  justify-center  gap-7 lg:gap-1  '>
         <select  value={selectedGuild ?? ''} onChange={(e)=> callSignups(e.target.value) } className=' flex  rounded-sm text-[#A8A39A] border border-[#7C3AED] p-3 shadow-[0_0_20px_rgba(255,255,255,0.08)]' > <option value={''}>Select guild</option> { guild.map((x) => <option key={x.id} value={x.discordGuildId }>  {x.name}</option>)} </select>
       
       </div>
     </div>
    <div className='flex  items-center lg:items-start  flex-col  lg:flex-row  gap-4  justify-center lg:justify-center m-auto  w-full h-auto  text-[12px] lg:text-sm'>
    
       <Content1 signups={signups} 
          showDetails={showDetails}
          setCharModal={setCharModal}
         
          chars={chars} />
      {details && <Content2   changeStatus={changeStatus}
       details={details}
       setStatusModal={setStatusModal}
       statusModal={statusModal}
       setOptionStatus={setOptionStatus}
       optionStatus={optionStatus}
       chars={chars}
       rank={rank}/>}
       

    </div>
     </div>
  </>)
}
function Content1({showDetails, signups , setCharModal  , chars , } : {showDetails :(id: number)=>void , signups: Signup[] , setCharModal:any , chars : Chars[] | [] }){
 
  
  const charsId = chars.map(x=> x.id)
    
  
  

 

  
  return<>
      {signups.length < 1  ?  <div className='flex  flex-col justify-center items-center p-4  bg-white/6 rounded-xl  w-[80%]  mx-auto  text-white basis-2/3 min-h-70 '> <h1 className='flex  text-xl sm:text-3xl'>There is No signups Yet </h1> <h3 className='flex text-[16px] text-white/60'> Visit Discord and begin your journey </h3>  </div> :
  <div className='grid gird-cols-1  sm:grid-cols-1 h-auto      w-[90%] lg:w-auto      gap-1'>
    { 
     signups.map((sig) => {
   
     const changeSubmit = sig.playerSignups.some(x=> charsId.includes(x.character.id))
    console.log(changeSubmit)
    const tanks  =  sig.playerSignups.filter((x)=> SPEC_FIND[x.character.spec] === "TANK" && x.status === "ACTIVE")
  
  const healers  =  sig.playerSignups.filter((x)=> SPEC_FIND[x.character.spec] === "HEAL" && x.status === "ACTIVE")
  
     const dps  =  sig.playerSignups.filter((x)=> SPEC_FIND[x.character.spec] === "DPS" && x.status === "ACTIVE")
    
    
      const activePlayers = new Set(
  sig.playerSignups.map((x) => x.status === "ACTIVE" && x.character.guildMember.id)).size
  



 
     
     
     
     
    return (
     <div key={sig.id} onClick={() => showDetails(sig.id)} className='flex flex-col justify-center  items-center  mx-4  h-auto  w-[90%]  '>
   <div className='flex flex-col  w-[75%]  lg:w-auto mx-auto  xl:flex-row  justify-center items-center  p-3 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2349] gap-4 lg:m-1 '> 
    <div className='flex '> <img src={ILogo} alt='Raid Logo' className=' hidden lg:block  w-auto md:max-w-70 ' ></img> </div>
    <div className='flex  flex-col lg:flex-col  '>
    <div className='flex flex-row sm:flex-col w-auto  '>
      <div className='flex  flex-col w-auto lg:flex-row   '><div className='flex basis-2/3 text-xl flex-col gap-1' ><h1 className='flex lg:text-4xl text-white'> {sig.title}</h1>
      <div className='flex flex-row text-[#A8A39A] gap-2'><img src={Calendar} alt='Calendar' className='w-6 h-7 lg:w-6 bg-[#5B21B6] rounded-[30%] p-1 m-1' />{sig.date} </div>
      <div className='flex flex-row w-full  lg:flex-row text-[#A8A39A] gap-2 lg:gap-1 items-center'><img src={Crown} alt='Calendar' className='w-6 h-7 lg:w-6 bg-[#5B21B6] rounded-[30%] p-1 m-1' />Raid Leader : <h1 className='text-[#8B5CF6]'>{sig.leader}</h1></div></div>
      <div className='flex  flex-col  '>
        <h2 className='text-[#64656c] text-2xl ml-auto'>{activePlayers}</h2>
        <p className='text-[#7C3AED] ml-auto'>{Math.max (0,25 - activePlayers )} spots left</p>
      </div>
      </div>
    </div>
     <div className='flex flex-col  lg:flex-row gap-12 text-white p-2 border-t border-white/8  '> 
      <div className='flex flex-col justify-center items-center gap-2'> <img src={TankIcon} alt='Tank'  className=' w-6 lg:w-10'/> Tanks <h3 className='text-[#BA8438] text-sm lg:text-xl'> {tanks.length}</h3></div>
      <div  className='flex flex-col justify-center items-center border-x p-3 border-white/10 gap-2'> <img src={HealIcon} alt='Healer'  className='w-6 lg:w-10'/> Healers <h3 className='text-[#51aa53] text-sm lg:text-xl'>{healers.length}</h3></div>
      <div className='flex flex-col justify-center items-center gap-2'> <img src={DpsIcon} alt='Dps'  className='w-6 lg:w-10'/> Dps <h3 className='text-[#9d2a2a] text-sm lg:text-xl '>{dps.length}</h3></div>
     { !changeSubmit ? (<button  onClick={() =>   setCharModal(true)} className={`flex lg:flex 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer lg:ml-auto  my-auto text-[#7C3AED] border border-[#7C3AED] rounded-sm  w-auto h-auto p-3 lg:p-0 lg:w-25 lg:h-11    justify-center items-center `}>SIGN UP</button>) : (<button  onClick={() =>  setCharModal(true)} className={`flex lg:flex 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer lg:ml-auto  my-auto text-white/80  rounded-sm  w-auto h-auto p-3 lg:p-0 lg:w-25 lg:h-11 ${ changeSubmit &&      'bg-[green]/70 '} justify-center items-center `}> SIGNED UP</button>)}
     </div></div></div>
     </div>)})
    }
    
    </div>
  
  }
  </>}
  
function Content2({details, changeStatus , setStatusModal , statusModal, setOptionStatus , optionStatus , chars , rank } : {details : Signup | undefined, changeStatus : (e : string )=> Promise<void>, setStatusModal : any , statusModal: any, setOptionStatus : any, optionStatus : any, chars: any, rank:string}){


  

    
     const uniquePlayers = new Set(
  details.playerSignups.filter((x) => x.status === "ACTIVE")
  .map(
    (x) => x.character.guildMember.id 
  )
).size;

const charId = chars.map(x=> x.id)
  const filterChars = details.playerSignups.map(x => charId.includes(x.character.id) ? x.character.id : [])
  const  isTrue = filterChars.length > 0


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
     { statusModal && <div className='dropdown-enter fixed inset-0 z-40 bg-black/50 '> <div className=' fixed inset-0 z-50 flex  flex-col  gap-4 items-center justify-center text-white lg:w-200 h-160 bg-black/90 m-auto rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350]'> Change your status :  Signup #{`${details.title}`} <select  onChange={(e) => setOptionStatus(e.target.value)} className='w-[50%]  h-13 border border-white/20 rounded-sm p-2 bg-[gray]/40'> <option>Select your status</option><option      value="ACTIVE">Active</option> <option value="BENCH"> Bench</option> <option value="TENTATIVE" > Tentative</option><option value="ABSENCE">Absence</option></select> <button className='flex  justify-center items-center bg-[green] rounded-sm w-[50%] h-10' onClick={()=> changeStatus(optionStatus)}     > Submit </button> <button   
     className='flex justify-center items-center bg-[red] w-[50%] rounded-sm h-10'   onClick={()=> setStatusModal(false)}> Close</button></div></div>}
     <div className='flex flex-col w-70 lg:w-auto lg:flex-col  flex-1  min-h-120  lg:h-screen lg:mx-6 p-1 overflow-y-auto   p-7 lg:p-3 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] '>
       <div className='flex flex-col lg:flex-row w-full justify-end p-4 gap-10 '>  <button disabled={!isTrue} onClick={() =>  setStatusModal(true)}  className=' flex 
       flex-1  
       justify-center 
       items-center 
        
       h-10 rounded-sm 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer
       border border-[#5B21B6] text-[#FFFFFF] shadow-[0_0_20px_rgba(124,58,237,0.15)]'>Change Status</button><button disabled={rank !== 'OFFICER'}  onClick={()=> navigate(`/raid-comp/${details.id}`)}    className='flex 
       transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:text-white
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer flex-1  justify-center items-center   h-10 rounded-sm border border-[#5B21B6] text-[#FFFFFF] shadow-[0_0_20px_rgba(124,58,237,0.15)]'> Composition Tool</button></div>
        <div className='flex  flex-col text-white gap-1 w-full '>
          <h1 className='flex  text-xl lg:text-2xl flex  sm:mx-8 '> {details.title}</h1>
          <div className='flex flex-row text-[#A8A39A] p-1 gap-2 items-center'> <img src={Calendar} alt='Calendar' className='w-7 h-8 lg:w-7 bg-[#5B21B6] rounded-[30%] p-1' /> {details.date}</div> 
          <div className='flex flex-row text-[#A8A39A] p-1 gap-2 items-center'><img src={Crown} alt='Calendar' className='w-6 h-8 lg:w-7 bg-[#5B21B6] rounded-[30%] p-1' /> Raid Leader : <h1 className='text-[#8B5CF6]'>{details.leader}</h1></div>
         
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
           { dps.map((x) => x.status !== "BENCH" && x.status !== "TENTATIVE" && x.status !== "ABSENCE" ? <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-8'/> {x.character.name} <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div> : <div className='text-white' >  0</div>)}
            
          </div>
          
        </div>
        <div>
         <div>
            <h3 className='flex flex-row items-center text-white p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/> Bench ({becnh.length})</h3>
            {becnh.map((x) => <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-8'/> {x.character.name}  <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div>)}
            
          </div>
                   <div>
            <h3 className='flex flex-row items-center text-white p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/> Tentative({tentative.length})</h3>
           { tentative.map((x)=> <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-8'/> {x.character.name}  <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div> )}
            
          </div>
          <div>
            <h3 className='flex flex-row items-center text-white p-5'><img src={DpsIcon} alt='Dps'  className='w-10'/> Absence ({absence.length})</h3>
           { absence.map((x)=>  <div key={x.id} className=' flex border-b border-white/5 p-3 text-[#9d2a2a] gap-2'><img src={User} alt='User'  className='w-7 h-7'/> {x.character.name}  <span className='ml-auto'><img  src={SPEC_EMOJIS[x.character.spec]} alt='logo' className='w-7 lg:w-7'/></span> </div>)}
            
     </div>
        
     </div>
        
    
     </div>
     </>)
       
}

export default UpcomingRaids