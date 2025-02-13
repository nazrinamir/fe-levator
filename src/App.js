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

function App() {
  const [doorsOpen, setDoorsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('/');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const nodeRef = useRef(null);

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
    const travelTime = calculateTravelTime(currentFloor, targetFloor);
    
    setToastMessage(`Moving from Floor ${currentFloor} to Floor ${targetFloor}`);
    setShowToast(true);
    setDoorsOpen(false);
    
    setTimeout(() => {
      setCurrentPage(to);
      setCurrentFloor(targetFloor);
      setTimeout(() => {
        setDoorsOpen(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      }, 1000);
    }, travelTime);
  };

  const handleEmergencyStop = () => {
    setToastMessage(`Emergency Stop at Floor ${currentFloor}!`);
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
          onEmergencyStop={handleEmergencyStop}
          currentFloor={currentFloor}
        />
        <div className="flex-1 ml-32 relative">
          <AnimatedRoutes nodeRef={nodeRef} currentPage={currentPage} />
        </div>
        <div className={`elevator-doors ${doorsOpen ? 'doors-open' : ''}`}>
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      </div>
    </Router>
  );
}

function AnimatedRoutes({ nodeRef, currentPage }) {
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
              <Route path="/" element={<Home />} />
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
