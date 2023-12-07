import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
import fieldCd from '../Redux/constant/typeCodes';

function DateModifier(props) {
    // Get the current date from Redux store or any source
//const [currentDate,setCurrentDate]=useState(props.traveldata ? props.traveldata[fieldCd.Date]:'')
 const currentDate = new Date();
console.log(props.traveldata ? props.traveldata[fieldCd.Date]:'no date');
  
    // Create state to hold the modified date
    const [modifiedDate, setModifiedDate] = useState(currentDate);
  
    // Function to decrease the date by one day
    const decreaseDate = () => {
      const newDate = new Date(modifiedDate);
      newDate.setDate(newDate.getDate() - 1);
      // Check if the new date is not before the current date
      if (newDate >= currentDate) {
        setModifiedDate(newDate);
      }
    };
  
    // Function to increase the date by one day
    const increaseDate = () => {
      const newDate = new Date(modifiedDate);
      newDate.setDate(newDate.getDate() + 1);
      setModifiedDate(newDate);
    };
  
    // Format the date as "dd MMM ddd"
    const formattedDate = modifiedDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      weekday: 'short',
    });
  return (
    <div className="flex w-[90%]  items-center border border-collapse h-auto ">
    <button
      onClick={decreaseDate}
      className="w-[15%] bg-red-700 h-14 text-white "
    >
      &lt;
    </button>
    <div className="text-lg text-center py-4 bg-white h-14 w-[70%] font-semibold">{formattedDate}</div>
    <button
      onClick={increaseDate}
      className="w-[15%] h-14 bg-red-700 text-white "
    >
      &gt;
    </button>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    traveldata: state.traveldataReducer,
  };
};

export default connect(mapStateToProps)(DateModifier);