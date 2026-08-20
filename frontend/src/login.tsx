import axios from "axios"



function Login(){


   async  function  login(){
     const getUrl = await axios.get('http://localhost:3060/auth/discord')
console.log(getUrl.data)
console.log(getUrl)
     window.location.href = getUrl.data



    }
    return (<div onClick={login} className="flex w-full h-full justify-center items-center  ">
     <button className=' flex 
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
       border border-[#5B21B6] text-[#FFFFFF] shadow-[0_0_20px_rgba(124,58,237,0.15)] m-auto'>Sign Up To This Raid</button>
       </div>
    )
}









export default Login