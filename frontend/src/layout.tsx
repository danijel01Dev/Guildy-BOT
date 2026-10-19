





import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout( {hamburger , setHamburger , setGuild}) {
  return (
    
      

      <main className=" flex  w-full flex-col lg:flex-row max-w-[1980px] mx-auto justify-center h-full">
        <Navbar  hamburger={hamburger} setHamburger={setHamburger}  setGuild={setGuild}  />
        <Outlet  />
      </main>
   
  );
}