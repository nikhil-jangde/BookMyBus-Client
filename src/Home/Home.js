import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import image3 from "../images/search.20230915.webp";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import BusIcon from "@mui/icons-material/DirectionsBus";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useNavigate } from "react-router-dom";
import {
  settraveldata,
  updatetraveldata,
  deleteTraveldata,
} from "../Redux/actions/settraveldata";
import { connect } from "react-redux";
import fieldCd from "../Redux/constant/typeCodes";
import FeedbackCarausal from "./FeedbackCarausal";

function Home(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Initialize queries as an object
  const [queries, setQueries] = useState({
    location1: props.traveldata ? props.traveldata[fieldCd.Location1] : "",
    location2: props.traveldata ? props.traveldata[fieldCd.Location2] : "",
  });

  const [dropdownVisible1, setDropdownVisible1] = useState(false);
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  // Initialize items as an empty array
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:5000/Api/districts")
      .then((result) => {
        //console.log("API Response:", result);
        if (result.status === 200) {
          //console.log("Data received:", result.data);
          setItems(result.data);
        } else {
          console.error("API request failed with status:", result.status);
        }
      })
      .catch((err) => console.error("API request failed:", err));
  }, []);

  const [filteredItems1, setFilteredItems1] = useState([]); // Filtered items for query1
  const [filteredItems2, setFilteredItems2] = useState([]); // Filtered items for query2

  const filterItems = (query, setFilteredItems) => {
    if (query) {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      // Handle the case when query is undefined or empty
      setFilteredItems([]);
    }
  };

  useEffect(() => {
    const location1 = props.traveldata
      ? props.traveldata[fieldCd.Location1]
      : "";
    filterItems(location1, setFilteredItems1);
  }, [props.traveldata]);

  useEffect(() => {
    const location2 = props.traveldata
      ? props.traveldata[fieldCd.Location2]
      : "";
    filterItems(location2, setFilteredItems2);
  }, [props.traveldata]);

  const handleItemClick1 = (item) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      location1: item,
    }));
    // Dispatch settraveldata action with the selected item
    props.settraveldata({
      ...props.traveldata,
      [fieldCd.Location1]: item,
    });
    setDropdownVisible1(false);
  };

  const handleItemClick2 = (item) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      location2: item,
    }));
    // Dispatch settraveldata action with the selected item
    props.settraveldata({
      ...props.traveldata,
      [fieldCd.Location2]: item,
    });
    setDropdownVisible2(false);
  };

  useEffect(() => {
    const inputElement = document.querySelector('input[type="date"]');

    if (inputElement) {
      const today = new Date().toISOString().split("T")[0];
      inputElement.min = today;
    }
  }, []);

  // Form submission
  const onSubmit = () => {
    if (props.traveldata !== null) {
      navigate("/Buses");
    }
  };

  const [eventOccurred1, setEventOccurred1] = useState(false);
  const [eventOccurred2, setEventOccurred2] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  console.log(
    props.traveldata ? props.traveldata[fieldCd.Date] : "no date in home js"
  );

  return (
    <>
      <div
        className="image-div w-full lg:h-[55vh]  bg-cover mt-20 bg-center relative"
        style={{ backgroundImage: `url(${image3})` }}
      >
        <div className="container relative z-10 p-8 mb-12 text-center text-white">
          <h1 className="font-sans text-xl font-semibold text-black lg:mt-12 md:text-4xl">
            India’s No. 1 Bus Ticket Booking Site
          </h1>
          <div className="items-center justify-center w-full mt-10">
            <div className=" Main-div mx-auto w-[80%] bg-white grid grid-cols-1 sm:grid-cols-1 md:grid-col-4 lg:grid-cols-4 items-center  justify-center rounded-3xl">
              {/* Arrival Location */}
              <div className="relative flex items-center justify-center h-auto py-2 bg-white border-r cursor-pointer lg:rounded-3xl lg:rounded-tr-none lg:rounded-br-none">
                <div className="relative cursor-pointer">
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "80%" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      label="FROM"
                      placeholder="Origin City"
                      id="outlined-search"
                      variant="outlined"
                      {...register(fieldCd.Location1, { required: true })}
                      value={
                        props.traveldata
                          ? props.traveldata[fieldCd.Location1]
                          : ""
                      }
                      onChange={(e) => {
                        // Update Redux state when the user types
                        {
                          props.traveldata
                            ? setEventOccurred1(true)
                            : setEventOccurred1(false);
                        }
                        setDropdownVisible1(true);
                        props.settraveldata({
                          ...props.traveldata,
                          [fieldCd.Location1]: e.target.value,
                        });
                      }}
                      error={errors[fieldCd.Location1] ? true : false}
                      helperText={
                        errors[fieldCd.Location1] &&
                        "Please enter your Origin City"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <DepartureBoardIcon
                                style={{
                                  color: eventOccurred1 ? "red" : "blue",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { fontWeight: "bold" },
                      }}
                    />
                  </Box>
                  {dropdownVisible1 && (
                    <div
                      style={{ border: "1px solid green" }}
                      className="absolute z-10 mt-2 w-[80%] ml-[10%] max-h-60  overflow-y-auto scrollbar-hide bg-white  rounded-3xl shadow-lg"
                    >
                      {filteredItems1.map((item) => (
                        <div
                          key={item}
                          className="px-4 py-2 text-left text-black cursor-pointer bold hover:bg-green-400"
                          onClick={() => handleItemClick1(item)}
                        >
                          <LocationOnIcon />
                          {item.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  style={{
                    width: "6vh",
                    height: "5vh",
                    borderRadius: "15%",
                    position: "absolute",
                    right: "-3vh", // Adjust this value as needed
                    top: "50%", // Vertically center the button
                    transform: "translateY(-50%)", // Offset by 50% of the button's height
                  }}
                  className="text-gray-600 bg-gray-200"
                  onClick={() => {
                    const temp = queries.location1;
                    setQueries((prevQueries) => ({
                      ...prevQueries,
                      location1: queries.location2,
                      location2: temp,
                    }));
                  }}
                >
                  <CompareArrowsIcon />
                </button>
              </div>

              {/* Departure Location */}
              <div className="flex items-center justify-center h-auto py-2 bg-white border border-l border-r cursor-pointer">
                <div className="relative ">
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "80%" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      placeholder="Destination City"
                      id="outlined-search"
                      label="TO"
                      variant="outlined"
                      type="text"
                      {...register(fieldCd.Location2, { required: true })}
                      value={
                        props.traveldata
                          ? props.traveldata[fieldCd.Location2]
                          : ""
                      }
                      onChange={(e) => {
                        {
                          props.traveldata
                            ? setEventOccurred2(true)
                            : setEventOccurred2(false);
                        }
                        setDropdownVisible2(true);
                        // Update Redux state when the user types
                        props.settraveldata({
                          ...props.traveldata,
                          [fieldCd.Location2]: e.target.value,
                        });
                      }}
                      error={errors[fieldCd.Location2] ? true : false}
                      helperText={
                        errors[fieldCd.Location2] &&
                        "Please enter your destination"
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <BusIcon
                                style={{
                                  color: eventOccurred2 ? "red" : "blue",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { fontWeight: "bold" },
                      }}
                    />
                  </Box>
                  {dropdownVisible2 && (
                    <div
                      style={{ border: "1px solid red" }}
                      className="absolute z-10 mt-2 w-[80%] ml-[10%] max-h-60 overflow-y-auto scrollbar-hide bg-white border border-gray-300 rounded-3xl shadow-lg"
                    >
                      {filteredItems2.map((item) => (
                        <div
                          key={item}
                          className="px-4 py-2 text-left text-black cursor-pointer hover:bg-red-500"
                          onClick={() => handleItemClick2(item)}
                        >
                          <LocationOnIcon /> {item.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Journey Date */}
              <div className="flex items-center justify-center h-full py-2 bg-white border ">
                <Box
                  component="form"
                  sx={{ "& > :not(style)": { width: "100%", cursor: "text" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    {...register(fieldCd.Date, { required: true })}
                    defaultValue={
                      props.traveldata
                        && props.traveldata[fieldCd.Date]
                    }
                    onChange={(e) => {
                      // Update Redux state when the user types
                      props.settraveldata({
                        ...props.traveldata,
                        [fieldCd.Date]: e.target.value,
                      });
                    }}
                    error={errors[fieldCd.Date] ? true : false}
                    helperText={errors[fieldCd.Date] && "Date Required"}
                    type="date"
                  />
                </Box>
              </div>
              <button
                className="flex items-center justify-center h-16 bg-red-500 lg:h-full lg:rounded-3xl lg:rounded-tl-none lg:rounded-bl-none hover:bg-red-800"
                onClick={handleSubmit(onSubmit)}
              >
                SEARCH BUSES
              </button>
            </div>
          </div>
        </div>
      </div>
    <FeedbackCarausal/>
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
    deleteTraveldata: () => dispatch(deleteTraveldata()), // Updated to clear the traveldata
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
