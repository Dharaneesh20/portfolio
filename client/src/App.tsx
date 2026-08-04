import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Certifications from './pages/Certifications'
import GitHub from './pages/GitHub'
import Blog from './pages/Blog'
import CV from './pages/CV'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import CodingProgress from './pages/CodingProgress'
import Insights from './pages/Insights'
import DottedBg2 from './components/ui/DottedBg2'
import { usePageTracking } from './hooks/usePageTracking'

import NotFoundPage from './pages/NotFoundPage'

function AppContent() {
  usePageTracking();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col relative bg-white dark:bg-[#030712] text-foreground transition-colors duration-300">
      {/* Global Interactive Chromatic Waves Shader Background — Active in both Light and Dark Themes */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70 dark:opacity-55 transition-opacity duration-700">
        <DottedBg2
          frequency={1}
          speed={0.8}
          bgColor={theme === 'dark' ? '#030712' : '#ffffff'}
          cellSize={12}
          gamma={7}
          paletteBias={-5}
          colors={["#1e3a8a", "#2563eb", "#3b82f6", "#4f46e5", "#6366f1", "#8b5cf6", "#a855f7", "#c084fc"]}
          interactive={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen w-full bg-transparent">
        <Navbar />
        <main className="flex-grow bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/coding-progress" element={<CodingProgress />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </ThemeProvider>
  )
}

export default App
