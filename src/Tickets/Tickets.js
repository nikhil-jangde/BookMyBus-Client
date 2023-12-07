import React,{ useRef, useState,useEffect }  from 'react'
import Logo from '../images/logo.png';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function Tickets() {
  const navigate = useNavigate();
  const [ticketData,setTicketData]=useState(); console.log('ticketData',ticketData);
  const token = localStorage.getItem('token')
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/')
    }
        axios.get(`https://book-my-bus-server.vercel.app/Api/Verify-token/${token}`)
        .then(result => {
          if (result.status === 200) {
            const userData = result.data;
            setTicketData(userData)            
          }
        })
        .catch(error => {
          // Token is invalid, remove it from localStorage
          console.log('verificationfailed--->',error);
         // localStorage.removeItem('token');
        });
      }
  , []);
    const passengers = [
        { name: 'John Doe', age: 25, gender: 'Male', seatNumber: '12A' },
        { name: 'Jane Doe', age: 22, gender: 'Female', seatNumber: '12B' },
      ];

      const downloadResume = async () => {
        const input = document.getElementById("print");
      
        try {
          const canvas = await html2canvas(input);
          const pdf = new jsPDF({
            orientation: 'p',  // 'p' for portrait, 'l' for landscape
            unit: 'mm',
            format: [210, 297],  // A4 size: 210mm x 297mm
          });
      
          const imgData = canvas.toDataURL("image/png");
          pdf.addImage(imgData, "JPEG", 0, 0, 210, 120);  // Adjust width and height as needed
          pdf.save('BMBTKT.pdf');
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
      };
      
      const isTripCompleted = (endDate, endTime) => {
        const tripEndDate = new Date(`${endDate} ${endTime}`);
        const currentDate = new Date();
        return currentDate > tripEndDate;
      };

      
  return (
    <div className='flex items-center justify-center w-full h-screen mt-20 bg-emerald-500'>
      {ticketData && ticketData.trips.length > 0 ? <div className='w-[90%] md:w-[60%] text-black lg:w-[60%] sm:w-full max-h-screen overflow-y-auto scrollbar-hide h-screen text-center rounded-lg bg-slate-100 px-4 '>
        {ticketData && ticketData.trips.map((item,index)=>(<div key={index} className='relative w-full h-auto my-4 bg-white rounded-lg shadow-md shadow-black'>
            <button className='absolute top-0 right-0 px-5 text-blue-600 hover:text-green-400' onClick={downloadResume}><DownloadForOfflineIcon/></button>
            <h1 className='w-full mb-2 font-semibold text-center text-black bg-orange-300 rounded-md text-md'>Status :  
          <span className={` text-md ${isTripCompleted(item.EndDate, item.endTime)?'text-red-500':'text-green-600'}`}>
           {isTripCompleted(item.EndDate, item.endTime) ? 'Completed✅' : 'Upcoming↗️'}</span></h1>
        <div id="print"  className="relative p-8 bg-white rounded-lg shadow-md ">
          <h1 className='absolute top-0 left-0 p-2 text-xs font-semibold text-black'>Booked On : {item.bookingdate}</h1>
          <h1 className='absolute top-0 right-0 p-2 font-semibold text-black text-md'>FARE : <span className='text-green-600'>{item.busFare}</span> INR</h1>
        <div className="flex flex-col items-center mb-4 text-center">
          <img src={Logo} className="h-10 mx-auto ml-5 mr-5 cursor-pointer" alt="Logo" />
          <p className="text-sm text-gray-500">🙏 Namaste ! Your journey starts here</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="m-1 text-xs text-gray-600">Boarding</p>
            <p className="text-sm font-semibold text-gray-800">{item.boarding},</p>
            <p className="text-sm font-semibold text-gray-800">{item.from}</p>
          </div>
          <div>
            <p className="m-1 text-xs text-gray-600">Dropping</p>
            <p className="text-sm font-semibold text-gray-800">{item.dropping},</p>
            <p className="text-sm font-semibold text-gray-800">{item.to}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-600">Date & Time</p>
          <p className="text-sm font-semibold text-gray-800">{item.StartDate} , {item.startTime}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-600">Bus Operator</p>
          <p className="text-sm font-semibold text-gray-800">{item.busName}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-600">Ticket No.</p>
          <p className="font-semibold text-red-500 text-md">{item.TicketNo} <span className='text-green-500'> (CNF)</span></p>
        </div>
        <div className="mb-4 ">
          <p className="my-2 text-xs text-gray-600">Passengers</p>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Seat No.</th>
              </tr>
            </thead>
            <tbody>
              {ticketData && item.passengers.map((passenger, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{passenger.name}</td>
                  <td className="px-4 py-2 border">{passenger.age}</td>
                  <td className="px-4 py-2 border">{passenger.gender}</td>
                  <td className="px-4 py-2 border">{passenger.seatNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Thank you for choosing BookMyBus</p>
          <p className="text-sm font-semibold text-gray-800">Have a safe journey!</p>
        </div>
      </div>
      </div>))}
      </div>:<div className='flex items-center justify-center w-full h-screen bg-emerald-500'><h1 className='w-full text-xl font-semibold text-center text-black -mt-44 '><span className='text-xl text-red-500'>Oops ❌ </span>No Bookings !</h1></div>}
    </div>
  )
}

export default Tickets
