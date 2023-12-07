import React, { useState } from 'react'
import StarHalfSharpIcon from '@mui/icons-material/StarHalfSharp';
import MovingIcon from '@mui/icons-material/Moving';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

function Trips() {
  
  const [tripdata , setTripdata] = useState([]);
  console.log('tripdata',tripdata);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/')
    }
        axios.get(`http://localhost:5000/Api/Verify-token/${token}`)
        .then(result => {
          if (result.status === 200) {
            const userData = result.data;
            setTripdata(userData)            
          }
        })
        .catch(error => {
          // Token is invalid, remove it from localStorage
          console.log('verificationfailed--->',error);
         // localStorage.removeItem('token');
        });
      }
  , []);

  const isTripCompleted = (endDate, endTime) => {
    const tripEndDate = new Date(`${endDate} ${endTime}`);
    const currentDate = new Date();
    return currentDate > tripEndDate;
  };
  
  return (<div className='w-full mt-20 bg-emerald-500'>
  <h1 className='w-full p-2 text-3xl font-semibold text-center'>Your Trips <MovingIcon/></h1>
  {tripdata.trips && tripdata.trips.length > 0 ? <div className='grid grid-cols-1 mx-auto gap-4 p-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-[80%]'>
  {(tripdata.trips && tripdata.trips.map((item, index) => (
      <div key={index} className='w-full rounded-md shadow-md shadow-black bg-slate-100'>
        <div className='p-4'>
          <h1 className='w-full mb-2 font-semibold text-center text-black bg-orange-300 rounded-md text-md'>Status :  
          <span className={` text-md ${isTripCompleted(item.EndDate, item.endTime)?'text-red-500':'text-green-600'}`}>
           {isTripCompleted(item.EndDate, item.endTime) ? 'Completed✅' : 'Upcoming↗️'}</span></h1>
          <h1 className='mb-2 text-xl font-bold text-left'>{item.busName}<span className='px-1 mx-1 py-0.5 text-white bg-green-400 rounded-xl'><StarHalfSharpIcon />{ item.rating}</span><span className='px-2 text-sm font-bold text-red-500'>Ratings</span></h1>
          <h1 className='mb-4 text-sm text-left text-gray-600'>A/C Sleeper (2+1)</h1>
          <h1 className='text-2xl text-left text-black '>{ item.startTime}, { item.StartDate} <span className='text-sm text-gray-700'>{ item.duration}</span> { item.endTime}, {item.EndDate}</h1>
          <div className='flex my-2'><h1 className='font-bold text-green-500'>{ item.from}.</h1><h1 className='mx-2 text-black'>To</h1><h1 className='font-bold text-red-500'>{ item.to}.</h1></div>
          <h1 className='w-full text-xs text-right text-gray-600'>Booked on</h1>
          <h1 className='w-full text-right text-black'>{ item.bookingdate}</h1>
        </div>
      </div>
    )))}
  </div>:<div className='flex items-center justify-center w-full h-screen bg-emerald-500'><h1 className='w-full text-xl font-semibold text-center text-black -mt-44 '><span className='text-xl text-red-500'>Oops ❌ </span>No Trips Data !</h1></div>}
</div>

  )
}

const mapStateToProps = (state) => {
  return {
    userdetail: state.saveuserReducer
  };
};



export default connect(mapStateToProps)(Trips);

