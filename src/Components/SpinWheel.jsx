import React, { useState } from 'react';
import './SpinWheel.css';

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState('');
  const [showFirecracker, setShowFirecracker] = useState(false);
  const segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'];
  const segmentAngle = 360 / segments.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const newRotation = rotation + Math.floor(Math.random() * 5000) + 360 * 5;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalizedRotation = newRotation % 360;
      const segmentIndex = Math.floor((normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
      setSelectedPrize(segments[segmentIndex]);

      // Trigger firecracker animation
      setShowFirecracker(true);
      setTimeout(() => setShowFirecracker(false), 2000); 
    }, 5000); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Spin Wheel */}
      <div className="relative">
        <div
          className={`relative w-96 h-96 rounded-full border-4 border-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 overflow-hidden transition-transform duration-[5000ms] ease-out`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="absolute w-1/2 h-1/2 bg-gradient-to-r from-yellow-500 to-red-500 text-white flex items-center justify-center"
              style={{
                transformOrigin: '100% 100%',
                transform: `rotate(${index * segmentAngle}deg)`,
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
              >
                {segment}
              </div>
            </div>
          ))}
        </div>

        {/* Firecracker Animation */}
        {showFirecracker && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="firecracker"></div>
          </div>
        )}

        {/* Spin Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50 border-4 border-gray-300"
            onClick={spin}
            disabled={spinning}
          >
            Spin
          </button>
        </div>

        {/* Arrow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-red-600"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-100 w-3 h-3 rounded-full"></div>
          </div>
        </div>
      </div>

      {selectedPrize && (
        <div className="mt-8 text-2xl font-bold text-green-500">
          🎉 Congratulations! You won: {selectedPrize} 🎉
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
