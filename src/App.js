import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4 px-2">
                  <Link to="/" className="text-gray-800 text-lg font-semibold hover:text-gray-600">Logo</Link>
                </div>
                <div className="flex items-center space-x-1">
                  <Link to="/" className="py-4 px-2 text-gray-500 hover:text-gray-900">Home</Link>
                  <Link to="/about" className="py-4 px-2 text-gray-500 hover:text-gray-900">About</Link>
                  <Link to="/services" className="py-4 px-2 text-gray-500 hover:text-gray-900">Services</Link>
                  <Link to="/contact" className="py-4 px-2 text-gray-500 hover:text-gray-900">Contact</Link>
                  <Link to="/blog" className="py-4 px-2 text-gray-500 hover:text-gray-900">Blog</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
