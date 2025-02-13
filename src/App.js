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
  const nodeRef = useRef(null);

  const handlePageChange = (to) => {
    const floorNumber = to === '/' ? '1' : to.split('/')[1].charAt(0).toUpperCase();
    setToastMessage(`Moving to Floor ${floorNumber}`);
    setShowToast(true);
    setDoorsOpen(false);
    
    setTimeout(() => {
      setCurrentPage(to);
      setTimeout(() => {
        setDoorsOpen(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleEmergencyStop = () => {
    setToastMessage("Emergency Stop Activated!");
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
        />

        {/* Content Area */}
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
