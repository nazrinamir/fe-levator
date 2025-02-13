import React from 'react';

const handleClick = () => {
  console.log('clicked');
}

function Toast({ message, isVisible,handleClick }) {
  return (
    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[200]
      transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-yellow-500">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-yellow-500 font-mono">{message}</span>
        </div>
      </div>
    </div>
  );
}

export default Toast; 