import { CgSpinner } from "react-icons/cg";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Toaster } from "react-hot-toast";
import { saveuser } from "../Redux/actions/saveuser";
import { connect } from 'react-redux';
import axios from "axios";
import { setauth } from "../Redux/actions/setauth";

const Signup = ({mobile,setauth,isDivVisible}) =>{
    const [loading, setLoading] = useState(false);
    const [signupData , setSignupData] = useState({
        username:"",
        email:"",
        gender:""
      });console.log(signupData);

      async function createUser() {
        try {
          const adduser = await axios.post('https://book-my-bus-server.vercel.app/Api/CreateUser',
          {username:signupData.username, email:signupData.email,mobile:mobile,gender:signupData.gender});
          if (adduser.status === 200) {
            // User created successfully
            const userData = adduser.data;
            localStorage.setItem('token',userData._id)
            alert('user added succesfully');
            window.location.reload();
          } else if (adduser.status ===201){
            // Handle other response status codes as needed
           alert('email or mobile no already exist')
          }
        } catch (error) {
          // Handle errors, such as network issues or server errors
          throw error;
        }
      }

      const handleGenderChange = (selectedGender) => {
        setSignupData({ ...signupData, gender: selectedGender });
      };
      
  return (
<section2 className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen backdrop-blur-sm z-80">
  <div>
    <Toaster />
    <div className="flex flex-col gap-4 p-6 rounded-lg bg-emerald-500 w-80">
    <div className="relative w-full "> <button className="absolute top-0 right-0" style={{border:"1px solid black",float:"right"}}
    onClick={() => setauth(isDivVisible)}>❌</button></div>
      <h1 className="mb-6 text-3xl font-medium leading-normal text-center text-white">
        Sign Up to <br /> BookMyBus <LoyaltyIcon />
      </h1>
      <h2 className="w-full font-bold text-center text-white">Being registered with</h2>
<h1 className="w-full font-semibold text-center">{mobile}</h1>
      {/* Email input */}
      <label htmlFor="email" className="text-xl font-bold text-center text-white">
       Enter Your Email
      </label>
      <input
        type="email"
        id="email"
        className="p-2 border rounded-full border-emerald-500 text-emerald-500"
        placeholder="Enter your email"
        value={signupData.email} 
        onChange={(e) => {
          setSignupData({ ...signupData, email: e.target.value });
        }}
      />

      {/* Username input */}
      
      <label htmlFor="username" className="text-xl font-bold text-center text-white">
        Enter Your Fullname
      </label>
      <input
        type="text"
        id="username"
        className="p-2 border rounded-full border-emerald-500 text-emerald-500"
        placeholder="Choose a username"
        value={signupData.username}
        onChange={(e) => {
        setSignupData({ ...signupData, username: e.target.value }); }} />
        
        <div className='items-center justify-center w-full my-2'>
        <div className="flex mx-auto w-28">
        <button
          className={`w-12 h-12 border-2 m-1 border-gray-300 rounded focus:outline-none focus:border-blue-500 ${
            signupData.gender === 'male' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleGenderChange('male')}
        >
          M
        </button>

        <button
          className={`w-12 h-12 border-2 m-1 border-gray-300 rounded focus:outline-none focus:border-pink-500 ${
            signupData.gender === 'female' ? 'bg-pink-500 text-white' : ''
          }`}
          onClick={() => handleGenderChange('female')}
        >
          F
        </button>
      </div>
      </div>
        
        <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-black font-bold rounded border border-black"
        onClick={createUser}>
        {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
        
        <span>Sign Up</span>
      </button>
      
    </div>
  </div>
</section2>
  )
}

const mapStateToProps = (state) => {
  return {
    userdetail: state.saveuserReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveuser:(userData) => dispatch(saveuser(userData)),
    setauth:(condn) => dispatch(setauth(condn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
