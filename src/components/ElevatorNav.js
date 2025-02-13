import React, { useState, useEffect } from "react";
import ElevatorButton from "./ElevatorButton";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

function ElevatorNav({
  handlePageChange,
  currentPage,
  onEmergencyStop,
  currentFloor,
  doorsOpen
}) {
  const [displayFloor, setDisplayFloor] = useState(currentFloor);
  const [isMoving, setIsMoving] = useState(false);
  const floors = [
    { path: "/blog", floor: "5F" },
    { path: "/contact", floor: "4F" },
    { path: "/services", floor: "3F" },
    { path: "/about", floor: "2F" },
    { path: "/", floor: "1F" }
  ];

  useEffect(
    () => {
      if (!doorsOpen && displayFloor !== currentFloor) {
        setIsMoving(true);
        const direction = currentFloor > displayFloor ? 1 : -1;
        const timer = setInterval(() => {
          setDisplayFloor(prev => {
            if (prev === currentFloor) {
              clearInterval(timer);
              setIsMoving(false);
              return prev;
            }
            return prev + direction;
          });
        }, 800);
        return () => clearInterval(timer);
      }
    },
    [currentFloor, displayFloor, doorsOpen]
  );

  const getArrowDirection = buttonFloor => {
    const buttonFloorNum = parseInt(buttonFloor);
    if (buttonFloorNum === displayFloor) {
      return "";
    } else if (buttonFloorNum > displayFloor) {
      return <Icon icon="bxs:up-arrow" width="24" height="24" />;
    } else {
      return (
        <Icon
          className="rotate-180"
          icon="bxs:down-arrow"
          width="24"
          height="24"
        />
      );
    }
  };

  return (
    <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-lg p-4 shadow-xl z-[150]">
      {/* Floor Number */}
      <div className="w-full bg-gray-700 p-2 rounded-lg text-center mb-4 h-12 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayFloor}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-yellow-500 font-mono ${isMoving
              ? "animate-pulse"
              : ""}`}
          >
            {displayFloor}
            <span className="ml-2 text-gray-400">
              {getArrowDirection(displayFloor)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex  gap-2 items-end">
        <div className="flex flex-col space-y-4">
          {/* Elevator Buttons */}
          <div className="flex flex-col space-y-2">
            {floors.map(({ path, floor }) =>
              <ElevatorButton
                key={path}
                to={path}
                floor={floor}
                onClick={() => handlePageChange(path)}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
        <div className="border-2 border-gray-700 rounded-lg h-full flex items-center justify-center">
          <button
            onClick={onEmergencyStop}
            className="bg-green-600 border-2 border-gray-700 rounded-lg p-1 w-10 h-10 hover:bg-green-700 transition-colors duration-300"
          >
            <span className="sr-only">Emergency Stop</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default ElevatorNav;
