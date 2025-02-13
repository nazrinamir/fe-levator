import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useState, useRef } from 'react';
import ElevatorNav from './components/ElevatorNav';
import Toast from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import './elevator.css';
import './styles/fonts.css';

function App() {
  const [doorsOpen, setDoorsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('/');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [accessCards, setAccessCards] = useState({
    floor3: false,
    floor4: false,
    floor5: false
  });
  const nodeRef = useRef(null);

  const cardColors = {
    floor3: { inactive: 'bg-green-600 hover:bg-green-700', active: 'bg-green-500 hover:bg-green-600' },
    floor4: { inactive: 'bg-blue-600 hover:bg-blue-700', active: 'bg-blue-500 hover:bg-blue-600' },
    floor5: { inactive: 'bg-purple-600 hover:bg-purple-700', active: 'bg-purple-500 hover:bg-purple-600' }
  };

  const getFloorNumber = (path) => {
    if (path === '/') return 1;
    const floorMap = {
      '/about': 2,
      '/services': 3,
      '/contact': 4,
      '/blog': 5
    };
    return floorMap[path];
  };

  const calculateTravelTime = (fromFloor, toFloor) => {
    const floorDifference = Math.abs(fromFloor - toFloor);
    const baseTime = 1000; // Base time for one floor
    return baseTime * floorDifference;
  };

  const handlePageChange = (to) => {
    const targetFloor = getFloorNumber(to);
    
    // Check floor access
    if (targetFloor > 2) {
      const floorAccess = `floor${targetFloor}`;
      if (!accessCards[floorAccess]) {
        setToastMessage(`Access Denied: Floor ${targetFloor} Restricted. Please scan appropriate access card.`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        return;
      }
    }

    const travelTime = calculateTravelTime(currentFloor, targetFloor);
    setToastMessage(`Moving from Floor ${currentFloor} to Floor ${targetFloor}`);
    setShowToast(true);
    setDoorsOpen(false);
    
    setTimeout(() => {
      setCurrentFloor(targetFloor);
      setTimeout(() => {
        setCurrentPage(to);
        setTimeout(() => {
          setDoorsOpen(true);
          setTimeout(() => {
            setShowToast(false);
          }, 1000);
        }, 1000);
      }, travelTime);
    }, 1000);
  };

  const handleCardScan = (floor) => {
    const floorAccess = `floor${floor}`;
    setAccessCards(prev => {
      const newAccess = { ...prev };
      newAccess[floorAccess] = !prev[floorAccess];
      return newAccess;
    });

    setToastMessage(
      accessCards[floorAccess] 
        ? `Access Card Removed: Floor ${floor} Locked`
        : `Access Card Scanned: Floor ${floor} Unlocked`
    );
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const showCustomToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900">
        <Toast message={toastMessage} isVisible={showToast} />
        <ElevatorNav 
          handlePageChange={handlePageChange} 
          currentPage={currentPage}
          onCardScan={handleCardScan}
          currentFloor={currentFloor}
          doorsOpen={doorsOpen}
          accessCards={accessCards}
          cardColors={cardColors}
        />
        <div className="flex-1 ml-32 relative">
          <AnimatedRoutes 
            nodeRef={nodeRef} 
            currentPage={currentPage} 
            showToast={showCustomToast}
          />
        </div>
        <div className={`elevator-doors ${doorsOpen ? 'doors-open' : ''}`}>
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      </div>
    </Router>
  );
}

function AnimatedRoutes({ nodeRef, currentPage, showToast }) {
  return (
    <div className="elevator-container">
      <SwitchTransition>
        <CSSTransition
          key={currentPage}
          nodeRef={nodeRef}
          timeout={0}
          classNames="elevator"
        >
          <div ref={nodeRef} className="elevator-page">
            <Routes location={{ pathname: currentPage }}>
              <Route path="/" element={<Home showToast={showToast} />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
