import React from 'react';
import ElevatorButton from './ElevatorButton';

function ElevatorNav({ handlePageChange, currentPage, onEmergencyStop }) {
  const floors = [
    { path: '/blog', floor: '5F' },
    { path: '/contact', floor: '4F' },
    { path: '/services', floor: '3F' },
    { path: '/about', floor: '2F' },
    { path: '/', floor: '1F' }
  ];

  return (
    <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-lg p-4 shadow-xl z-50">
      <div className='flex gap-2 items-end'>
        <div className="flex flex-col space-y-4">
          {floors.map(({ path, floor }) => (
            <ElevatorButton
              key={path}
              to={path}
              floor={floor}
              onClick={() => handlePageChange(path)}
              currentPage={currentPage}
            />
          ))}
        </div>
        <div className='border-2 border-gray-700 rounded-lg h-full flex items-center justify-center'>
          <button 
            onClick={onEmergencyStop}
            className='bg-green-600 border-2 border-gray-700 rounded-lg p-1 w-10 h-10 hover:bg-green-700 transition-colors duration-300'
          >
            <span className="sr-only">Emergency Stop</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default ElevatorNav; 