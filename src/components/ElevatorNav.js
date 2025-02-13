import React, { useState, useEffect } from "react";
import ElevatorButton from "./ElevatorButton";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

function ElevatorNav({
  handlePageChange,
  currentPage,
  onCardScan,
  currentFloor,
  doorsOpen,
  accessCards,
  cardColors
}) {
  const [displayFloor, setDisplayFloor] = useState(currentFloor);
  const [isMoving, setIsMoving] = useState(false);
  const floors = [
    { path: "/blog", floor: "5F", requiresAccess: true, accessLevel: 5 },
    { path: "/contact", floor: "4F", requiresAccess: true, accessLevel: 4 },
    { path: "/services", floor: "3F", requiresAccess: true, accessLevel: 3 },
    { path: "/about", floor: "2F", requiresAccess: false },
    { path: "/", floor: "1F", requiresAccess: false },
    { path: "/exit", floor: "GF", requiresAccess: false }
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

  // Format display floor number
  const getDisplayFloor = (floor) => {
    return floor === 0 ? 'G' : floor;
  };

  return (
    <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-lg p-4 shadow-xl z-[150]">
      {/* Floor Number */}
      <div className="w-full bg-gray-700 p-2 rounded-lg text-center text-xl mb-4 h-12 flex items-center justify-center overflow-hidden">
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
            {getDisplayFloor(displayFloor)}
            <span className="ml-2 text-gray-400">
              {getArrowDirection(displayFloor)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            {floors.map(({ path, floor, requiresAccess, accessLevel }) => (
              <ElevatorButton
                key={path}
                to={path}
                floor={floor}
                onClick={() => handlePageChange(path)}
                currentPage={currentPage}
                isLocked={requiresAccess && !accessCards[`floor${accessLevel}`]}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[5, 4, 3].map(floor => (
            <button
              key={floor}
              title={accessCards[`floor${floor}`] ? `Remove Floor ${floor} Access` : `Scan Floor ${floor} Access`}
              onClick={() => onCardScan(floor)}
              className={`border-2 border-gray-700 rounded-lg p-1 w-10 h-10 transition-colors duration-300
                ${accessCards[`floor${floor}`] 
                  ? cardColors[`floor${floor}`].active 
                  : cardColors[`floor${floor}`].inactive}`}
            >
              <Icon icon="mdi:card-account-details" className="w-6 h-6" />
              <span className="sr-only">Floor {floor} Access</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default ElevatorNav;
