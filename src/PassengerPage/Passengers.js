import React, { useEffect, useState } from 'react';
import StarHalfSharpIcon from '@mui/icons-material/StarHalfSharp';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'
const stripePromise = loadStripe('pk_live_51NsGjESExaF6IMNyq1vP0WNXWhrz2Y1YD7ze1eaunzKYjeFPdqINYUx99gdx9l40JwfVWaRDZnAMZEDnIgzly4qT000rD5LJ2D');

function Passengers(props) {
  const navigate = useNavigate();
  const [data, setdata] = useState(props.initialdata ? props.initialdata : null); console.log('datafrmBuses',data);
  const [finaldetails, setFinaldetails] = useState();
  console.log('thisisfinal', finaldetails);
  const [dropdownOpenClose, setDropdownOpenClose] = useState([]); console.log(dropdownOpenClose);


  //Fare of a Selected seats from /Buses component excluding taxes
  const busFare = data
    ? data.selectedPrice.reduce((total, price) => total + price)
    : 0;
  // Assuming tax is 5% of the bus fare
  const tax = (busFare * 0.05); 
  // Total fare of a bus including taxes
  const totalFare = busFare + tax;

// creates an input fields as per length if seats and stores it to finaldetails via useEffect func below

  const passengerData = data ? data.selectedSeats.map((seat) => ({
    name: '',
    age: '',
    gender: '',
    seatNo: seat,
  })) : '';

  // it checks that if selected bus and data comes from Buses component it will store to finaldetails var and if no data then redirect to ('/Buses')
  useEffect(() => {
    if (!data) {
      navigate('/Buses');
    }
    else if (data) {
        const addFinalData = {
        
        busName: data.BusName,
        StartDate:data.StartDate,
        EndDate:data.EndDate,
        duration:data.duration,
        from:data.from,
        to:data.to,
        rating:data.rating,
        seatBooked: data.selectedSeats,
        busOwnerID: data.id,
        startTime: data.startTime,
        endTime: data.endTime,
        busFare: totalFare,
        passengers: passengerData,
        userID:props.userdetail && props.userdetail._id,
        username:props.userdetail && props.userdetail.username,
        email:props.userdetail && props.userdetail.email,
        mobile:props.userdetail && props.userdetail.mobile,
        boarding:data.boarding,
        dropping:data.dropping
      }
      setFinaldetails(addFinalData)
      console.log(addFinalData);
    }
    const dropdownData = data ? data.selectedSeats.map((seats) => ({
      seat: seats,
      Boolean: false
    })) : '';
    setDropdownOpenClose(dropdownData)
  }, []);

  const handleTrue = (SeatNo) => {
    setDropdownOpenClose((prevDropdown) => {
      const updatedBoolean = prevDropdown.map((boolean) => {
        if (boolean.seat === SeatNo) {
          return {
            ...boolean,
            Boolean: true,
          };
        }
        return boolean;
      });
      console.log(updatedBoolean);
      return updatedBoolean;
    });
  };

  const handleFalse = (SeatNo) => {
    setDropdownOpenClose((prevDropdown) => {
      const updatedBoolean = prevDropdown.map((boolean) => {
        if (boolean.seat === SeatNo) {
          return {
            ...boolean,
            Boolean: false,
          };
        }
        return boolean;
      });
      return updatedBoolean;
    });
  };


  const handleFieldChange = (newValue, updatedSeat, field) => {
    const updatedFinalDetails = finaldetails.passengers.map((passenger) => {
      if (passenger.seatNo === updatedSeat) {
        return { ...passenger, [field]: newValue };
      }
      return passenger;
    });

    setFinaldetails((prevFinalDetails) => ({
      ...prevFinalDetails,
      passengers: updatedFinalDetails,
    }));
  };


  
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/PaymentApi/create-checkout-session', {
        amount: totalFare,
        currency: 'inr',
        data: finaldetails, 
      });
  
      const session = response.data;
  
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
  
      if (result.error) {
        console.error('Error redirecting to Checkout:', result.error);
      }
    } catch (error) {
      console.error('Error making the Axios request:', error);
    }
  };

  

  return (<> <Navbar/>
    <div className='h-screen px-8 mt-20 lg:flex md:flex bg-slate-300 ' style={{ width: '100%' }}>
      <div className=' lg:w-[70%] md:w-[70%] max-h-screen overflow-y-auto scrollbar-hide h-screen p-3'>
        <div style={{ backgroundColor: "#fff" }} className='w-full h-auto px-5 py-2 mt-5 bg-white rounded-md' >
          <div className='lg:flex md:flex'>
            <div className='lg:w-[80%] md:w-[80%]'>
              <h1 className='mb-2 text-xl font-bold text-left'> {data ? data.BusName : ''} <span className='px-1 py-0.5 text-white bg-green-400 rounded-xl'><StarHalfSharpIcon /> {data ? data.rating : ''} </span><span className='px-2 text-sm font-bold text-red-500'>Ratings</span></h1>
              <h1 className='mb-4 text-sm text-left text-gray-600'>A/C Sleeper (2+1)  | 36 Total Seats  | 21 window S Left </h1>
              <h1 className='text-2xl text-left text-black '>{data ? data.startTime : ''},  {data ? data.StartDate : ''} <span className='text-sm text-gray-700'> Arrival ----- {data ? data.duration : ''} ----- Diparture </span> {data ? data.endTime : ''} ,  {data ? data.EndDate : ''}</h1>
              <div className='my-2 lg:flex md:flex'><h1 className='font-bold text-green-500'>{data ? data.boarding : ''} , {data ? data.from : ''}.</h1><h1 className='text-black mx-14'>To</h1><h1 className='font-bold text-red-500'>{data ? data.dropping : ''} , {data ? data.to : ''}.</h1></div>
            </div>
          </div>
        </div>
        <div><h1 className='mt-4 text-2xl font-bold text-black'>Enter Traveller Details</h1></div>
        <div className='w-full h-auto mt-2 bg-white rounded-md'>
          <div >
            {data ? (data.selectedSeats.map((seat, seatIndex) => {
              const checkboolean = dropdownOpenClose.find((boolean) => boolean.seat === seat)?.Boolean
              //const passengerForSeat = finaldetails.passengers[seatIndex];
              const passengerForSeat = (finaldetails && finaldetails.passengers) ? finaldetails.passengers[seatIndex] : null;

              console.log(checkboolean);
              return (<div>
                <div className='px-10 mt-2' key={seatIndex}>
                  <div>
                    <h1 className='font-bold text-gray-500 '>Passenger {seatIndex + 1}</h1>
                    <h1 className='font-bold'>Seat - [ {seat} ]</h1>
                  </div>
                </div>
                <div className='grid grid-cols-1 p-2 mx-auto passenger-names lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
                  <div className='px-4' >
                    <input className='w-full h-8 p-2 m-1 border border-gray-400 rounded-md' placeholder="Name"
                      value={passengerForSeat && passengerForSeat.name}
                      onChange={(e) => handleFieldChange(e.target.value, seat, 'name')}
                      data-field="name"
                    ></input>
                  </div>
                  <div className='grid grid-cols-2 px-4'>
                    <input className='h-8 p-2 m-1 border border-gray-400 rounded-md'  placeholder="Age" type='number'
                       value={passengerForSeat && passengerForSeat.age }
                      onChange={(e) => handleFieldChange(e.target.value, seat, 'age')}
                      data-field="age"
                    ></input>
                    <div className='relative'>
                      <input className='w-full h-8 p-2 m-1 border border-gray-400 rounded-md cursor-pointer' readOnly  placeholder="Gender"
                        value={passengerForSeat && passengerForSeat.gender }
                        onClick={() => handleTrue(seat)} />

                      {checkboolean === true && <ul className='absolute w-full h-auto border border-gray-500 rounded-md bg-slate-100'>
                        <li className='px-3 rounded-md cursor-pointer py1 hover:bg-orange-400 hover:text-white' onClick={() => { handleFieldChange('Male', seat, 'gender'); handleFalse(seat) }}>Male</li>
                        <li className='px-3 rounded-md cursor-pointer py1 hover:bg-orange-400 hover:text-white' onClick={() => {handleFieldChange('Female', seat, 'gender'); handleFalse(seat) }}>Female</li>
                        <li className='px-3 rounded-md cursor-pointer py1 hover:bg-orange-400 hover:text-white' onClick={() => {handleFieldChange('Others', seat, 'gender'); handleFalse(seat) }}>Others</li>
                      </ul>}
                    </div>
                  </div>
                </div></div>)
            })) : ''}
          </div>
        </div>
      </div>
      <div className='lg:w-[30%] md:w-[30%] h-auto p-3 mt-5 '>
        <div className='w-full h-auto p-3 bg-white border border-gray-400 rounded-md'>
          <h1 className='text-xl font-bold text-black '>Fare Details :</h1>
          <div className='w-full h-auto p-3 border-b border-gray-500'>
            <div className='flex'>
              <h1 className='flex-grow font-bold text-gray-500 '>Bus Fare</h1>
              <h1 className='flex-grow text-lg font-bold text-right'>&#8377; {busFare}</h1>
            </div>
            <div className='flex'>
              <h1 className='flex-grow font-bold text-gray-500 '>GST - 5%</h1>
              <h1 className='flex-grow text-lg font-bold text-right'>+ &#8377; {tax}</h1>
            </div>
          </div>
          <div className='flex px-3 py-2'>
            <h1 className='flex-grow font-bold text-gray-500 '>Total Price</h1>
            <h1 className='flex-grow text-2xl font-bold text-right text-red-600'> &#8377; {totalFare}</h1>
          </div>
          <div className='flex justify-center w-full'>
            <button className='bg-orange-400 text-white w-[70%] font-bold px-2 py-1 rounded-lg'
           //   onClick={() => { alert('Please Log In For Proceed !') }}
              onClick={handlePayment}
              >Proceed To Payment</button>
          </div>
        </div>
      </div>
    </div></>
  )
}

const mapStateToProps = (state) => {
  return {
    initialdata: state.initialdataReducer,
    finaldata: state.finaldataReducer,
    traveldata: state.traveldataReducer,
    userdetail: state.saveuserReducer
  };
};



export default connect(mapStateToProps)(Passengers);