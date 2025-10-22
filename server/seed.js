import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from './models/Project.js'
import Certification from './models/Certification.js'
import BlogPost from './models/BlogPost.js'
import CV from './models/CV.js'

dotenv.config({ path: '../.env' })

const sampleProjects = [
  {
    title: 'AWS Cloud Infrastructure Automation',
    description: 'Automated cloud infrastructure deployment using Terraform and AWS CloudFormation. Implemented CI/CD pipelines for seamless deployment.',
    technologies: ['AWS', 'Terraform', 'CloudFormation', 'Python', 'Lambda'],
    cloudProvider: 'aws',
    status: 'completed',
    githubUrl: 'https://github.com/Dharaneesh20',
  },
  {
    title: 'Azure Kubernetes Deployment',
    description: 'Containerized microservices application deployed on Azure Kubernetes Service with automated scaling and monitoring.',
    technologies: ['Azure', 'Kubernetes', 'Docker', 'Helm', 'Prometheus'],
    cloudProvider: 'azure',
    status: 'ongoing',
  },
  {
    title: 'MongoDB Atlas Migration Tool',
    description: 'Built a migration tool to seamlessly transfer data from on-premise MongoDB to MongoDB Atlas with zero downtime.',
    technologies: ['MongoDB', 'Node.js', 'Python', 'Atlas'],
    cloudProvider: 'mongodb',
    status: 'completed',
  },
]

const sampleCertifications = [
  {
    title: 'MongoDB Certified Associate Atlas Administrator',
    issuer: 'MongoDB',
    date: new Date('2024-01-15'),
    cloudProvider: 'mongodb',
    description: 'Demonstrates proficiency in MongoDB Atlas cloud database management, security, and optimization.',
    credentialUrl: 'https://www.mongodb.com/certification',
  },
  {
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    date: new Date('2023-08-20'),
    cloudProvider: 'aws',
    description: 'Validates expertise in designing distributed systems on AWS with a focus on scalability and cost optimization.',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    title: 'Microsoft Azure Administrator Associate',
    issuer: 'Microsoft',
    date: new Date('2023-11-10'),
    cloudProvider: 'azure',
    description: 'Demonstrates skills in implementing, managing, and monitoring Azure environments.',
    credentialUrl: 'https://learn.microsoft.com/certifications/',
  },
]

const sampleBlogPosts = [
  {
    title: 'My Journey to MongoDB Certification',
    content: 'Sharing my experience preparing for and passing the MongoDB Atlas Administrator certification. Key topics, study resources, and tips for success...',
    excerpt: 'A comprehensive guide to preparing for MongoDB Atlas Administrator certification, including study tips and resources.',
    author: 'Dharaneesh RS',
    date: new Date('2024-02-01'),
    cloudProvider: 'mongodb',
    tags: ['MongoDB', 'Certification', 'Cloud', 'Database'],
  },
  {
    title: 'Building Serverless Applications with AWS Lambda',
    content: 'Exploring the power of serverless architecture using AWS Lambda. Learn how to build scalable, cost-effective applications...',
    excerpt: 'A practical guide to building serverless applications using AWS Lambda, API Gateway, and DynamoDB.',
    author: 'Dharaneesh RS',
    date: new Date('2024-01-15'),
    cloudProvider: 'aws',
    tags: ['AWS', 'Serverless', 'Lambda', 'Cloud Architecture'],
  },
  {
    title: 'Azure DevOps: CI/CD Best Practices',
    content: 'Implementing continuous integration and deployment pipelines on Azure DevOps. Best practices for automation and testing...',
    excerpt: 'Learn how to set up efficient CI/CD pipelines using Azure DevOps with real-world examples.',
    author: 'Dharaneesh RS',
    date: new Date('2023-12-20'),
    cloudProvider: 'azure',
    tags: ['Azure', 'DevOps', 'CI/CD', 'Automation'],
  },
]

const sampleCV = {
  name: 'Dharaneesh RS',
  title: 'Cloud Developer & Solutions Architect',
  summary: 'Passionate cloud developer with 3+ years of experience in designing and implementing scalable cloud solutions on AWS and Azure. MongoDB Certified Associate Atlas Administrator with a strong focus on database optimization and cloud infrastructure automation.',
  experience: [
    {
      title: 'Senior Cloud Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: [
        'Designed and implemented cloud-native applications on AWS and Azure, serving 100K+ users',
        'Led migration of monolithic applications to microservices architecture using Kubernetes',
        'Reduced infrastructure costs by 40% through optimization and automated scaling',
        'Mentored junior developers on cloud best practices and DevOps principles',
      ],
    },
    {
      title: 'Cloud Engineer',
      company: 'Digital Innovations Ltd.',
      period: '2021 - 2022',
      description: [
        'Developed serverless applications using AWS Lambda and Azure Functions',
        'Implemented CI/CD pipelines using Jenkins and Azure DevOps',
        'Managed MongoDB Atlas databases for enterprise applications',
        'Automated infrastructure provisioning using Terraform and CloudFormation',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Your University Name',
      year: '2021',
    },
  ],
  skills: [
    {
      category: 'Cloud Platforms',
      items: ['AWS', 'Microsoft Azure', 'Google Cloud Platform'],
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'DynamoDB', 'CosmosDB'],
    },
    {
      category: 'DevOps & Tools',
      items: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'Azure DevOps'],
    },
    {
      category: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Node.js', 'Bash'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Express.js', 'Flask', 'FastAPI'],
    },
  ],
  achievements: [
    'MongoDB Certified Associate Atlas Administrator (2024)',
    'AWS Certified Solutions Architect - Associate (2023)',
    'Microsoft Azure Administrator Associate (2023)',
    'Successfully migrated 50+ applications to cloud infrastructure',
    'Reduced cloud costs by 40% through optimization strategies',
    'Published technical articles on cloud architecture and best practices',
  ],
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    // Clear existing data
    await Project.deleteMany({})
    await Certification.deleteMany({})
    await BlogPost.deleteMany({})
    await CV.deleteMany({})
    console.log('Cleared existing data')

    // Insert sample data
    await Project.insertMany(sampleProjects)
    console.log('✓ Added sample projects')

    await Certification.insertMany(sampleCertifications)
    console.log('✓ Added sample certifications')

    await BlogPost.insertMany(sampleBlogPosts)
    console.log('✓ Added sample blog posts')

    await CV.create(sampleCV)
    console.log('✓ Added sample CV')

    console.log('\n✅ Database seeded successfully!')
    console.log('\nYou can now:')
    console.log('1. Run "npm run dev" to start the application')
    console.log('2. Visit http://localhost:3000 to view your portfolio')
    console.log('3. Visit http://localhost:3000/admin to manage content')
    console.log('   - Default credentials: admin / changeme123')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
