import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtpAsync, selectAuthError, selectIsLoading, selectLoggedInUser, selectIsAuthenticated } from '../features/Auth/authSlice';
import LoginDetails from './LoginDetails';

function OTP({ setModal, number, user }) {
  const [otp, setOtp] = useState("");
  const [openDetailPage, setDetailPage] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);
  // const user = useSelector(selectLoggedInUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  

  // Timer logic
  const [delay, setDelay] = useState(180);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay((prevDelay) => prevDelay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [delay]);

  // Mask phone number
  const maskNumber = (inputNum) => {
    if (inputNum) {
      const inputNumLength = inputNum.length;
      const maskedLength = inputNumLength - 4;
      let newString = inputNum;
      for (let i = 0; i < inputNumLength; i++) {
        if (i < maskedLength) {
          newString = newString.replace(inputNum[i], '*');
        }
      }
      return newString;
    } else {
      return '';
    }
  };

  const handleModal = useCallback(() => {
    setDetailPage((prev) => !prev);
  }, []);

  const handleVerifyOtp = async(e) => {
    e.preventDefault();
    try {
     const data = await user.confirm(otp)
     console.log(data);
     handleModal();
    } catch (error) {
      console.log(error);
    }
    // dispatch(verifyOtpAsync({ mobile_number: number, otp }));
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      handleModal();
    }
  }, [user, handleModal]);

  return (
    <>
     {
      openDetailPage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-10 inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-4xl">
            <div className="rounded-lg shadow-lg bg-white outline-none focus:outline-none">
              <div className="relative flex-auto">
                <LoginDetails number={isAuthenticated.mobile_number} setModal={setModal} />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 font-Raleway place-content-center md:h-full h-[50vh]">
        <div className="absolute right-0">
          <motion.button
            whileHover={{ rotate: -90 }}
            whileTap={{ scale: 0.85 }}
            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={setModal}
          >
            <RxCross2 className="text-primary-color" />
          </motion.button>
        </div>

        <div className="flex flex-col gap-5 items-center justify-center p-5">
          <h1 className="text-3xl font-semibold text-primary-color">
            Verify Mobile OTP
          </h1>
          <p className="text-sm font-semibold">
            OTP sent to mobile number {maskNumber(number)}
          </p>
          <p className="text-sm font-semibold text-slate-400">Enter OTP</p>
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div className="flex items-center justify-center gap-5">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={
                  <span
                    style={{
                      fontSize: '7px',
                      marginLeft: '5px',
                      marginRight: '5px',
                    }}
                  >
                    {' '}
                  </span>
                }
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: '50px',
                  height: '50px',
                  fontSize: '20px',
                  marginBottom: '10px',
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  outline: '1px solid #994e4f',
                }}
              />
            </div>
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
            <p className="text-sm text-slate-400 text-center">
              Haven't received the OTP?{' '}
              <span className="underline cursor-pointer">Resend</span> in{' '}
              <span className="text-lg">
                {minutes}:{seconds}
              </span>
              s
            </p>
            <p className="text-center text-sm text-gray-500">
              By continuing, I agree to{' '}
              <span className="text-primary-color font-semibold">
                Terms of Use
              </span>{' '}
              &{' '}
              <span className="text-primary-color font-semibold">
                Privacy Policy
              </span>
              .
            </p>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="p-2 bg-primary-color text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        </div>
        <div className="">
          <img
            src="https://i.pinimg.com/564x/8c/98/d0/8c98d0fdb7e0da43f8ad707c4168562e.jpg"
            alt=""
            className="rounded-r-lg hidden md:block"
          />
        </div>
      </div>
      )
     }

    </>
  );
}

export default OTP;
