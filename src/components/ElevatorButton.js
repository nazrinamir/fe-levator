import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react/dist/iconify.js';

function ElevatorButton({ to, floor, onClick, currentPage, isLocked }) {
  const isActive = currentPage === to;

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <Link to={to} onClick={handleClick}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 
          ${isActive 
            ? 'bg-yellow-500 text-gray-900' 
            : isLocked
              ? 'bg-red-900/50 text-gray-400 cursor-not-allowed'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
      >
        <div className="w-8 h-8 flex items-center justify-center border-2 border-current rounded-full">
          {floor}
        </div>
        {isLocked && <Icon icon="mdi:lock" className="w-4 h-4" />}
      </motion.div>
    </Link>
  );
}

export default ElevatorButton; 