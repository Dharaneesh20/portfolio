import { motion } from 'framer-motion'
import { FaAws, FaReact, FaNodeJs, FaDocker, FaMicrosoft } from 'react-icons/fa'
import { SiMongodb, SiKubernetes, SiTerraform } from 'react-icons/si'

const Home = () => {
  const skills = [
    { icon: FaAws, name: 'AWS', color: 'text-[#FF9900]' },
    { icon: FaMicrosoft, name: 'Azure', color: 'text-[#0078D4]' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-[#00ED64]' },
    { icon: SiKubernetes, name: 'Kubernetes', color: 'text-[#326CE5]' },
    { icon: FaReact, name: 'React', color: 'text-[#61DAFB]' },
    { icon: FaNodeJs, name: 'Node.js', color: 'text-[#339933]' },
    { icon: FaDocker, name: 'Docker', color: 'text-[#2496ED]' },
    { icon: SiTerraform, name: 'Terraform', color: 'text-[#7B42BC]' },
  ]

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -left-40 w-80 h-80 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary-light/10 dark:bg-secondary-dark/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl">
          {/* Left Side - Text Content */}
          <div className="text-left order-2 md:order-1">
            <motion.div
              animate={floatingAnimation}
            >
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Hi, I'm{' '}
                <motion.span 
                  className="gradient-text inline-block"
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  Dharaneesh RS
                </motion.span>
              </motion.h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6"
            >
              Cloud Developer & Solutions Architect
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg mb-8 text-gray-700 dark:text-gray-300"
            >
              Specializing in AWS, Azure, and MongoDB solutions. 
              Passionate about building scalable cloud infrastructure and modern applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View My Work
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="order-1 md:order-2 flex justify-center"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border rings */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -inset-4 bg-gradient-to-r from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark rounded-full opacity-75 blur-lg"
              />
              
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -inset-2 bg-gradient-to-r from-secondary-light via-primary-light to-secondary-light dark:from-secondary-dark dark:via-primary-dark dark:to-secondary-dark rounded-full opacity-50 blur"
              />

              {/* Profile Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <motion.img
                  src="/images/profile.jpg"
                  alt="Dharaneesh RS - Cloud Developer"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary-light/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                  whileHover={{ opacity: 1 }}
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border-2 border-primary-light dark:border-primary-dark"
              >
                <FaAws className="text-3xl text-[#FF9900]" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border-2 border-secondary-light dark:border-secondary-dark"
              >
                <SiMongodb className="text-3xl text-[#00ED64]" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-1/2 -right-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border-2 border-blue-500"
              >
                <FaMicrosoft className="text-3xl text-[#0078D4]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20"
      >
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.3 }
              }}
              className="card text-center relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.5 }}
              />
              
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="relative z-10"
              >
                <skill.icon className={`text-5xl ${skill.color} mx-auto mb-4`} />
              </motion.div>
              
              <h3 className="font-semibold relative z-10">{skill.name}</h3>
              
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card text-center bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white relative overflow-hidden"
        >
          {/* Animated particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                x: [0, Math.random() * 400 - 200],
                y: [0, Math.random() * 200 - 100],
                scale: [1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-4 relative z-10"
          >
            Let's Build Something Amazing Together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            transition={{ delay: 0.4 }}
            className="text-lg mb-8 relative z-10"
          >
            I'm always open to discussing new projects and opportunities.
          </motion.p>
          
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.6 }}
            className="bg-white text-primary-light dark:text-primary-dark px-8 py-3 rounded-lg font-semibold inline-block relative z-10"
          >
            Start a Conversation
          </motion.a>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Home
