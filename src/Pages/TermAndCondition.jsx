import React from 'react';

const TermAndCondition = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center mt-5 font-Raleway'>
      <h1 className=' text-4xl text-primary-color font-semibold'>
        Terms and Conditions
      </h1>
      <div className='flex flex-col gap-5 items-start p-5 w-[80vw]  bg-zinc-50'>
        <h1 className=' font-semibold'>Introduction :</h1>
        <p className='text-sm text-left'>
          Welcome to Shraddha Jeweller’s eCommerce website is
          saishraddhajewellers@gmail.com! These Terms and Conditions govern your
          use of our website located as Shraddha Jeweller’s eCommerce website is
          saishraddhajewellers@gmail.com (the "Site") and any purchases you make
          through the Site. By accessing or using the Site, you agree to be
          bound by these Terms and Conditions.
        </p>
        <h1 className=' font-semibold'>Products and Services :</h1>
        <p className='text-sm text-left'>
          Our jewellery products displayed on the Site are subject to
          availability and may be available exclusively online through the Site.
          These products may have limited quantities and are subject to return
          or exchange only according to our Return Policy.
        </p>
        <p className='text-sm text-left'>
          We reserve the right, but are not obligated, to limit the sales of our
          products or services to any person, geographic region, or
          jurisdiction. We may exercise this right on a case-by-case basis.
        </p>
        <h1 className=' font-semibold'>Pricing and Payment :</h1>
        <p className='text-sm text-left '>
          Prices for our products are subject to change without notice.{' '}
        </p>
        <p className='text-sm text-left '>
          We reserve the right to refuse or cancel any order placed for a
          product listed at an incorrect price. We may, in our sole discretion,
          limit or cancel quantities purchased per person, per household, or per
          order.
        </p>

        <h1 className=' font-semibold'>User Accounts :</h1>
        <p className='text-sm text-left '>
          You may be required to create an account with us to access certain
          features of the Site.
        </p>
        <p className='text-sm text-left '>
          You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your computer. You
          agree to accept responsibility for all activities that occur under
          your account or password.
        </p>

        <h1 className=' font-semibold'>Intellectual Property :</h1>
        <p className='text-sm'>
          The Site and its original content, features, and functionality are
          owned by Shraddha Jeweller’s eCommerce website is
          saishraddhajewellers@gmail.com and are protected by international
          copyright, trademark, patent, trade secret, and other intellectual
          property or proprietary rights laws.
        </p>
        <h1 className=' font-semibold'>Governing Law :</h1>
        <p className='text-sm'>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of Shraddha Jeweller’s eCommerce website is
          saishraddhajewellers@gmail.com without regard to its conflict of law
          provisions.{' '}
        </p>

        <h1 className=' font-semibold'>Changes :</h1>
        <p className=' text-sm'>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms and Conditions at any time. If a revision is material, we
          will try to provide at least 3 days' notice prior to any new terms
          taking effect. What constitutes a material change will be determined
          at our sole discretion.
        </p>

        <h1 className=' font-semibold'>Contact Us :</h1>
        <p className='text-sm text-pretty'>
          If you have any questions about these Terms and Conditions, please
          contact us <br /> at Marwadi Galli, 314, Nehru Rd, Vijay Nagar,
          Bhagur, Maharashtra 422502 or email at <br />{' '}
          saishraddhajewellers@gmail.com
        </p>
      </div>
    </div>
  );
};

export default TermAndCondition;
