import Composition from './composition'

import CharactersDiv, { type Chars } from './characters'
import MySignups from './mysignups'
import GuilMembers from './guildMembers'
import UpcomingRaids from './upcoming-raids'
import { Routes, Route } from 'react-router-dom'
import Login from './login'
import './App.css'
import Layout from './layout'
import { useEffect, useState } from 'react'
import { Toaster } from "react-hot-toast"
import api from './api/api'


function App() {
  const [guild , setGuild ] = useState([]);
   const [selectedGuild , setSelectedGuild] = useState<string>('')
  const [ hamburger , setHamburger] = useState(false)
  const [chars , setChars] = useState<Chars[]>()
  const [newChars , setNewChars] = useState<Chars[] | []>([])
   console.log(chars)
 async  function findGuild () {
     try {
    const response = await api.get(
      '/characters/guild',
      {
        withCredentials: true,
      },
      
    );
     
    
    
    const mappedGuild = response.data.guildMembers.map((x) => x.guild)
    setGuild(mappedGuild);
    
  } catch (error) {
    console.log('Failed to fetch guilds:', error);
  }
  } 
 useEffect(()=> { findGuild() },[])
 useEffect(() => {
  if (guild.length > 0 && !selectedGuild) {
    setSelectedGuild(guild[0].discordGuildId);
  }
}, [guild, selectedGuild]);
 



  return (
    <>
     <Toaster position="top-right" />
    <div className='bg-slate-950  w-full min-h-screen  '>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Layout hamburger={hamburger} setHamburger={setHamburger} setGuild={setGuild} />}>
    <Route path='/upcoming-raids' element={<UpcomingRaids  hamburger={hamburger}  selectedGuild={selectedGuild} guild={guild} setSelectedGuild={setSelectedGuild}  setHamburger={setHamburger} />} /> 
    <Route path='/chars' element={<CharactersDiv  selectedGuild={selectedGuild} hamburger={hamburger} setHamburger={setHamburger}  newChars={newChars} setNewChars={setNewChars} chars={chars} setChars={setChars}/>}  />
    <Route path='/signups' element={    <MySignups    selectedGuild={selectedGuild} hamburger={hamburger} setHamburger={setHamburger}/>}   />
    <Route path='/gmembers' element={   <GuilMembers selectedGuild={selectedGuild}  hamburger={hamburger} setHamburger={setHamburger} />}  />
    <Route path='/raid-comp/:raidId' element={ <Composition  hamburger={hamburger} setHamburger={setHamburger} selectedGuild={selectedGuild}  />} />
    </Route>
    </Routes>
    </div>
    </>
  )


}


export default App
