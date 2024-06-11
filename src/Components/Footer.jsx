import React from 'react';
import { UsefulLinks } from '../data';
import { Information } from '../data';
import { GoMail } from 'react-icons/go';
import { BsTelephone } from 'react-icons/bs';
import { CiChat1 } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-10 bg-secondary-color font-Raleway">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="mt-20">
            <h1 className="text-xl mb-10 text-primary-color font-semibold">Useful Links</h1>
            <div className="flex flex-col gap-4">
              {UsefulLinks.map((item, index) => (
                <a href={item.link} key={index} className="text-lg md:text-xl hover:text-primary-color">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-20">
            <h1 className="text-xl mb-10 text-primary-color font-semibold">Information</h1>
            <div className="flex flex-col gap-4">
              {Information.map((item, index) => (
                <a href={item.link} key={index} className="text-lg md:text-xl hover:text-primary-color">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-20">
            <h1 className="text-xl mb-10 text-primary-color font-semibold">Contact Us</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-lg md:text-xl">
                <GoMail className="text-xl md:text-3xl" />
                <a href="#/" className="hover:text-primary-color">Write to Us</a>
              </div>
              <div className="flex items-center gap-3 text-lg md:text-xl">
                <BsTelephone className="text-xl md:text-3xl" />
                <a href="#/" className="hover:text-primary-color">1234567890</a>
              </div>
              <div className="flex items-center gap-3 text-lg md:text-xl">
                <CiChat1 className="text-xl md:text-3xl" />
                <a href="#/" className="hover:text-primary-color">Chat with Us</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 py-2 text-primary-color flex flex-col items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} SSJ Company Limited. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link to="/terms-and-conditions" className="hover:font-semibold transition-all ease-linear delay-75">Terms & Conditions |</Link>
            <Link to="/privacy-policy" className="hover:font-semibold transition-all ease-linear delay-75">Privacy Policy |</Link>
            <Link to="/refund-policy" className="hover:font-semibold transition-all ease-linear delay-75">Refund and Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
