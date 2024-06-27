import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, selectUser, selectAuthError, selectLoading, setUser } from '../features/Auth/authSlice';
import ProfileDetails from './ProfileDetails';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon

function Login({ setModal }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authError = useSelector(selectAuthError);
  const loading = useSelector(selectLoading);

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, [dispatch]);

  return (
    <>
      {user ? (
        <ProfileDetails setModal={setModal} />
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
          <div className="">
            <img
              src="https://i.pinimg.com/564x/8c/98/d0/8c98d0fdb7e0da43f8ad707c4168562e.jpg"
              alt=""
              className="rounded-l-lg hidden md:block"
            />
          </div>
          <div className="flex flex-col gap-5 items-center justify-center p-5">
          
            <div className="flex justify-center items-center">
              <button
                onClick={handleSignInWithGoogle}
                className="flex items-center p-2 bg-white text-primary-color rounded-md shadow-md hover:shadow-lg"
                disabled={loading}
              >
                <FaGoogle className="text-xl mr-2" />
                <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>
            </div>
            {authError && <p className="text-red-500">{authError}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
