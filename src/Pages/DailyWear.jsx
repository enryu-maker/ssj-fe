import React from 'react';

const DailyWear = () => {
  return (
    <div className='flex flex-col items-center  mt-3 font-Raleway  '>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className=' text-6xl font-semibold text-primary-color'>
          New Arrivals
        </h1>
        <p className=' text-lg text-gray-700'>At SSJ this week</p>
      </div>
      <div className='md:grid md:grid-rows-3 md:grid-flow-col gap-4 mt-5 flex flex-col px-5 '>
        <div className='md:row-span-3  ...'>
          <img
            src='https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/new-arrivals/Earrings-Glam%20days-Desktop.jpg'
            alt=''
            className='rounded-md '
          />
        </div>
        <div className='md:col-span-2 ... '>
          <img
            src='https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/new-arrivals/under50k-desktop.jpg'
            alt=''
            className='rounded-md md:w-[326px] md:h-[326px] w-full h-[300px] object-cover'
          />
        </div>
        <div className='md:row-span-2 col-span-2 ...'>
          <div className='flex flex-col gap-2 items-center justify-center md:w-[326px] w-full md:h-[326px] h-[300px] shadow-sm border border-primary-color rounded-md'>
            <h1 className='text-center text-5xl font-semibold text-primary-color'>
              5,028
            </h1>
            <p className=' text-center text-lg '>
              Customers adored our daily wear collection!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWear;
