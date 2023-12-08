import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../App.css'
import { settraveldata, updatetraveldata } from '../Redux/actions/settraveldata';
import { sendinitialdata } from '../Redux/actions/sendinitialdata';
import axios from 'axios';
import StarHalfSharpIcon from '@mui/icons-material/StarHalfSharp';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';
import Seat from './icons/Bed2.png'
import Steering from './icons/steering.png'
import { Tooltip} from '@mui/material';
import Modifier from './Modifier';
import Filter from './Filter';
import Data from './Boarding';
import fieldCd from '../Redux/constant/typeCodes';
import { useNavigate } from 'react-router-dom';
import { setauth } from '../Redux/actions/setauth';

function Buses(props,{ isDivVisible, setauth}) {
  // Initialize the checkbox states
  const navigate = useNavigate()
  const Startlocation = props.traveldata && props.traveldata[fieldCd.Location1];
  const Endlocation = props.traveldata && props.traveldata[fieldCd.Location2];

  // Assuming your date is in the format "2023-12-15"
const dateString = props.traveldata && props.traveldata[fieldCd.Date] ;
const originalDate = new Date(dateString);

// Increment the date by 1 day
const incrementedDate = new Date(originalDate);
incrementedDate.setDate(originalDate.getDate() + 1);

// Convert the incremented date back to a string
const incrementedDateString = incrementedDate.toISOString().split('T')[0];

console.log('incrementedDateString',incrementedDateString); // Output: "2023-12-16"

  
  const [buses, setBuses] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); console.log(selectedSeats);
  const [showSeatArrangement, setShowSeatArrangement] = useState({});
  //proceeder is basically to go from pick and drop points to preview of selected data
  const [proceed, setProceed] = useState([]); //console.log(proceed);

  const handleShowSeatArrangement = (busIndex) => {
    setShowSeatArrangement((prevState) => ({
      ...prevState,
      [busIndex]: !prevState[busIndex], // Toggle the show/hide state for the specific bus
    }));
  };


  useEffect(() => {
    axios.get('https://book-my-bus-server.vercel.app/Api/get-buses')
      .then(result => {
        if (result.status === 200) {
          setBuses(result.data);
          const initialSelectedSeats = result.data.map((bus) => ({
            id: bus._id,
            startTime: bus.startTime,
            rating: bus.rating,
            endTime: bus.endTime,
            duration: bus.duration,
            BusName: bus.name,
            selectedSeats: [],
            selectedPrice: [],
            boarding: "",
            dropping: "",
            from:props.traveldata && props.traveldata[fieldCd.Location1],
            to:props.traveldata && props.traveldata[fieldCd.Location2],
            category:bus.category,
            StartDate:props.traveldata && props.traveldata[fieldCd.Date],
            EndDate:incrementedDateString
          }));
          setSelectedSeats(initialSelectedSeats);
          const Dataproceeder = result.data.map((bus) => ({
            id: bus._id,
            Boolean: false
          }))
          setProceed(Dataproceeder)
        } else {
          console.error("API request failed with status:", result.status);
        }
      })
      .catch(err => console.error("API request failed:", err));
  }, []);

  const handleSeatSelection = (busId, seatNumber, seatPrice) => {
    setSelectedSeats((prevSelectedSeats) => {
      // Find the bus object with the matching busId
      const updatedSelectedSeats = prevSelectedSeats.map((bus) => {
        if (bus.id === busId) {
          // Check if the seat is already selected
          const isSeatSelected = bus.selectedSeats.includes(seatNumber);

          if (!isSeatSelected && bus.selectedSeats.length < 5) {
            // If the seat is not selected and less than 5 seats are selected, add it
            return {
              ...bus,
              selectedSeats: [...bus.selectedSeats, seatNumber],
              selectedPrice: [...bus.selectedPrice, seatPrice], // Add seat price
            };
          } else if (isSeatSelected) {
            // If the seat is already selected, remove it
            const seatIndex = bus.selectedSeats.indexOf(seatNumber);
            return {
              ...bus,
              selectedSeats: bus.selectedSeats.filter((seat) => seat !== seatNumber),
              selectedPrice: [
                ...bus.selectedPrice.slice(0, seatIndex),
                ...bus.selectedPrice.slice(seatIndex + 1),
              ], // Remove seat price
            };
          } else {
            // Display an alert when the count exceeds 5
            alert("You can only select up to 5 seats.");
          }
        }
        return bus;
      });

      return updatedSelectedSeats;
    });
  };

  const handleBoardingPointSelection = (busId, point) => {
    setSelectedSeats((prevSelectedSeats) => {
      const updatedSelectedSeats = prevSelectedSeats.map((bus) => {
        if (bus.id === busId) {
          return {
            ...bus,
            boarding: point,
          };
        }
        return {
          ...bus,
          boarding: bus.boarding === point ? "" : bus.boarding,
        };
      });
      return updatedSelectedSeats;
    });
  };


  const handleDroppingPointSelection = (busId, point) => {
    setSelectedSeats((prevSelectedSeats) => {
      const updatedSelectedSeats = prevSelectedSeats.map((bus) => {
        if (bus.id === busId) {
          return {
            ...bus,
            dropping: point,
          };
        }
        return {
          ...bus,
          dropping: bus.dropping === point ? "" : bus.dropping,
        };
      });
      return updatedSelectedSeats;
    });
  };

  const handleContinueProceeder = (busId) => {
    setProceed((prevProceed) => {
      const updatedProceed = prevProceed.map((bus) => {
        if (bus.id === busId) {
          return {
            ...bus,
            Boolean: true,
          };
        }
        return bus;
      });
      return updatedProceed;
    });
  };

  const handleChangeProceeder = (busId) => {
    setProceed((prevProceed) => {
      const updatedProceed = prevProceed.map((bus) => {
        if (bus.id === busId) {
          return {
            ...bus,
            Boolean: false,
          };
        }
        return bus;
      });
      return updatedProceed;
    });
  };

  const [activeDiv, setActiveDiv] = useState('BOARDING');
  const toggleDiv = (divName) => {
    setActiveDiv(divName);
  };

  const [proceeder, setProceeder] = useState(false)

  return (
    <>
      <div className='flex flex-wrap w-full h-screen my-20 parent'>
        <Modifier />
        <div className='w-[20%] hidden sm:block max-h-screen overflow-y-auto scrollbar-hide border justify-start pt-5 pl-10 py-5 pb-5 text-left border-gray'>
          <Filter />
        </div>

        {/*--------------------------------------------Bus Card------------------------------------------------------------ */}

        <div style={{ backgroundColor: "#f6f6f6" }} className='md:w-[80%] sm:w-full max-h-screen overflow-y-auto scrollbar-hide h-screen  md:px-[4%] md:py-4 backdrop-blur-lg'>

          {buses.map((bus, index) => {
            const checkboolean = proceed.find((selectedBus) => selectedBus.id === bus._id)?.Boolean
            return (bus !== null ? <div style={{ backgroundColor: "#fff" }} className='w-full h-auto px-5 py-2 mt-5 bg-white rounded-md shadow-lg shadow-gray-400' >
              <div key={index} className='lg:flex md:flex'>
                <div className='lg:w-[80%] md:w-[80%]'>
                  <h1 className='mb-2 text-xl font-bold text-left'>{bus.name} <span className='px-1 py-0.5 text-white bg-green-400 rounded-xl'><StarHalfSharpIcon /> {bus.rating}</span><span className='px-2 text-sm font-bold text-red-500'>Ratings</span></h1>
                  <h1 className='mb-4 text-sm text-left text-gray-600'>{bus.category} | {bus.totalSeats} Total Seats  |  {bus.totalWindowSeatsAvailable} window S Left </h1>
                  <h1 className='text-2xl text-left text-black '>{bus.startTime}, {dateString} <span className='text-sm text-gray-700'> Arrival ----- {bus.duration} ----- Diparture </span> {bus.endTime},  {incrementedDateString}</h1>
                  <div className='mt-5 text-gray-500'>Animeties
                    <span className="text-red-500"> | </span>Photos
                    <span className="text-red-500"> | </span>Live Tracking
                    <span className="text-red-500"> | </span>Policies
                    <span className="text-red-500"> | </span>Reviews
                  </div>
                </div>
                <div className='lg:w-[20%] md:w-[20%] border-l border-dotted py-4 px-3 border-gray-500 flex flex-col justify-center items-center'>
                  <h1 className='font-bold text-center'>Trip Cost</h1>
                  <p className='text-sm text-center text-gray-600'>Starting from</p>
                  <h1 className='text-3xl font-bold text-center '><CurrencyRupeeSharpIcon />1199</h1>
                  <button style={{ backgroundColor: "#dc635b" }}
                    className='px-4 py-1 mt-2 text-white rounded-lg'
                    onClick={() => handleShowSeatArrangement(index)}
                  >
                    {showSeatArrangement[index] ? 'Hide Seat' : 'View Seat'}
                  </button>
                </div>
              </div>


              {/*----------------------------------------Lower Seat Arrangement---------------------------------------------------- */}


              {showSeatArrangement[index] && <><hr />
                <div style={{ backgroundColor: "#f6f6f6" }} className='h-auto p-6 mt-4 mb-4 rounded-sm'>
                  <div className='grid w-full h-auto grid-cols-1 px-5 mb-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                    <h1 className='text-2xl font-bold'>Select Seats</h1>
                    <div className='flex justify-end '>
                      <div className='ml-6 w-[15%] px-auto '>
                        <img className='h-6 bg-gray-500 rounded-sm' src={Seat} />
                        <p1 className='text-sm' >BOOKED</p1>
                      </div>
                      <div className='ml-6 w-[15%]  justify-around'>
                        <img className='h-6 border-l-4 border-red-400' src={Seat} />
                        <p1 className='text-sm' >FEMALE</p1>
                      </div>
                      <div className='ml-6 w-[15%] justify-around'>
                        <img className='h-6 border-l-4 border-blue-400 ' src={Seat} />
                        <p1 className='text-sm' >MALE</p1>
                      </div>
                      <div className='ml-6 w-[15%] justify-around text-sm'>
                        <img className='h-6 rounded-sm selected-seat' src={Seat} />
                        <p className='custom-sm-text'>SELECTED</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap'>
                    <h1 className='flex-shrink-0 font-bold text-gray-500'>Seat Price</h1>
                    <button className='px-3 py-1 my-2 ml-2 text-white bg-red-700 shadow-md shadow-black'>All</button>
                    <button className='px-3 py-1 my-2 ml-2 text-white bg-red-700 shadow-md shadow-black'>1199</button>
                    <button className='px-3 py-1 my-2 ml-2 text-white bg-red-700 shadow-md shadow-black'>1299</button>
                    <button className='px-3 py-1 my-2 ml-2 text-white bg-red-700 shadow-md shadow-black'>1499</button>
                  </div>
                  <div className='grid w-full grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2 '>
                    <div className='w-full mt-2 text-center md:pr-6 lg:pr-6'>
                      <div style={{ borderLeft: "1vh solid gray" }} className='flex py-2 bg-white shadow-md h-fit shadow-gray-500'>
                        <div className='w-[10%]'><img className='w-[80%] ml-[10%]' src={Steering} /></div>
                        <div className='w-[90%] border-l border-green-500'>

                          <div key={index} className='flex Lower-window-row'>
                            {Array.from({ length: Math.floor(bus.totalSeats / 6) }, (_, index) => {
                              const seatNumber3 = `L - ${String.fromCharCode(65 + index)}${3}`;
                              const matchedSeatIndex = bus.SeatBooked.findIndex(bookedSeat => bookedSeat.seatno === seatNumber3);

                              // Define the class based on whether the seat is booked or not
                              const isSeatBooked = matchedSeatIndex !== -1;
                              const seatClassName = isSeatBooked ? 'cursor-not-allowed bg-gray-500' : '';
                              const isSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.includes(seatNumber3);
                              let seatPrice = 1499; // Default price
                              if (index < 2) {
                                seatPrice = 1299; // First 2 seats
                              } else if (index >= Math.floor(bus.totalSeats / 6) - 2) {
                                seatPrice = 1199; // Last 2 seats
                              }
                              return (
                                <div
                                  key={seatNumber3}
                                  className='Seat relative h-5 my-2 w-[11%] ml-[5%]'
                                  onClick={() => {
                                    if (!isSeatBooked) {
                                      handleSeatSelection(bus._id, seatNumber3, seatPrice);
                                    }
                                  }}
                                >
                                  <Tooltip title={isSeatBooked ? 'booked' : `${seatNumber3} | ₹ ${seatPrice}`} placement="top-end" arrow>
                                    <img className={`cursor-pointer rounded-sm hover:bg-blue-200 ${seatClassName} ${isSelected ? 'selected-seat' : ''} `} src={Seat} alt={`Seat ${seatNumber3}`} />
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>

                          <div className='flex Lower-middle-row'>
                            {Array.from({ length: Math.floor(bus.totalSeats / 6) }, (_, index) => {
                              const seatNumber2 = `L - ${String.fromCharCode(65 + index)}${2}`;
                              const matchedSeatIndex = bus.SeatBooked.findIndex(bookedSeat => bookedSeat.seatno === seatNumber2);

                              // Define the class based on whether the seat is booked or not
                              const isSeatBooked = matchedSeatIndex !== -1;
                              const seatClassName = isSeatBooked ? 'cursor-not-allowed bg-gray-500' : '';
                              const isSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.includes(seatNumber2);
                              let seatPrice = 1499; // Default price
                              if (index < 2) {
                                seatPrice = 1299; // First 2 seats
                              } else if (index >= Math.floor(bus.totalSeats / 6) - 2) {
                                seatPrice = 1199; // Last 2 seats
                              }

                              return (
                                <div
                                  key={seatNumber2}
                                  className='relative h-5 my-2 w-[11%] ml-[5%]'
                                  onClick={() => {
                                    if (!isSeatBooked) {
                                      handleSeatSelection(bus._id, seatNumber2, seatPrice);
                                    }
                                  }}
                                >
                                  <Tooltip title={isSeatBooked ? 'booked' : `${seatNumber2} | ₹ ${seatPrice}`} placement="top-end" arrow>
                                    <img className={`cursor-pointer rounded-sm hover:bg-blue-200 ${seatClassName} ${isSelected ? 'selected-seat' : ''} `} src={Seat} alt={`Seat ${seatNumber2}`} />
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>

                          <div className='w-full my-2 font-bold text-center bg-green-400'>LOWER DECK</div>
                          <div key={index} className='flex my-2 Lower-window-row'>
                            {Array.from({ length: Math.floor(bus.totalSeats / 6) }, (_, seatIndex) => {
                              const seatNumber1 = `L - ${String.fromCharCode(65 + seatIndex)}${1}`;
                              const matchedSeatIndex = bus.SeatBooked.findIndex(bookedSeat => bookedSeat.seatno === seatNumber1);

                              // Define the class based on whether the seat is booked or not
                              const isSeatBooked = matchedSeatIndex !== -1;
                              const seatClassName = isSeatBooked ? 'cursor-not-allowed bg-gray-500' : '';
                              const isSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.includes(seatNumber1);

                              // Define seat prices based on seat index
                              let seatPrice = 1499; // Default price
                              if (seatIndex < 2) {
                                seatPrice = 1299; // First 2 seats
                              } else if (seatIndex >= Math.floor(bus.totalSeats / 6) - 2) {
                                seatPrice = 1199; // Last 2 seats
                              }

                              return (
                                <div
                                  key={seatNumber1}
                                  className={`Seat relative h-5 my-2 w-[11%] ml-[5%]`}
                                  onClick={() => {
                                    if (!isSeatBooked) {
                                      handleSeatSelection(bus._id, seatNumber1, seatPrice);
                                    }
                                  }}
                                >
                                  <Tooltip title={isSeatBooked ? 'booked' : `${seatNumber1} | ₹ ${seatPrice}`} placement="top-end" arrow>
                                    <img className={`cursor-pointer rounded-sm hover:bg-blue-200 ${seatClassName} ${isSelected ? 'selected-seat' : ''}`} src={Seat} alt={`Seat ${seatNumber1}`} />
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      </div>

                      {/*--------------------------------------Upper Seat Arrangement-----------------------------------------------------*/}

                      <div style={{ borderLeft: "1vh solid gray" }} className='flex py-2 mt-6 bg-white shadow-md h-fit shadow-gray-500'>
                        <div className='w-[10%]'><img className='w-[80%] ml-[10%]' src={Steering} /></div>
                        <div className='w-[90%] h-auto border-l border-green-500'>

                          <div className='flex Upper-window-row'>
                            {Array.from({ length: Math.floor(bus.totalSeats / 6) }, (_, index) => {
                              const seatNumber6 = `U - ${String.fromCharCode(65 + index)}${6}`;
                              const matchedSeatIndex = bus.SeatBooked.findIndex(bookedSeat => bookedSeat.seatno === seatNumber6);

                              // Define the class based on whether the seat is booked or not
                              const isSeatBooked = matchedSeatIndex !== -1;
                              const seatClassName = isSeatBooked ? 'cursor-not-allowed bg-gray-500' : '';
                              const isSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.includes(seatNumber6);
                              let seatPrice = 1499; // Default price
                              if (index < 2) {
                                seatPrice = 1299; // First 2 seats
                              } else if (index >= Math.floor(bus.totalSeats / 6) - 2) {
                                seatPrice = 1199; // Last 2 seats
                              }
                              return (
                                <div
                                  key={seatNumber6}
                                  className='Seat relative h-5 my-2 w-[11%] ml-[5%]'
                                  onClick={() => {
                                    if (!isSeatBooked) {
                                      handleSeatSelection(bus._id, seatNumber6, seatPrice);
                                    }
                                  }}
                                >
                                  <Tooltip title={isSeatBooked ? 'booked' : `${seatNumber6} | ₹ ${seatPrice}`} placement="top-end" arrow >
                                    <img className={`cursor-pointer rounded-sm hover:bg-blue-200 ${seatClassName} ${isSelected ? 'selected-seat' : ''}`} src={Seat} alt={`Seat ${seatNumber6}`} />
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>

                          <div className='flex Upper-middle-row'>
                            {Array.from({ length: Math.floor(bus.totalSeats / 6) }, (_, index) => {
                              const seatNumber5 = `U - ${String.fromCharCode(65 + index)}${5}`;
                              const matchedSeatIndex = bus.SeatBooked.findIndex(bookedSeat => bookedSeat.seatno === seatNumber5);

                              // Define the class based on whether the seat is booked or not
                              const isSeatBooked = matchedSeatIndex !== -1;
                              const seatClassName = isSeatBooked ? 'cursor-not-allowed bg-gray-500' : '';
                              const isSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.includes(seatNumber5);
                              let seatPrice = 1499; // Default price
                              if (index < 2) {
                                seatPrice = 1299; // First 2 seats
                              } else if (index >= Math.floor(bus.totalSeats / 6) - 2) {
                                seatPrice = 1199; // Last 2 seats
                              }
                              return (
                                <div
                                  key={seatNumber5}
                                  className='relative my-2 h-5 w-[11%] ml-[5%]'
                                  onClick={() => {
                                    if (!isSeatBooked) {
                                      handleSeatSelection(bus._id, seatNumber5, seatPrice);
                                    }
                                  }}
                                >
                                  <Tooltip title={isSeatBooked ? 'booked' : `${seatNumber5} | ₹ ${seatPrice}`} placement="top-end" arrow>
                                    <img className={`cursor-pointer rounded-sm hover:bg-blue-200 ${seatClassName} ${isSelected ? 'selected-seat' : ''}`} src={Seat} alt={`Seat ${seatNumber5}`} />
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>

                          <div className='w-full my-2 font-bold text-center bg-red-400'>UPPER DECK</div>

                          <div className='flex my-2 single-middle-row'>
                            {Array.from({ length: Math.floor(bus.totalSeats / 6) }, (_, index) => {
                              const seatNumber4 = `U - ${String.fromCharCode(65 + index)}${4}`;
                              const matchedSeatIndex = bus.SeatBooked.findIndex(bookedSeat => bookedSeat.seatno === seatNumber4);

                              // Define the class based on whether the seat is booked or not
                              const isSeatBooked = matchedSeatIndex !== -1;
                              const seatClassName = isSeatBooked ? 'cursor-not-allowed bg-gray-500' : '';
                              const isSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.includes(seatNumber4);
                              let seatPrice = 1499; // Default price
                              if (index < 2) {
                                seatPrice = 1299; // First 2 seats
                              } else if (index >= Math.floor(bus.totalSeats / 6) - 2) {
                                seatPrice = 1199; // Last 2 seats
                              }
                              return (
                                <div
                                  key={index}
                                  className='relative my-2 h-5 w-[11%] ml-[5%]'
                                  onClick={() => {
                                    if (!isSeatBooked) {
                                      handleSeatSelection(bus._id, seatNumber4, seatPrice);
                                    }
                                  }}
                                >
                                  <Tooltip title={isSeatBooked ? 'booked' : `${seatNumber4} | ₹ ${seatPrice}`} placement="top-end" arrow>
                                    <img className={`cursor-pointer rounded-sm hover:bg-blue-200 ${seatClassName} ${isSelected ? 'selected-seat' : ''}`} src={Seat} alt={`Seat ${seatNumber4}`} />
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='items-center justify-center mt-2 rounded-md '>
                      {checkboolean === false ? <div className='bg-white lg:w-[80%] md:w-[80%] sm:w-full mx-auto flex flex-col justify-between shadow-md shadow-gray-400'>
                        <div className='flex h-10 grid-cols-2 px-2 border-b border-gray-600 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2'>
                          <div
                            className={`w-full text-center p-1 border-b-4 cursor-pointer ${activeDiv === 'BOARDING' ? 'border-red-600' : ''
                              }`}
                            onClick={() => toggleDiv('BOARDING')}
                          >
                            BOARDING
                          </div>
                          <div
                            className={`w-full text-center  p-1 border-b-4 cursor-pointer ${activeDiv === 'DROPPING' ? 'border-red-600' : ''
                              }`}
                            onClick={() => toggleDiv('DROPPING')}
                          >
                            DROPPING
                          </div>
                        </div>
                        <div className='px-1 overflow-y-auto max-h-52'>
                          {activeDiv === 'BOARDING' && (
                            <ul className='boarding-points'>
                              {Data.boardingPoints.map((point, index) => {
                                const isBoardingSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.boarding.includes(point);
                                return (
                                  <li className='px-5 py-2 cursor-pointer hover:bg-slate-200'
                                    key={`boarding-${index}`}>
                                    <label className='cursor-pointer '>
                                      <input className='mr-8'
                                        type='radio'
                                        value={point}
                                        checked={isBoardingSelected}
                                        onChange={() => { handleBoardingPointSelection(bus._id, point); toggleDiv('DROPPING') }}
                                      />
                                      {point}</label>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                          {activeDiv === 'DROPPING' && (
                            <ul className='dropping-points'>
                              {Data.droppingPoints.map((point, index) => {
                                const isDroppingSelected = selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.dropping.includes(point);
                                return (
                                  <li className='px-5 py-2 cursor-pointer hover:bg-slate-200' key={`dropping-${index}`}
                                  >
                                    <label className='cursor-pointer '>
                                      <input className='mr-8'
                                        type='radio'
                                        value={point}
                                        checked={isDroppingSelected}
                                        onChange={() => handleDroppingPointSelection(bus._id, point)}
                                      />
                                      {point}
                                    </label>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                        <button
                          className="w-full h-10 font-bold text-white bg-red-500"
                          onClick={() => {
                            const selectedBus = selectedSeats.find((selectedBus) => selectedBus.id === bus._id);
                            if (selectedBus.boarding && selectedBus.dropping) {
                              handleContinueProceeder(bus._id)
                            } else {
                              alert('Please select both boarding and dropping points.');
                            }
                          }}
                        >
                          Continue
                        </button>

                      </div> : ''}
                      {checkboolean === true ? <div className='bg-white lg:w-[70%] md:w-[70%] sm:w-full rounded-md mx-auto flex flex-col justify-between shadow-md shadow-gray-400'>
                        <div className='w-20 h-8 mx-auto mt-2 font-bold text-center text-white bg-red-500 rounded-lg cursor-pointer'
                          onClick={() => handleChangeProceeder(bus._id)} >Change</div>
                        <div className='bg-gray-200 max-h-fit w-[95%] my-2 mx-auto rounded-md'>
                          <div className='w-[95%] mx-auto mt-3 text-center bg-white rounded-md h-auto'>
                            <div style={{ borderBottom: "2px dotted black" }} className='py-3 font-thin'>Boarding Point<br /> <p className='my-1 font-bold text-green-600'>
                              {selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.boarding || "Not selected"},{Startlocation}</p></div>
                            <div className='py-3 font-thin' >Dropping Point<br /> <p className='my-1 font-bold text-blue-500'>
                              {selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.dropping || "Not selected"},{Endlocation}</p></div>
                          </div>
                          <h1 className='flex flex-wrap p-1 my-1'><span className='font-bold '>Selected Seats : </span> {selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.length > 0 ? (
                            selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.map((seat, seatIndex) => (
                              <div key={seatIndex}> {` ${seat } ,  `}</div>
                            ))) : (<div> No seats selected</div>)} </h1>
                          <h1 className='p-1 mx-auto my-1 font-bold'>Total Amount : <span className='text-lg font-bold text-red-600'>
                            ₹ {selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedPrice.reduce((totalPrice, Price) => totalPrice + Price, 0)}</span></h1>
                        </div>
                        <div className='justify-center text-center'>
                          <button className='w-full h-10 font-bold text-white bg-green-500 rounded-md rounded-tl-none rounded-tr-none hover:bg-red-600'
                            onClick={() => {
                              // Find the object with matching 'id' and store it in a variable
                              const filteredbus = selectedSeats.find((seat) => seat.id === bus._id);

                              if (filteredbus && selectedSeats.find((selectedBus) => selectedBus.id === bus._id)?.selectedSeats.length > 0) {
                                // If a matching object is found, send it to the action
                                const token = localStorage.getItem('token')
                               if (token) {
                                props.sendinitialdata(filteredbus);
                                navigate("/Passengers");
                               }
                               else{
                                props.setauth(!isDivVisible);
                               }
                              }
                              else{
                                alert('select at least 1 seat')
                              }
                            }}>
                            Proceed To Book
                          </button>
                        </div>
                      </div> : ''}
                    </div>
                  </div>
                </div>
              </>}
            </div> : <h1>No Data</h1>
            )
          })}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    traveldata: state.traveldataReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    settraveldata: (traveldata) => dispatch(settraveldata(traveldata)),
    updatetraveldata: (traveldata) => dispatch(updatetraveldata(traveldata)),
    sendinitialdata: (filteredbus) => dispatch(sendinitialdata(filteredbus)),
    setauth: (condn) => dispatch(setauth(condn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buses);