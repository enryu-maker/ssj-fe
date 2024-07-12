import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './SpinWheel.css'; // Add custom styles if needed

const SpinWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState('');

  const data = [
    { option: 'Prize 1' },
    { option: 'Prize 2' },
    { option: 'Prize 3' },
    { option: 'Prize 4' },
    { option: 'Prize 5' },
    { option: 'Prize 6' },
  ];

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setSelectedPrize(data[prizeNumber].option);
    setMustSpin(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="relative flex flex-col items-center gap-5">
        {/* Arrow */}
        <div className="absolute top-1/2 transform -translate-y-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <div className="arrow"></div>
            <div className="arrow-center"></div>
          </div>
        </div>

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
          backgroundColors={['#FFD700', '#FF6347']}
          textColors={['#000000']}
          outerBorderColor={'#000000'}
          outerBorderWidth={10}
          radiusLineColor={'#000000'}
          radiusLineWidth={6}
          fontSize={16}
          perpendicularText={true}
        />

        <button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50"
          onClick={handleSpinClick}
          disabled={mustSpin}
        >
          Spin
        </button>

        {selectedPrize && (
          <div className="mt-8 text-2xl font-bold text-primary-color">
            🎉 Congratulations! You won: {selectedPrize} 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
