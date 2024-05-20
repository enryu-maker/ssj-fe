import React from 'react';
import { UsefulLinks } from '../data';
import { Information } from '../data';
import { GoMail } from 'react-icons/go';
import { BsTelephone } from 'react-icons/bs';
import { CiChat1 } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className=' mt-10 bg-secondary-color font-Raleway  '>
        <div className='grid grid-cols-3 '>
          <div className=' mt-20 px-10 '>
            <h1 className=' text-xl mb-10 text-primary-color font-semibold'>
              Useful Links
            </h1>
            <div className=' flex flex-col gap-8'>
              {UsefulLinks.map((items, index) => (
                <a
                  href={items.link}
                  key={index}
                  className=' text-xl'>
                  {items.name}
                </a>
              ))}
            </div>
          </div>
          <div className='mt-20'>
            <h1 className=' text-xl mb-10 text-primary-color font-semibold'>
              Information
            </h1>
            <div className=' flex flex-col gap-8'>
              {Information.map((items, index) => (
                <a
                  href={items.link}
                  key={index}
                  className=' text-xl'>
                  {items.name}
                </a>
              ))}
            </div>
          </div>
          <div className='mt-20'>
            <h1 className=' text-xl mb-10 text-primary-color font-semibold'>
              Contact Us
            </h1>
            <div className=' flex flex-col gap-8'>
              <div className=' flex items-center gap-3 text-xl'>
                <GoMail className=' text-3xl' />
                <a href='#/'>Write to Us</a>
              </div>
              <div className=' flex items-center gap-3 text-xl'>
                <BsTelephone className=' text-3xl' />
                <a href='#/'>1234567890</a>
              </div>
              <div className=' flex items-center gap-3 text-xl'>
                <CiChat1 className=' text-3xl' />
                <a href='#/'>Chat with Us</a>
              </div>
            </div>
          </div>
        </div>
        <div className=' bg-secondary-color font-Raleway mt-5 px-10 text-primary-color py-2 flex flex-col gap-1 items-center justify-end'>
          <p className='text-sm'>
            &copy; {new Date().getFullYear()} SSJ Company Limited. All Rights
            Reserved.
          </p>
          <div className='flex gap-2'>
            <Link
              to='/privacy-policy'
              className=' text-sm hover:font-semibold'>
              Terms & Conditions |
            </Link>
            <Link
              to='/privacy-policy'
              className='text-sm hover:font-semibold '>
              Privacy Policy |
            </Link>
            <Link
              to='/privacy-policy'
              className=' text-sm hover:font-semibold'>
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
