import React from 'react'
import Home from './Home/Home'
import { Route,Routes } from 'react-router-dom'
import Buses from './Buses/Buses'
import Passengers from './PassengerPage/Passengers'
import Login from './UserLog/Login'
import Footer from './Footer/Footer'
import Navbar from './Home/Navbar'
import { setauth } from './Redux/actions/setauth'
import { connect } from 'react-redux'
import Profile from './UserLog/Profile'
import Protected from './UserLog/Protected'
import Trips from './UserLog/Trips'
import Tickets from './Tickets/Tickets'


function App(props) {
 
 return (<>
   <Navbar/>
    <Routes>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/Tickets' element={<Protected Component={Tickets}/>}/>
      <Route path='/Passengers' element={<Protected Component={Passengers}/>}/>
      <Route path='/Buses'  element={<Protected Component={Buses}/>}/>
      <Route path='/Trips' element={<Trips/>}/>
    </Routes>
    <Footer/>
    {props.authdetails === true && <Login/>}
  </>)
}


const mapStateToProps = (state) => {
  return {
    authdetails: state.setauthReducer.isDivVisible,
    userdetail : state.saveuserReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   setauth: (condn) => dispatch(setauth(condn))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);