import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white/40 dark:bg-[#030712]/60 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/50 py-8 mt-16 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              Developed by Dharaneesh RS
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              © {currentYear} All rights reserved
            </p>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="https://github.com/Dharaneesh20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/dharaneeshrs-clouddev/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
