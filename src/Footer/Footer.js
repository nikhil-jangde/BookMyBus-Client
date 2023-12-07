import React from 'react'
import Logo from '../images/logo.png';
import Insta from '../images/Insta.png';
import fb from '../images/fb.png';
import '../App.css'
import { useLocation } from 'react-router-dom';

function Footer() {
  
const location = useLocation();
const isHomePage = location.pathname === '/';

  return (<><div className={`px-4 py-2 ${isHomePage ? 'mt-12' : ''} bg-slate-300`}>
    <div style={{borderBottom:"2px solid black"}}  className='grid w-full h-auto grid-cols-1 mt-12 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
       
       <div className='px-16'>
        <img  className="h-10 rounded-md cursor-pointer" id='blend' src={Logo}/>
        <h1 className='py-4 font-semibold'>When you have a choice. choose BookMyBus. </h1>
        <h1 >BookMyBus offers bus tickets booking</h1>
        <h1 >thorough its website, IOS and Android  </h1>
        <h1 >mobile apps for all major cities. </h1>
        <h1 className='py-4 font-semibold'>nikhiljangde123@gmail.com </h1>
       </div>
       
       <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
        <div >
          <h1 className='py-1 font-bold'>About</h1>
          <h1 className='py-1 cursor-pointer hover:text-red-500'>About Us</h1>
          <h1 className='py-1 cursor-pointer hover:text-red-500'>Contact Us</h1>        
        </div>
        <div>
        <h1 className='py-1 font-bold'>Useful Link</h1>
          <h1 className='py-1 cursor-pointer hover:text-red-500'>Careers</h1>
          <h1 className='py-1 cursor-pointer hover:text-red-500'>FAQ</h1>  
          <h1 className='py-1 cursor-pointer hover:text-red-500'>T & C</h1>  
          <h1 className='py-1 cursor-pointer hover:text-red-500'>Privacy Policy</h1>  
          <h1 className='py-1 cursor-pointer hover:text-red-500'>Blog</h1>
        </div>
        <div>
        <h1 className='py-1 font-bold'>Follow Us</h1>
       <div className='flex py-2'>
       <img className='h-8 m-1 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-black'  src={Insta}/>
      <img className='h-8 m-1 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-black' src={fb}/>
       </div>
        </div>
        </div>
    </div>
    <div style={{borderBottom:"2px solid black"}} ><h1 className='text-lg py-2 mx-auto font-semibold text-center md:w-[30%] sm:w-[100%] text-black '>All right reserved - @2023.</h1></div>
    </div>
    <button
      className="fixed p-4 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 bottom-4 right-4 z-70"
      onClick={() => {
        // Add your button click action here
      }}
    >
      Feedback
    </button>
    </>
  )
}

export default Footer
