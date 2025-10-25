# Dharaneesh RS - Portfolio

A modern, professional portfolio website for showcasing cloud development projects, certifications, blog posts, and CV. Built with React, Node.js, and MongoDB, deployable on Vercel for free.

## 🚀 Features

- **Modern & Responsive Design**: Fully responsive with smooth animations using Framer Motion
- **Dark/Light Theme**: Toggle between dark and light themes with persistent storage
- **Dynamic Content Management**: Admin panel to manage projects, certifications, and blog posts
- **Cloud Provider Logos**: Automatic display of cloud provider logos (AWS, Azure, MongoDB, Red Hat, Kubernetes)
- **Project Showcase**: Display completed, ongoing, and upcoming projects
- **Certifications Gallery**: Showcase your professional certifications
- **Blog/Events**: Share your cloud journey and achievements
- **CV Management**: Maintain and display your professional CV
- **Contact Form**: Get in touch section with social links
- **Free Hosting**: Deploy on Vercel for free

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- TailwindCSS
- Framer Motion
- React Router
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- File upload handling

### Deployment
- Vercel (Frontend & Serverless Functions)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier available)
- Git



## 🚀 Running Locally

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Frontend** (http://localhost:3000):
```bash
npm run dev:client
```

**Backend** (http://localhost:5000):
```bash
npm run dev:server
```

## 📦 Building for Production

Build the frontend:
```bash
npm run build
```

## 🌐 Deployment to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   
   Method 1: Using Vercel CLI
   ```bash
   vercel
   ```

   Method 2: Using GitHub
   - Push your code to GitHub
   - Import the repository in [Vercel Dashboard](https://vercel.com/dashboard)
   - Vercel will automatically detect the configuration

3. **Set Environment Variables in Vercel**:
   - Go to your project settings in Vercel
   - Add the following environment variables:
     - `MONGODB_URI`
     - `ADMIN_USERNAME`
     - `ADMIN_PASSWORD`

4. **Deploy**:
   - Vercel will automatically build and deploy your application
   - You'll get a production URL

## 📁 Project Structure

```
portfolio/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context (Theme)
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   ├── public/           # Static assets
│   └── package.json
├── server/               # Express backend
│   ├── api/             # Vercel serverless functions
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── uploads/         # Uploaded files
│   └── index.js         # Server entry point
├── .github/             # GitHub configuration
├── vercel.json          # Vercel configuration
└── package.json         # Root package.json
```

## 🔐 Admin Access

Access the admin panel at `/admin`:
- Default username: `admin`
- Default password: `changeme123` (Change this in production!)

## 🎨 Customization

### Update Personal Information

1. **Update profile data** in `client/src/pages/Home.tsx`
2. **Update contact info** in `client/src/pages/Contact.tsx`
3. **Update CV data** through the admin panel or directly in MongoDB

### Theme Colors

Customize colors in `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    light: '#3b82f6',  // Change these
    dark: '#60a5fa',
  },
  // ...
}
```

## 📝 Usage

### Adding Content

1. Navigate to `/admin` and login
2. Use the admin dashboard to:
   - Add/Edit/Delete Projects
   - Add/Edit/Delete Certifications
   - Create/Update Blog Posts
   - Update your CV

### Cloud Provider Logos

When creating content, select the appropriate cloud provider:
- `aws` - Amazon Web Services
- `azure` - Microsoft Azure
- `mongodb` - MongoDB
- `redhat` - Red Hat
- `kubernetes` - Kubernetes
- `gcp` - Google Cloud Platform
- `docker` - Docker

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Dharaneesh RS**
- LinkedIn: [dharaneeshrs-clouddev](https://www.linkedin.com/in/dharaneeshrs-clouddev/)
- GitHub: [@Dharaneesh20](https://github.com/Dharaneesh20)

## 🙏 Acknowledgments

- Cloud provider logos from React Icons
- UI inspiration from modern portfolio designs
- Built with love for the cloud community ☁️

---

**Note**: Remember to update the MongoDB URI and admin credentials before deploying to production!
