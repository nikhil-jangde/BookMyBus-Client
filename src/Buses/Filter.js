import React from 'react'
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useState } from 'react';

function Filter() {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);
    const [isChecked6, setIsChecked6] = useState(false);
    const [isChecked7, setIsChecked7] = useState(false);
    const [isChecked8, setIsChecked8] = useState(false);
  // Function to handle checkbox state changes
  const handleCheckboxChange = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        setIsChecked1(!isChecked1);
        break;
      case 2:
        setIsChecked2(!isChecked2);
        break;
      case 3:
        setIsChecked3(!isChecked3);
        break;
      case 4:
        setIsChecked4(!isChecked4);
        break;
      case 5:
        setIsChecked5(!isChecked5);
        break;
      case 6:
        setIsChecked6(!isChecked6);
        break;
      case 7:
        setIsChecked7(!isChecked7);
        break;
      case 8:
        setIsChecked8(!isChecked8);
        break;
      default:
        break;
    }
  };

  return (
    <div>
     <h1 className='pb-4 text-sm font-bold'>FILTERS</h1>
          <hr />
          
          <hr />
          <h1 className='pt-4 pb-4 text-sm font-bol'>DEPARTURE TIME</h1>
      
          <div className='flex items-center py-1 text-sm text-gray-600 cursor-pointer' onClick={() => handleCheckboxChange(2)}>
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox"
              type="checkbox"
              checked={isChecked2}
            />
            <Brightness5Icon/>  Morning Session
          </div>
          <div className='flex items-center py-1 text-sm text-gray-600 cursor-pointer' onClick={() => handleCheckboxChange(3)}>
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox"
              type="checkbox"
              checked={isChecked3}
            />
            <Brightness6Icon/> Afternoon Session
          </div>
          <div
            className={`py-1 text-sm flex cursor-pointer items-center ${isChecked4 ? 'text-red-600' : 'text-gray-600'
              }`}
            onClick={() => handleCheckboxChange(4)}
          >
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox"
              type="checkbox"
              checked={isChecked4}
            />
            <Brightness4Icon /> Evening Session
          </div>
          <h1 className='pt-4 pb-4 text-sm font-bold'>BUS TYPES</h1>
          <div className='flex items-center py-1 text-sm text-gray-600 cursor-pointer' onClick={() => handleCheckboxChange(5)}>
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox"
              type="checkbox"
              checked={isChecked5}
            />
            SEATER (5)
          </div>
          <div className='flex items-center py-1 text-sm text-gray-600 cursor-pointer' onClick={() => handleCheckboxChange(6)}>
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox"
              type="checkbox"
              checked={isChecked6}
            />
            SLEEPER (41)
          </div>
          <div className='flex items-center py-1 text-sm text-gray-600 cursor-pointer' onClick={() => handleCheckboxChange(7)}>
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox"
              type="checkbox"
              checked={isChecked7}
            />
            AC (40)
          </div>
          <div className='flex items-center py-1 text-sm text-gray-600 cursor-pointer' onClick={() => handleCheckboxChange(8)}>
            <input
              className="w-5 h-5 mr-3 cursor-pointer form-checkbox black"
              type="checkbox"
              checked={isChecked8}
            />
            NONAC (4)
          </div>
          <h1 className='py-4 text-sm font-bold'>SEAT AVAILABILITY</h1> 
    </div>
  )
}

export default Filter
