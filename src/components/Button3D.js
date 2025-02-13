import React from 'react';
import { motion } from 'framer-motion';

function Button3D({ children, onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ translateY: -2 }}
      whileTap={{ translateY: 2 }}
      className={`
        relative 
        bg-yellow-500 
        text-black 
        px-6 
        py-3 
        rounded-md 
        text-xl 
        font-semibold
        transition-all 
        duration-150
        shadow-[0_6px_0_0_#b45309]
        hover:shadow-[0_4px_0_0_#b45309]
        active:shadow-[0_2px_0_0_#b45309]
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default Button3D; 