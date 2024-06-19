import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, selectUser, selectAuthError, selectLoading, setUser } from '../features/Auth/authSlice';
import ProfileDetails from './ProfileDetails';

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
            <h1 className="text-3xl font-semibold text-primary-color">Login Or Signup</h1>
            <div className="flex justify-center items-center">
              <button
                onClick={handleSignInWithGoogle}
                className="p-2 bg-primary-color text-white rounded-md"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in with Google'}
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
