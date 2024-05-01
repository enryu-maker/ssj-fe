import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import OtpInput from 'react-otp-input';

function OTP({ setModal, number }) {
  const [otp, setOtp] = useState('');

  // for timer
  const [delay, setDelay] = useState(180);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className='grid md:grid-cols-2 font-Raleway place-content-center md:h-full h-[50vh]  '>
      <div className=' absolute right-0'>
        <motion.button
          whileHover={{
            rotate: -90,
          }}
          whileTap={{ scale: 0.85 }}
          className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
          onClick={setModal}>
          <RxCross2 className=' text-primary-color ' />
        </motion.button>
      </div>

      <div className='flex flex-col gap-5 items-center justify-center p-5'>
        <h1 className='text-3xl font-semibold text-primary-color'>
          Verify Mobile OTP
        </h1>
        <p className=' text-sm font-semibold'>
          OTP Send to mobile number {number}
        </p>
        <p className=' text-sm font-semibold text-slate-400'>Enter OTP</p>
        <form className='space-y-4 '>
          <div className='flex items-center justify-center gap-5'>
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
                  }}>
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
          <p className=' text-sm text-slate-400 text-center'>
            Haven't received the OTP ?{' '}
            <span className=' underline cursor-pointer'>Resend</span> in{' '}
            <span className=' text-lg'>
              {minutes}:{seconds}
            </span>
            s
          </p>
          <p class='text-center text-sm text-gray-500'>
            By continuing, I agree to{' '}
            <span className=' text-primary-color font-semibold'>
              Terms of Use
            </span>{' '}
            &{' '}
            <span className=' text-primary-color font-semibold '>
              Privacy Policy.
            </span>
          </p>
          <div className='flex justify-center items-center'>
            <button className=' p-2 bg-primary-color text-white rounded-md'>
              Verify OTP
            </button>
          </div>
        </form>
      </div>
      <div className=''>
        <img
          src='https://i.pinimg.com/564x/8c/98/d0/8c98d0fdb7e0da43f8ad707c4168562e.jpg'
          alt=''
          className=' rounded-r-lg hidden md:block'
        />
      </div>
    </div>
  );
}

export default OTP;
