
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
import type { PlayerSignups } from './upcoming-raids'
import api from './api/api'
import toast from 'react-hot-toast'



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


  const CLASS_SPECS = {
  PALADIN: [
    "PROT_PALADIN",
    "HOLY_PALADIN",
    "RETRI_PALADIN",
  ],

  WARRIOR: [
    "PROT_WARRIOR",
    "FURY_WARRIOR",
    "ARMS_WARRIOR",
  ],

  DRUID: [
    "BEAR",
    "FERAL_DRUID",
    "BALANCE_DRUID",
    "RESTO_DRUID",
  ],

  PRIEST: [
    "HOLY_PRIEST",
    "SHADOW_PRIEST",
    "DISC_PRIEST",
  ],

  DEATH_KNIGHT: [
    "BLOOD_DK",
    "FROST_DK",
    "UNHOLY_DK",
  ],

  HUNTER: [
    "BM_HUNTER",
    "MM_HUNTER",
    "SURV_HUNTER",
  ],

  MAGE: [
    "FROST_MAGE",
    "FIRE_MAGE",
    "ARCANE_MAGE",
  ],

  SHAMAN: [
    "RESTO_SHAMAN",
    "ENHA_SHAMAN",
    "ELE_SHAMAN",
  ],

  ROGUE: [
    "COMBAT_ROGUE",
    "ASSASSIN_ROGUE",
    "SUB_ROGUE",
  ],

  WARLOCK: [
    "DEMO_WARLOCK",
    "AFFLI_WARLOCK",
    "DESTRO_WARLOCK",
  ],
} 
const CLASS_LABELS = {
  PALADIN: 'Paladin',
  WARRIOR: 'Warrior',
  DRUID: 'Druid',
  PRIEST: 'Priest',
  DEATH_KNIGHT: 'Death Knight',
  HUNTER: 'Hunter',
  MAGE: 'Mage',
  SHAMAN: 'Shaman',
  ROGUE: 'Rogue',
  WARLOCK: 'Warlock',
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




 export interface Chars {
   id : number ,
  name : string ,
  spec : Spec,
  isMain : boolean,
  guildMemberId : number ,
  playerSignups : PlayerSignups[],

   
}

function CharactersDiv({selectedGuild , hamburger , setHamburger, newChars, setNewChars , chars , setChars} : { selectedGuild : any , hamburger : any , setHamburger : any, newChars : any , setNewChars : any , chars:any , setChars : any}){
  
  const [charModal, setCharModal] = useState(false)
  const [deleteCharModal , setDeleteCharModal] = useState(false)
  const [selectedChar , setSelectedChar] = useState<Chars>()
  const [selectedCharName , setSelectedCharName] = useState<Chars>()
  const [spec , setSpec] = useState<Chars>()
  const [chooseClass , setChooseClass] = useState('')
  const [ chooseSpec , setChooseSpec] = useState('')
  const [charName , setCharName] = useState('')
  const [chooseSpecModal , setChooseSpecModal]= useState(false)
  
  const [search , setSearch] = useState('')
async   function getChars (){
 try{
    const response =  await api.post('/characters/by/user',{
      
        discordGuildId : selectedGuild
      },
      {
        withCredentials : true,
    }  )
    
    setChars(response.data) 
   
   } 
    catch(err){
       console.log(err)
       if( err.status === 404) toast.error('No chars registered ')
    }  }

    useEffect(()=> { setChars([]); setSearch('');  setNewChars([]);   getChars()}, [selectedGuild]  )
   
    //== Remove Char ==//
  async   function removeChar(){
try{
   const name = selectedCharName
    await api.post(`/characters/delete`,{
      guildId : selectedGuild,
      name : name 
    },{
      withCredentials: true ,
    })
    setDeleteCharModal(false)
    getChars()
    toast.success('Sucessfully deleted!')
 } 
catch(err){
  console.log(err)
  if(err.status  === 400) { toast.error(" You can't remove your main character")}
  toast.error('Something went wrong.')

} }
    


    //=== update char === //
   async function updateChar( ){
    try{  const name = selectedCharName
      const newSpec = spec
      const id = selectedChar.id
     
     await api.patch(`/characters/update:${id}`,{
        guildId : selectedGuild,
        name : name ,
        spec: newSpec ,
      }, {
        withCredentials: true ,
      })
      getChars();
      setCharModal(false)
    toast.success("Successfully updated!")
    }
  catch(err){
    console.log(err)
    toast.error('Something went wrong.')
  }}


    //=== Register Character ====//
   async  function registerChar(){
    try{  await  api.post('/characters/create',{
        guildId : selectedGuild,
        slug : charName ,
        spec : chooseSpec
      },{
        withCredentials:true,
      })
     setChooseSpecModal(false)
     getChars()
     toast.success('Character registered successfully!')
     }
    catch(err){
      console.log(err)
      toast.error('Something went wrong.')
    } }
    
    //==== Filter Input ====//
    function filterInput( e : string){
      setSearch(e)
      const filterChars = chars.filter(x=>  x.name.toLowerCase().includes(e.toLowerCase()))
      setNewChars(filterChars)
      
    }
    
  return ( 
    <>
     { chooseSpecModal && <div className='dropdown-enter fixed  flex justify-center items-center  z-[40] bg-[gray]/40 w-[100%]  top-0 left-0  h-[100%]'>  <div className='flex flex-col justify-center items-center w-[50%] h-[50%] gap-5 text-white bg-[black]/80 rounded-2xl box-blakc border border-[#2B2350] '> Register Your Character  <div className='flex w-[40%] flex-col  m-1'>Character Name *<input className='flex bg-white/30 rounded-sm p-2' placeholder='Input Char name ...' onChange={(e)=>  setCharName(e.target.value)}></input></div> <select className='flex w-[40%]' value={chooseClass} onChange={(e)=> setChooseClass(e.target.value)}> <option value=""> Select Class</option>{Object.entries(CLASS_LABELS).map(([spec, label])=> <option key={spec} value={spec}> {label}</option>)}</select>  <select className='flex w-[40%]' value={chooseSpec} disabled={!chooseClass} onChange={(e)=> setChooseSpec(e.target.value)}> <option value="">Choose Your Spec </option>{CLASS_SPECS[chooseClass]?.map(x=> <option  key={x} value={x}> {SPEC_LABELS[x]}</option>) }</select> <button    className='flex  w-[30%] rounded-xl p-2 bg-[green]/70' onClick={()=> registerChar()}>Submit</button><button onClick={()=> setChooseSpecModal(false)} className='flex w-[30%] rounded-xl p-2 bg-[red]/70'> Close</button></div> </div>}
       <div className='content-enter flex items-center flex-col justify-center  w-full  m-1  mt-25  h-full'>
      <img  onClick={() => setHamburger(true)} src={Hamburger} alt='Hamburger' className={` ${hamburger && ' w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2'} w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2`} />
     <div className="flex  flex-col lg:flex-row  w-full  md:w-full gap-4 h-auto  items-center">
     <div className='flex  flex-col basis-2/3 text-white p-2 m-1  items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>MY CHARACTERS</h1>
      <h3 className='font-sans text-[16px] text-[#A1A1AA]'>Manage your registered characters</h3>
       </div>
       <div className=' flex  flex-col md:flex-row flex-1  justify-base gap-1  '>
         
        <input  disabled={ chars === undefined || chars.length < 1 } onChange={(e)=>   filterInput(e.target.value)}    type='text' placeholder='Search for character...'  className='flex basis-2/3  rounded-sm text-[#A8A39A] w-70 border border-[#7C3AED] h-10 justify-center items-center   p-1 m-auto' ></input>
        <button  disabled={selectedGuild === '' }    onClick={()=> setChooseSpecModal(true)}    type='submit' className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer lg:ml-2 w-full md:w-40 items-center bg-[#2B2350] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center m-auto sm:mr-3' > Register Character </button>
       </div>
     </div>
   { chars === undefined  || chars.length < 1  ?     <div className=' flex  flex-col justify-center items-center p-4  bg-white/6 rounded-xl  w-[80%]  mx-auto  text-white basis-2/3 min-h-70 ' > <h1 className='flex text-3xl text-white/90'>No characters registered yet</h1>  <h3 className='text-white/60 '>Create your first character to get started.  </h3> </div>                       : <div className='flex items-center  flex-col  lg:flex-row  gap-4 justify-evenly h-screen  w-full  '>
    
       <Content3 chars={chars}  setCharModal={setCharModal} setSelectedCharName={setSelectedCharName}  setSpec={setSpec}
       charModal={charModal}
       selectedChar={selectedChar}
       setSelectedChar={setSelectedChar}
       updateChar={updateChar}
       deleteCharModal={deleteCharModal}
       setDeleteCharModal={setDeleteCharModal}
       removeChar={removeChar}
       newChars={newChars}
       search={search}/>
      
       

    </div>}
     </div>
  </>)
}
function Content3({chars , setCharModal, charModal, selectedChar , setSelectedChar , setSelectedCharName , setSpec , updateChar , deleteCharModal , setDeleteCharModal , removeChar, newChars, search }){
   
   useEffect(() => {
  setSelectedCharName(selectedChar?.name);
}, [selectedChar]);
    const spec = selectedChar?.spec
      const specMap = Object.entries(CLASS_SPECS).find(([_, specs]) => specs.includes(spec))?.[0];
     
     
     
    
  return  <>
   { charModal && <div className='dropdown-enter fixed  flex justify-center items-center  z-[40] bg-[gray]/40 w-[100%]  top-0 left-0  h-[100%]'>  <div className='flex flex-col justify-center items-center w-[50%] h-[50%] gap-4 text-white bg-[black]/80 rounded-2xl box-blakc border border-[#2B2350] '> <select className='w-[40%] p-3 bg-[gray]/40  rounded-xl' onChange={(e)=> {setSpec(e.target.value)   } }> <option >Select your Spec</option>{CLASS_SPECS[specMap].map(x=>   <option  value={x}> {SPEC_LABELS[x]}</option>)}  </select><button className='flex  w-[30%] rounded-xl p-2 bg-[green]/70' onClick={()=> updateChar()}>Submit</button><button onClick={()=> setCharModal(false)} className='flex w-[30%] rounded-xl p-2 bg-[red]/70'> Close</button></div> </div>}
   { deleteCharModal && <div className='dropdown-enter fixed  flex justify-center items-center  z-[40] bg-[gray]/40 w-[100%]  top-0 left-0  h-[100%]'>  <div className='flex flex-col justify-center items-center w-[50%] h-[50%] gap-4 text-white bg-[black]/80 rounded-2xl box-blakc border border-[#2B2350] '>Confrim your action's  <button className='flex  w-[30%] rounded-xl p-2 bg-[green]/70' onClick={()=> removeChar()}>Submit</button><button onClick={()=> setDeleteCharModal(false)} className='flex w-[30%] rounded-xl p-2 bg-[red]/70'> Close</button></div> </div>}
  <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid [1600px]:grid-cols-3 xxl:grid-cols-3 w-auto lg:justify-center overflow-y-auto gap-6 h-auto lg:flex-col   mb-auto mt-10  flex-col p-4 lg:gap-4'> 
    { search.length > 0 ?  newChars.map( (char) => <div key={char.id} onClick={()=> setSelectedChar(char)} className='flex  text-white w-70 lg:w-auto flex-col lg:justify-center items-center p-5  lg:flex-row shadow-[0_0_20px_rgba(255,255,255,0.08)] lg:border lg:border-[#2B2350] rounded-xl   lg:p-3 '>  <img src={Guildy} alt='Guildy' className='w-23 h-23 rounded-2xl ' />  <div className='flex flex-col justify-center lg:p-4 m-2'><h1 
     className='flex  lg:text-2xl justify-center text-[#8B5CF6]'>{char.name}</h1>
     <p >Level 80 {SPEC_LABELS[char.spec]} </p></div> 
     <p className='flex lg:p-4 m-3 xl:justify-center   items-center'><img src={SPEC_EMOJIS[char.spec]} alt='BDK' className='w-10'/></p>
      <button  onClick={() => {setCharModal(true) }} className='flex bg-[#2B2350] w-auto m-2 p-2  lg:ml-auto justify-center lg:ml-auto items-center rounded-sm'> Update</button>
     <button  onClick={()=> {setDeleteCharModal(true) ; setSelectedCharName(char.name) }} className='flex bg-[#2B2350] w-auto m-2 p-2  lg:ml-auto justify-center  items-center rounded-sm'> Remove</button></div>
) : chars?.map( (char) => <div key={char.id} onClick={()=> setSelectedChar(char)} className='flex  text-white w-70 lg:w-auto flex-col lg:justify-center items-center p-5  lg:flex-row shadow-[0_0_20px_rgba(255,255,255,0.08)] lg:border lg:border-[#2B2350] rounded-xl   lg:p-3 '>  <img src={Guildy} alt='Guildy' className='w-23 h-23 rounded-2xl ' />  <div className='flex flex-col justify-center lg:p-4 m-2'><h1 
     className='flex  lg:text-2xl justify-center text-[#8B5CF6]'>{char.name}</h1>
     <p >Level 80 {SPEC_LABELS[char.spec]} </p></div> 
     <p className='flex lg:p-auto m-3 xl:justify-center   items-center'><img src={SPEC_EMOJIS[char.spec]} alt='BDK' className='w-10'/></p>
      <button  onClick={() => {setCharModal(true) }} className='flex bg-[#2B2350] w-auto m-2 p-2  lg:ml-auto justify-center lg:ml-[90%] items-center rounded-sm '> Update</button>
     <button  onClick={()=> {setDeleteCharModal(true) ; setSelectedCharName(char.name) }} className='flex bg-[#2B2350] w-auto m-2 p-2   justify-center  items-center rounded-sm'> Remove</button></div>
)}
     </div>
     </>
}
export default CharactersDiv