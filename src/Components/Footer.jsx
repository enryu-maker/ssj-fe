import React from 'react';
import { UsefulLinks } from '../data';
import { Information } from '../data';
import { GoMail } from 'react-icons/go';
import { BsTelephone } from 'react-icons/bs';
import { CiChat1 } from 'react-icons/ci';

const Footer = () => {
  return (
    <>
      <div className='grid grid-cols-3  mt-10 bg-secondary-color font-Raleway  '>
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
    </>
  );
};

export default Footer;
