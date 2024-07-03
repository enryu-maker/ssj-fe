import React from 'react';
import { UsefulLinks } from '../data';
import { Information } from '../data';
import { GoMail } from 'react-icons/go';
import { BsTelephone } from 'react-icons/bs';
import { CiChat1 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="mt-10 bg-secondary-color font-Raleway">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="mt-10 sm:mt-20">
            <h1 className="text-xl mb-6 sm:mb-10 text-primary-color font-semibold">Useful Links</h1>
            <div className="flex flex-col gap-2 sm:gap-4">
              {UsefulLinks.map((item, index) => (
                <Link to={item.link} key={index} className="text-lg md:text-xl hover:text-primary-color">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 sm:mt-20">
            <h1 className="text-xl mb-6 sm:mb-10 text-primary-color font-semibold">Information</h1>
            <div className="flex flex-col gap-2 sm:gap-4">
              {Information.map((item, index) => (
                <a href={item.link} key={index} className="text-lg md:text-xl hover:text-primary-color">
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-10 sm:mt-20">
            <h1 className="text-xl mb-6 sm:mb-10 text-primary-color font-semibold">Contact Us</h1>
            <div className="flex flex-col gap-2 sm:gap-4">
              <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
                <GoMail className="text-xl md:text-3xl" />
                <a href="mailto:saishraddhajewellers@gmail.com" className="hover:text-primary-color">Write to Us</a>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
                <BsTelephone className="text-xl md:text-3xl" />
                <a href="tel:+918446349063" className="hover:text-primary-color">+91 84463 49063</a>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
                <CiChat1 className="text-xl md:text-3xl" />
                <Link to="/contacts" className="hover:text-primary-color">Chat with Us</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-20">
            <h1 className="text-xl mb-6 sm:mb-10 text-primary-color font-semibold">Social Links</h1>
            <div className="flex flex-col gap-2 sm:gap-4">
              <a href="https://www.instagram.com/saishraddhajewellersofficial/" className="flex items-center gap-2 text-lg md:text-xl hover:text-primary-color">
                <FaInstagram className="text-xl md:text-3xl" />
                Instagram
              </a>
              <a href="https://www.facebook.com/saishraddhajewellersofficial/" className="flex items-center gap-2 text-lg md:text-xl hover:text-primary-color">
                <FaFacebook className="text-xl md:text-3xl" />
                Facebook
              </a>
              <a href="https://www.youtube.com/channel/UCkkAllN-8Xr3n4aRjBxpfIA" className="flex items-center gap-2 text-lg md:text-xl hover:text-primary-color">
                <FaYoutube className="text-xl md:text-3xl" />
                YouTube
              </a>
              <a href="https://wa.me/+918446349063" className="flex items-center gap-2 text-lg md:text-xl hover:text-primary-color">
                <FaWhatsapp className="text-xl md:text-3xl" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-2 text-primary-color flex flex-col items-center">
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
