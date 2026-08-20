import Hamburger from './assets/hambruger.png'




   





 function CreateRaid(){
  return ( 
    <>
    <div className='flex items-center flex-col justify-center  w-full  m-1  mt-25  h-full'>
      <img src={Hamburger} alt='Hamburger' className='w-5 itmes-start 2xl:hidden mr-auto  mt-1 ml-3 fixed top-6 left-2' />
     <div className="flex  flex-col lg:flex-row  w-full  md:w-full gap-4 h-auto justify-center  items-center">
     <div className='flex  flex-col text-white p-2  m-1 items-start '><h1 className='font-title  text-2xl lg:text-4xl tracking-wider text-[#8B5CF6] uppercase'>CREATE RAID </h1>
      <h3 className=' flex justify-center m-auto  items-center text-center font-sans text-[16px] text-[#A1A1AA]'>Schedule a new raid </h3>
       </div>
       </div>
    <div className='flex items-start flex-1 flex-col  lg:flex-row  gap-4 justify-center  h-screen  w-full  '>
    
       <Content6 />
      
       

    </div>
     </div>
  </>)}
  function Content6(){
    return(
      <div className='grid grid-cols-1 w-full lg:w-auto lg:grid-cols-2 bg-[#10161d] lg:p-20 rounded-xl  shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-[#2B2350] '>
       <div className='flex flex-col gap-3 m-4 text-white '> 
        Title
         <input type='text' placeholder='Enter title...'  className='flex   rounded-sm text-[#A8A39A]  w-full xl:w-100 border border-[#7C3AED] h-15 justify-center items-center   p-1 m-auto' ></input>
          Date & Time
          <input type='text' placeholder='Pick a date'  className='flex   rounded-sm text-[#A8A39A]  w-full xl:w-100 border border-[#7C3AED] h-15 justify-center items-start p-1 m-auto' ></input>
        
            Leader 
            <input type='text' placeholder='Leader name...'  className='flex   rounded-sm text-[#A8A39A]  w-full xl:w-100 border border-[#7C3AED] h-15 justify-center items-center   p-1 m-auto' ></input>
       </div>
       <div className='flex flex-col gap-3 m-4 text-white justify-center '> 
        Note
         <input type='text' placeholder='Note...'  className='flex  rounded-sm text-[#A8A39A]  w-auto xl:w-100 border border-[#7C3AED] h-15 justify-center items-start  text-start  p-1 ' ></input>
       <div className='flex flex-row mt-auto gap-3'>
        <button type='submit'      className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer  lg:mt-auto lg:ml-auto  w-full md:w-40 items-center bg-[#8B5CF6] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center ' >Cancel </button>
        <button type='submit'      className='flex flex-row  
        transition-all
        duration-200
        hover:bg-[#A855F7]
        hover:border-[#8B5CF6]
        hover:-translate-y-0.5
        hover:shadow-md
        cursor-pointer  lg:mt-auto lg:ml-auto  w-full md:w-40 items-center bg-[#8B5CF6] border border-[#7C3AED] text-[#F5F3FF] rounded-sm h-10 items-center justify-center ' > Submit </button>
       </div>
       </div>
      
      </div>
       
    )
  }
  export default CreateRaid