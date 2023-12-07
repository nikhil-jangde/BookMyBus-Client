import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Box, InputAdornment, IconButton} from '@mui/material';
import fieldCd from '../Redux/constant/typeCodes';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { settraveldata, updatetraveldata } from '../Redux/actions/settraveldata';
import axios from 'axios';
import { connect } from 'react-redux';
import DateModifier from '../UserLog/DateModifier';

function Modifier(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

    const [items, setItems] = useState([]);

useEffect(() => {
  // Fetch data from the backend API
  axios
    .get('http://localhost:5000/api/districts')
    .then((result) => {
      //console.log("API Response:", result);
      if (result.status === 200) {
        //console.log("Data received:", result.data);
        setItems(result.data);
      } else {
        console.error('API request failed with status:', result.status);
      }
    })
    .catch((err) => console.error('API request failed:', err));
}, []);

  const [dropdownVisible1, setDropdownVisible1] = useState(false);
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  const [filteredItems1, setFilteredItems1] = useState([]); // Filtered items for query1
  const [filteredItems2, setFilteredItems2] = useState([]); // Filtered items for query2

  const filterItems = (query, setFilteredItems) => {
    if (query) {
      const filtered = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setFilteredItems(filtered);
    } else {
      // Handle the case when query is undefined or empty
      setFilteredItems([]);
    }
  };
  
  useEffect(() => {
    const location1 = props.traveldata ? props.traveldata[fieldCd.Location1] : '';
    filterItems(location1, setFilteredItems1);
  }, [props.traveldata]);
  
  useEffect(() => {
    const location2 = props.traveldata ? props.traveldata[fieldCd.Location2] : '';
    filterItems(location2, setFilteredItems2);
  }, [props.traveldata]);
  

  const handleItemClick1 = (item) => {
    props.settraveldata({
      ...props.traveldata,
      [fieldCd.Location1]: item,
    });
    setDropdownVisible1(false);
  };
  

  const handleItemClick2 = (item) => {
    props.settraveldata({
      ...props.traveldata,
      [fieldCd.Location2]: item,
    });
    setDropdownVisible2(false);
  };


  return (
    <div className='w-full bg-custom-color font-bold grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2 items-center  justify-center'>
    <div className='h-auto mx-auto flex'>
    <div className="relative cursor-pointer my-2">
          <Box
            component="form"
            sx={{ '& > :not(style)': {background:"white",borderRadius:"10px"  } }}
            noValidate
            autoComplete="off"
          >
            <TextField
            placeholder='Origin City'
              id="outlined-search"
              variant="outlined" 
              {...register(fieldCd.Location1, { required: true })}
              value={props.traveldata ? props.traveldata[fieldCd.Location1] : ''}
              onChange={(e) => {
                // Update Redux state when the user types
                setDropdownVisible1(true);
                props.settraveldata({
                  ...props.traveldata,
                  [fieldCd.Location1]: e.target.value,
                });
              }}
              error={errors[fieldCd.Location1] ? true : false}
              helperText={errors[fieldCd.Location1] && 'Please enter your Origin City'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <DepartureBoardIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontWeight: 'bold' },
              }}
            />
          </Box>
           {dropdownVisible1 && (
            <div  className="absolute w-full z-10 mt-2 max-h-60  overflow-y-auto scrollbar-hide bg-white shadow-lg shadow-gray-400 rounded-lg">
              {filteredItems1.map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 cursor-pointer text-black text-left bold  hover:bg-green-400"
                  onClick={() => handleItemClick1(item)}
                >
                  <LocationOnIcon />
                  {item.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative cursor-pointer ml-[10%] my-2">
          <Box
            component="form"
            sx={{ '& > :not(style)': {background:"white",borderRadius:"10px"  } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              placeholder='Destination City'
              id="outlined-search"
              variant="outlined" 
              {...register(fieldCd.Location2, { required: true })}
              value={props.traveldata ? props.traveldata[fieldCd.Location2] : ''}
              onChange={(e) => {
                // Update Redux state when the user types
                setDropdownVisible2(true);
                props.settraveldata({
                  ...props.traveldata,
                  [fieldCd.Location2]: e.target.value,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <DepartureBoardIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
                style: { fontWeight: 'bold' },
              }}
            />
          </Box>
           {dropdownVisible2 && (
            <div className="absolute z-10 mt-2 w-full max-h-60  overflow-y-auto scrollbar-hide bg-white  shadow-lg shadow-gray-400 rounded-lg">
              {filteredItems2.map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 cursor-pointer text-black text-left bold  hover:bg-green-400"
                  onClick={() => handleItemClick2(item)}
                >
                  <LocationOnIcon />
                  {item.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
    
    </div>
    <div className='bg-custom-color pl-[5%] h-auto'><DateModifier/></div>
     </div>
  )
}


const mapStateToProps = (state) => {
    return {
      traveldata: state.traveldataReducer,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      settraveldata: (traveldata) => dispatch(settraveldata(traveldata)),
      updatetraveldata: (traveldata) => dispatch(updatetraveldata(traveldata))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Modifier);