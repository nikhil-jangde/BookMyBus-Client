import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StarHalfSharpIcon from '@mui/icons-material/StarHalfSharp';
import collection from '../images/collection.png';
import customers from '../images/customers.png';
import b from '../images/b.png'

const cardData = [
    
    {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
      {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
      {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
      {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
      {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
      {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
      {
        name: 'John Doe',
        since: 'Customer since 2019',
        rating: 4.5,
        feedback: 'Great service!',
      },
    // Add more cards as needed
  ];

function FeedbackCarausal() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: true, // Show navigation arrows
        centerMode: true,
        centerPadding: '0', // Adjust the spacing between cards
        responsive: [
          {
            breakpoint: 900, // Define the screen width at which to change settings (md)
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600, // Define the screen width at which to change settings (sm)
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
      
  return (<>
  <div className='mt-10 mb-8'><h1 className='text-2xl mx-auto font-bold text-center md:w-[30%] sm:w-[100%] text-black '>Travel with world's largest bus</h1></div>
  <div className='flex items-center justify-center mb-10'>
  <div className='grid grid-cols-1 rounded-lg lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
    <div className='mx-6 rounded-lg shadow-md w-72 h-52 shadow-black'><img className='rounded-lg w-72 h-52' src={collection}/></div>
    <div className='mx-6 rounded-lg shadow-md w-72 h-52 shadow-black'><img className='rounded-lg w-72 h-52' src={customers}/></div>
    <div className='mx-6 rounded-lg shadow-md w-72 h-52 shadow-black'><img className='rounded-lg w-72 h-52' src={b}/></div>
  </div></div>
  <div className='my-8'><h1 className='text-2xl mx-auto font-bold text-center md:w-[30%] sm:w-[100%] text-black '>Here's what a few of our customers have to say about us.</h1></div>
  <div className='px-5 py-5 space-x-4 bg-slate-200'>
      <Slider className=' w-[80%] mx-[10%]'{...settings}>
      {cardData.map((card, index) => (
            <div
              key={index}
              className='p-2 space-x-4 bg-transparent border-none'
            ><div className='p-4 bg-white rounded-md shadow-lg shadow-black'>
                <div className='flex'>
            <div className={`w-16 h-16 bg-blue-300 rounded-full text-2xl font-bold text-white flex items-center justify-center`} >
                {card.name[0]}
              </div>
              <div className='mx-auto'>
              <div className="mt-4 text-lg font-bold ">{card.name}</div>
              <div className="text-gray-500">{card.since}</div>
              </div>
              </div>
              <div className="mt-2 bg-green-400 rounded-lg w-14"><span className='text-white'><StarHalfSharpIcon/> {card.rating}</span></div>
              <div className="mt-2">{card.feedback}</div></div>
            </div>
          ))}
      </Slider>
      </div>
    </>
  );
}

export default FeedbackCarausal
