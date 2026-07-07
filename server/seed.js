import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from './models/Project.js'
import Certification from './models/Certification.js'
import BlogPost from './models/BlogPost.js'
import CV from './models/CV.js'
import Insight from './models/Insight.js'

dotenv.config({ path: '../.env' })

const sampleProjects = [
  {
    title: 'MERN Stack Task Management System',
    description: 'A full-stack project management app built with React, Node.js, Express, and MongoDB, featuring real-time boards, user authentication, and task history logging.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    cloudProvider: '',
    status: 'completed',
    githubUrl: 'https://github.com/Dharaneesh20',
  },
  {
    title: 'Cloud Infrastructure Automation Lab',
    description: 'Terraform script repository designed to spin up a secure, load-balanced web app cluster in AWS VPC with multi-AZ replication, route tables, and firewalls.',
    technologies: ['Terraform', 'AWS VPC', 'EC2', 'IAM', 'Security Groups'],
    cloudProvider: 'aws',
    status: 'completed',
    githubUrl: 'https://github.com/Dharaneesh20',
  },
  {
    title: 'Platform ERP & Inventory Dashboard',
    description: 'An internal web dashboard that connects with MongoDB to monitor supply quantities, track sales transactions, and trigger email logs using AWS SES.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS SES', 'Tailwind'],
    cloudProvider: 'mongodb',
    status: 'ongoing',
    githubUrl: 'https://github.com/Dharaneesh20',
  },
]

const sampleCertifications = [
  {
    title: 'MongoDB Certified Associate Atlas Administrator',
    issuer: 'MongoDB',
    date: new Date('2024-01-15'),
    cloudProvider: 'mongodb',
    description: 'Demonstrates baseline proficiency in MongoDB Atlas cloud database management, security, and schema configuration.',
    credentialUrl: 'https://www.mongodb.com/certification',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: new Date('2023-08-20'),
    cloudProvider: 'aws',
    description: 'Validates foundational knowledge of cloud platforms, core AWS services, security, pricing, and infrastructure support.',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    title: 'Introduction to Networks (Cisco Networking Academy)',
    issuer: 'Cisco',
    date: new Date('2023-11-10'),
    cloudProvider: 'azure',
    description: 'Covers fundamental networking concepts including routing principles, Ethernet switching, subnetting, IPv4/IPv6, and Cisco IOS configuration.',
    credentialUrl: 'https://www.netacad.com/',
  },
]

const sampleBlogPosts = [
  {
    title: 'Grounded Guide to MongoDB Atlas Setup',
    content: 'A detailed walkthrough on setting up database clusters on MongoDB Atlas, creating user roles, configuring whitelist IPs, and securing connection strings in Node/MERN environment.',
    excerpt: 'Step-by-step documentation for beginners setting up MongoDB Atlas clusters for local web dev.',
    author: 'Dharaneesh RS',
    date: new Date('2024-02-01'),
    cloudProvider: 'mongodb',
    tags: ['MongoDB', 'Database', 'Cloud', 'MERN'],
  },
]

const sampleInsights = [
  {
    title: 'OWASP Top 10 Web Security Notes',
    slug: 'owasp-top-10-web-security-notes',
    excerpt: 'Grounded notes from my security research covering Cross-Site Scripting (XSS) and SQL Injection prevention in Node.js endpoints.',
    content: 'I have been exploring security fundamentals outlined by the OWASP Top 10. In my MERN development, I practiced implementing basic protective headers using Helmet, sanitizing request inputs with express-validator, and testing endpoint vulnerabilities against simulated injection attacks in a local lab.',
    category: 'learning',
    tags: ['Security', 'VAPT', 'Web Dev', 'Node.js'],
    status: 'published',
    featured: true,
    readTime: '3 min',
    publishedAt: new Date('2026-07-01')
  },
  {
    title: 'Setting up Routing Topologies in Packet Tracer',
    slug: 'setting-up-routing-topologies-packet-tracer',
    excerpt: 'Simulating a small-office LAN setup with VLAN switching, OSPF dynamic routing, and basic network access control lists.',
    content: 'To reinforce network learning concepts, I built multiple lab scenarios in Cisco Packet Tracer. I configured routing paths using OSPF, isolated traffic using VLAN tags, and setup basic inbound/outbound Access Control Lists (ACLs) on gateway routers to practice secure packet filtering.',
    category: 'learning',
    tags: ['Networking', 'Cisco Labs', 'Infrastructure'],
    status: 'published',
    featured: false,
    readTime: '4 min',
    publishedAt: new Date('2026-06-20')
  },
  {
    title: 'Shipped ERP Dashboard low-stock automation logic',
    slug: 'shipped-erp-dashboard-stock-automation-logic',
    excerpt: 'Implemented inventory check triggers in Express backed by AWS SES templates for simple vendor replenishment alerts.',
    content: 'Added a simple automation helper script inside the MERN ERP codebase. When stock numbers cross below a configured threshold, the backend calls AWS SES to trigger transactional notification template emails. Tested and integrated safely with the Atlas MongoDB database.',
    category: 'project-update',
    tags: ['Full-Stack', 'MongoDB', 'AWS SES', 'Automation'],
    status: 'published',
    featured: false,
    readTime: '2 min',
    publishedAt: new Date('2026-06-15')
  }
]

const sampleCV = {
  name: 'Dharaneesh RS',
  title: 'Full-Stack Developer & Cloud Enthusiast',
  summary: 'Student engineer and builder specializing in React, Node.js, Express, and MongoDB. Enthusiastic about cloud architectures, network protocols, VAPT concepts, and building robust automation scripts.',
  experience: [
    {
      title: 'Full-Stack Developer Intern',
      company: 'Digital Solutions Ltd.',
      period: '2024 - Present',
      description: [
        'Built dynamic React dashboards and REST APIs in Node.js connected with MongoDB',
        'Helped configure AWS cloud development servers and basic automated logging',
        'Implemented security checkups on Express endpoints protecting against typical SQLi inputs'
      ],
    },
    {
      title: 'Web Development Intern',
      company: 'Tech Startup Hub',
      period: '2023 - 2024',
      description: [
        'Assisted in design and implementation of clean interfaces and forms in React applications',
        'Wrote basic database schemas and setup cron scripts for auto database backup'
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Your University Name',
      year: '2025',
    },
  ],
  skills: [
    {
      category: 'Full-Stack',
      items: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'JavaScript'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['AWS Basics', 'Azure Foundations', 'Terraform', 'Docker', 'VPC Routing'],
    },
    {
      category: 'Networking & Security',
      items: ['Cisco iOS Basics', 'Packet Tracer Labs', 'VAPT Concepts', 'OWASP Top 10 Learning'],
    },
  ],
  achievements: [
    'MongoDB Certified Associate Atlas Administrator',
    'AWS Certified Cloud Practitioner',
    'Simulated 10+ enterprise network topologies in Cisco labs',
    'Built multiple full-stack platforms and utility scripts'
  ],
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    await Project.deleteMany({})
    await Certification.deleteMany({})
    await BlogPost.deleteMany({})
    await CV.deleteMany({})
    await Insight.deleteMany({})
    console.log('Cleared existing data')

    await Project.insertMany(sampleProjects)
    console.log('✓ Added sample projects')

    await Certification.insertMany(sampleCertifications)
    console.log('✓ Added sample certifications')

    await BlogPost.insertMany(sampleBlogPosts)
    console.log('✓ Added sample blog posts')

    await Insight.insertMany(sampleInsights)
    console.log('✓ Added sample insights')

    await CV.create(sampleCV)
    console.log('✓ Added sample CV')

    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
