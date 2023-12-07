import React ,{ useState } from 'react';
import Avatar from 'react-avatar-edit';
import { connect } from 'react-redux';
import male from  './profileIcon/male.jpg'
import female from  './profileIcon/female.jpg'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();
    const [visible,setVisible]= useState(false)
    const [user,setuser] = useState([]);console.log('user',user);
    
        const [username,setUsername]=useState();
        const [email,setEmail]=useState();
        const [gender,setGender]=useState();

     
     useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('token',token);
        if (!token) {
          navigate('/')
        }
            axios.get(`https://book-my-bus-server.vercel.app/Api/Verify-token/${token}`)
            .then(result => {
              if (result.status === 200) {
                const userData = result.data;
                setuser(userData)
                setUsername(userData.username)
                setEmail(userData.email)
                setGender(userData.gender)
                
              }
            })
            .catch(error => {
              // Token is invalid, remove it from localStorage
              console.log('verificationfailed--->',error);
             // localStorage.removeItem('token');
            });
          }
      , []);
     
      
      const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
      };
      
      const handleUpdate = async (e) => {
        let id = user._id;
        e.preventDefault();
        try {
          await axios.put(`http://localhost:5000/Api/updateuser/${id}`, { username, email, gender});
          alert('User updated successfully!');
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert('An error occurred while updating the user.');
        }
      };

      
  return (<>
    <div className='flex items-center justify-center w-full h-screen bg-emerald-500' >
      <div className=' flex flex-col  p-6 mx-auto lg:w-[30%] md:w-[30%] sm:w-[90%] my-auto bg-white h-auto border border-black rounded-xl'>
        <div className='relative'>
            <button className='absolute top-0 right-0' onClick={()=>setVisible(true)}><EditIcon/></button>
        </div>
        <div>
            <img className='w-32 h-32 mx-auto border border-black rounded-full' src={user.gender === 'male' ? male : female} />
        </div>
        <h1 className='py-2 text-2xl font-bold text-center text-black'>{user.username} - ({user.gender})</h1>
        <h1 className='py-2 text-lg font-semibold text-center text-black'>{user.mobile}</h1>
        <h1 className='py-2 text-lg font-semibold text-center text-black'>{user.email}</h1>
        <h1 className='py-1 text-center text-black text-md'><span className='font-semibold '>User_since :</span> {user.since}</h1>
        </div>
    </div>
    {visible === true ?
    <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen backdrop-blur-sm'>
        <div className='mx-auto p-8 lg:w-[30%] md:w-[30%] sm:w-[90%] my-auto bg-white shadow-lg shadow-black h-auto border border-black rounded-xl'>
             {/* Email input */}
             <div className="relative w-full "> <button className="absolute top-0 right-0" style={{border:"1px solid black",float:"right"}}
    onClick={() => setVisible(false)}>❌</button></div>
      <div className='w-[80%] mx-auto'>
      <label htmlFor="email" className="text-xl font-bold text-center text-white">
       Enter Your Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full p-2 border rounded-full border-emerald-500 text-emerald-500"
        placeholder="Enter your email"
        value={email} 
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      /></div>

      {/* Username input */}
      <div className='w-[80%] mx-auto'>
      <label htmlFor="username" className="text-xl font-bold text-center text-white">
        Enter Your Fullname
      </label>
      <input
        type="text"
        id="username"
        className="w-full p-2 border rounded-full border-emerald-500 text-emerald-500"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => {
        setUsername(e.target.value); }} />
        </div>
        
        <div className='items-center justify-center w-full my-2'>
        <div className="flex mx-auto w-28">
        <button
          className={`w-12 h-12 border-2 m-1 border-gray-300 rounded focus:outline-none focus:border-blue-500 ${
            gender === 'male' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleGenderChange('male')}
        >
          M
        </button>

        <button
          className={`w-12 h-12 border-2 m-1 border-gray-300 rounded focus:outline-none focus:border-pink-500 ${
           gender === 'female' ? 'bg-pink-500 text-white' : ''
          }`}
          onClick={() => handleGenderChange('female')}
        >
          F
        </button>
      </div>
      </div>
        <button className="bg-emerald-600 w-[80%] mx-auto flex gap-1 items-center justify-center py-2.5 text-black font-bold rounded border border-black"
      onClick={handleUpdate}
      >        
        <span>Update</span>
        </button>
        </div>
    </div> :''}
    </>
  )
}
const mapStateToProps = (state) => {
    return {
      userdetail: state.saveuserReducer
    };
  };
  
 
  
  export default connect(mapStateToProps)(Profile);