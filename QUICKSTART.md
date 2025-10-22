# Quick Start Guide

Welcome to your professional portfolio! Follow these steps to get started.

## ⚡ Quick Setup (5 minutes)

### 1. Set Up MongoDB (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 2. Configure Environment

Open the `.env` file and add your MongoDB URI:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
```

**⚠️ Important**: Change the `ADMIN_PASSWORD` to something secure!

### 3. Run the Application

```bash
npm run dev
```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000).

### 4. Access Your Portfolio

- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `changeme123` (or your custom password)

## 🎨 Customizing Your Portfolio

### Update Personal Information

1. **Home Page**: Edit `client/src/pages/Home.tsx`
   - Update your name, title, and bio

2. **Contact Info**: Edit `client/src/pages/Contact.tsx`
   - Update email, LinkedIn, GitHub links

3. **Footer**: Edit `client/src/components/Footer.tsx`
   - Update social links

### Add Content via Admin Panel

1. Go to http://localhost:3000/admin
2. Login with your credentials
3. Add your:
   - Projects (with GitHub/Live URLs)
   - Certifications (with credential links)
   - Blog posts about your cloud journey
   - Update your CV

### Choose Cloud Provider Logos

When adding content, select the appropriate cloud provider:
- `aws` → Shows AWS logo
- `azure` → Shows Azure logo
- `mongodb` → Shows MongoDB logo
- `kubernetes` → Shows Kubernetes logo
- `redhat` → Shows Red Hat logo
- `gcp` → Shows Google Cloud logo
- `docker` → Shows Docker logo

## 🚀 Deploy to Vercel (Free)

### Method 1: GitHub + Vercel (Recommended)

1. Create a GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

3. Go to [Vercel](https://vercel.com)
4. Click "Import Project"
5. Import your GitHub repository
6. Add environment variables in Vercel settings:
   - `MONGODB_URI`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
7. Deploy!

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and add your environment variables when asked.

## 📚 Common Tasks

### Add a New Project

1. Go to `/admin`
2. Click "Manage" under Projects
3. Fill in:
   - Title
   - Description
   - Technologies (comma-separated)
   - Cloud Provider (optional)
   - GitHub URL (optional)
   - Live URL (optional)
   - Status (completed/ongoing/upcoming)
   - Upload an image (optional)

### Add a Certification

1. Go to `/admin`
2. Click "Manage" under Certifications
3. Fill in:
   - Title (e.g., "MongoDB Certified Associate")
   - Issuer (e.g., "MongoDB")
   - Date
   - Cloud Provider
   - Credential URL
   - Description
   - Upload certificate image

### Write a Blog Post

1. Go to `/admin`
2. Click "Manage" under Blog Posts
3. Fill in:
   - Title
   - Content
   - Excerpt (short summary)
   - Tags (comma-separated)
   - Cloud Provider (if relevant)
   - Upload featured image

### Update Your CV

1. Go to `/admin`
2. Click "Manage" under CV
3. Update sections:
   - Experience
   - Education
   - Skills
   - Achievements

## 🎨 Theme Customization

### Change Colors

Edit `client/tailwind.config.js`:

```javascript
colors: {
  primary: {
    light: '#3b82f6',  // Your primary color (light theme)
    dark: '#60a5fa',   // Your primary color (dark theme)
  },
  secondary: {
    light: '#8b5cf6',
    dark: '#a78bfa',
  },
}
```

### Modify Animations

Edit `client/src/index.css` for custom animations or add more in the Tailwind config.

## 🔧 Troubleshooting

### MongoDB Connection Error

- Check your connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username/password are correct

### Port Already in Use

Change the port in `.env`:
```env
PORT=5001
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

## 📞 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Reach out on LinkedIn

---

Happy building! 🚀
