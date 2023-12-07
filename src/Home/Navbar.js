import React from 'react'
import Logo from '../images/logo.png';
import MoreIcon from '@mui/icons-material/More';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { saveuser } from '../Redux/actions/saveuser';
import { setauth } from '../Redux/actions/setauth';
import LogoutIcon from '@mui/icons-material/Logout';


function Navbar(props,{isDivVisible,setauth}) {

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');console.log('mytoken--->>',token);
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const currentTime = Date.now() / 1000; // Convert current time to seconds

  //     if (decodedToken.exp < currentTime) {
  //       // Token is expired, remove it from localStorage
  //       //localStorage.removeItem('token');
  //     } else {
  //       // Token is not expired, verify it with the server
  //       axios.get('http://localhost:5000/Api/Verify-token', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(response => {
  //         // Token is valid, set the user data or perform any other necessary actions
  //         const userData = response.data
  //                  console.log('tokentodata---->',userData);
  //         props.saveuser(userData)
  //       })
  //       .catch(error => {
  //         // Token is invalid, remove it from localStorage
  //         console.log('verificationfailed--->',error);
  //        // localStorage.removeItem('token');
  //       });
  //     }
  //   }
  // }, []);

  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log('token',token);
        axios.get(`http://localhost:5000/Api/Verify-token/${token}`)
        .then(result => {
          if (result.status === 200) {
            const userData = result.data;
          props.saveuser(userData);
          }
        })
        .catch(error => {
          // Token is invalid, remove it from localStorage
          console.log('verificationfailed--->',error);
         // localStorage.removeItem('token');
        });
      }
  , [token]);

  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#red';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white shadow-md shadow-slate-500">
    <div className="container flex items-center justify-between py-5 mx-auto md:px-20">
      <div className="flex items-center">
        <img src={Logo} className="h-10 ml-5 mr-5 cursor-pointer" alt="Logo" onClick={()=>{navigate('/')}} />
        <button className="px-2 py-2 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl"
        onClick={()=>{token ? navigate('/Tickets') : props.setauth(!isDivVisible)}}>
          My Tickets <MoreIcon/>
        </button>
      </div>

      { !props.userdetail ? <div className="flex items-center space-x-4">
        <button className="px-3 py-2 font-semibold text-red-500 shadow-xl hover:bg-blue-600 rounded-xl"  onClick={() => props.setauth(!isDivVisible)} >
          Login / Register
        </button>
      </div>:
      <div className="relative">
      <div
        className="text-black cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Avatar style={{border:"1px solid black"}} {...stringAvatar(props.userdetail && props.userdetail.username)} />
        
      </div>

      {showDropdown && (
        <div className="absolute mt-2 -translate-x-1/2 border border-black rounded shadow-md w-36 left-1/2 left bg-emerald-500 shadow-black">
          <button
            className="block w-full px-4 py-2 text-lg text-left text-black hover:bg-blue-300"
            onClick={() => {
              // Handle My Profile action
              setShowDropdown(false);
              navigate('/profile')
            }}
          >
            My Profile
          </button>
          <button
            className="block w-full px-4 py-2 text-lg text-left text-black hover:bg-blue-300"
            onClick={() => {
              // Handle My Trips action
              setShowDropdown(false);
              navigate('/Trips')
            }}
          >
            My Trips
          </button>
          <button
            className="block w-full px-4 py-2 text-lg text-left text-black hover:bg-blue-300"
            onClick={() => {
              // Handle Wallet action
              setShowDropdown(false);
            }}
          >
            Wallet
          </button>
          <button
            className="block w-full px-4 py-2 text-lg text-left text-black hover:bg-blue-300"
            onClick={() => {
              // Handle Logout action
              localStorage.removeItem('token');
              setShowDropdown(false);
              window.location.reload();
            }}
          >
            Logout   <LogoutIcon/>
          </button>
        </div>
      )}
    </div>}
      {/* <Avatar onClick={()=>{setLoggedin(false)}} sx={{ bgcolor:'gray' }}>{props.userdetail ? props.userdetail.username : 'login'}</Avatar> */}
    </div>
  </nav>
  
  )
}


const mapStateToProps = (state) => {
  return {
    userdetail: state.saveuserReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveuser: (userData) => dispatch(saveuser(userData)),
    setauth:(condn) => dispatch(setauth(condn)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);