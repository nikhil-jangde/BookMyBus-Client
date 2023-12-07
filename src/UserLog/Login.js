import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import LoopIcon from "@mui/icons-material/Loop";
import { saveuser } from "../Redux/actions/saveuser";
import { connect } from "react-redux";
import axios from "axios";
import Signup from "./Signup";
import { setauth } from "../Redux/actions/setauth";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Stack';

const Login = ({ isDivVisible, setauth }) => {

  // for otp verification and user login
  const [verified, setVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState();
  const [newUser, setNewUser] = useState(false);


  const SendOTP = async () => {
    setLoading(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      const confirmation = await signInWithPhoneNumber(auth, mobile, recaptcha);
      setShowOTP(true);
      setLoading(false);
      setConfirmationResult(confirmation);
    } catch (err) {
      console.log(err);
      console.error("Error sending OTP:", err);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const VerifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      axios
        .get(`http://localhost:5000/Api/check-user/${mobile}`)
        .then((result) => {
          console.log("line no 65 status", result);
          if (result.status === 200) {
            const userData = result.data.user;
            localStorage.setItem("token", userData._id);
            // props.saveuser(userData);
            setVerified(true);
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          }
          if (result.status === 201) {
            setNewUser(true);
            alert("not a user");
          }
        })
        .catch((err) => console.error("API request failed:", err));
    } catch (err) {
      alert(`oops : ${err}`);
    }
  };

  return (
    <>
      {newUser === false ? (
        <section1 className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen backdrop-blur-sm ">
          <div>
            <Toaster />
            {verified === true ? (
              <div className="w-auto h-auto p-10 rounded-md bg-emerald-500">
                <h2 className="text-3xl font-medium text-center text-white">
                  👍Login Success
                </h2>
                <h2 className="flex text-2xl font-medium text-center text-white">
                  <CgSpinner size={20} className="mt-1 animate-spin" /> please
                  wait ! redirecting to application
                  <LoopIcon />
                </h2>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-8 rounded-lg bg-emerald-500">
                <div className="relative w-full ">
                  <button
                    className="absolute top-0 right-0"
                    style={{ border: "1px solid black", float: "right" }}
                    onClick={() => setauth(isDivVisible)}
                  >
                    ❌
                  </button>
                </div>
                <h1 className="mb-6 text-3xl font-medium leading-normal text-center text-white">
                  Welcome to <br /> BookMyBus <LoyaltyIcon />
                </h1>
                {showOTP ? (
                  <>
                    <div className="p-4 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <div className="text-xl font-bold text-center text-white">
                      Enter your OTP
                    </div>
                    <input
                      className=" md:w-[38vh] md:h-[4vh]"
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        // Limit input to 6 digits
                        const value = e.target.value;
                        if (/^\d*$/.test(value) && value.length <= 6) {
                          setOtp(value);
                        }
                      }}
                      style={{ textAlign: "center", backgroundColor: "none" }}
                    />
                    <button
                      onClick={VerifyOTP}
                      className="bg-blue-400 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="p-4 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                      <BsTelephoneFill size={30} />
                    </div>
                    <label
                      htmlFor=""
                      className="text-xl font-bold text-center text-white"
                    >
                      Verify your phone number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={mobile}
                      onChange={(mobile) => {
                        setMobile("+" + mobile);
                      }}
                    />
                    <button
                      onClick={SendOTP}
                      className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Send OTP</span>
                    </button>
                    <div id="recaptcha-container"></div>
                  </>
                )}
              </div>
            )}
          </div>
        </section1>
      ) : (
        <Signup mobile={mobile} />
      )}      
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userdetail: state.saveuserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveuser: (userData) => dispatch(saveuser(userData)),
    setauth: (condn) => dispatch(setauth(condn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
