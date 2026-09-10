import Composition from './composition'
import CreateRaid from './create-raid'
import CharactersDiv from './characters'
import MySignups from './mysignups'
import GuilMembers from './guildMembers'
import UpcomingRaids from './upcoming-raids'
import { Routes, Route } from 'react-router-dom'
import Login from './login'
import './App.css'
import Layout from './layout'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [guild , setGuild ] = useState([]);
   const [selectedGuild , setSelectedGuild] = useState<string>('')
  
 async  function findGuild () {
     try {
    const response = await axios.get(
      'http://localhost:3060/characters/guild',
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
    <div className='bg-slate-950  w-full min-h-screen  '>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Layout />}>
    <Route path='/upcoming-raids' element={<UpcomingRaids   selectedGuild={selectedGuild} guild={guild} setSelectedGuild={setSelectedGuild} />} /> 
    <Route path='/chars' element={<CharactersDiv  selectedGuild={selectedGuild}/>} />
    <Route path='/signups' element={    <MySignups    selectedGuild={selectedGuild}/>} />
    <Route path='/gmembers' element={   <GuilMembers selectedGuild={selectedGuild}/>} />
    <Route path='/create-raid' element={ <CreateRaid  />} />
    <Route path='/raid-comp/:raidId' element={ <Composition  />} />
    </Route>
    </Routes>
    </div>
    </>
  )


}


export default App
