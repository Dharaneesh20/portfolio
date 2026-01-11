import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Certifications from './pages/Certifications'
import Blog from './pages/Blog'
import CV from './pages/CV'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import CodingProgress from './pages/CodingProgress'
import { initGA } from './utils/analytics'
import { usePageTracking } from './hooks/usePageTracking'

function AppContent() {
  usePageTracking();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coding-progress" element={<CodingProgress />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
      initGA(measurementId);
    } else {
      console.warn('Google Analytics Measurement ID not configured');
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
