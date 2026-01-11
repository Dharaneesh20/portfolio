# Deployment Guide - Vercel

This guide will walk you through deploying your portfolio to Vercel for free.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas cluster with connection string

## Step-by-Step Deployment

### 1. Prepare Your Code

1. **Update Environment Variables**
   
   Make sure your `.env` file has the correct values (don't commit this file!):
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

2. **Test Locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 and make sure everything works.

### 2. Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   ```

2. **Create a GitHub Repository**:
   - Go to https://github.com/new
   - Name it "portfolio" or any name you prefer
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push Your Code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### 3. Deploy to Vercel

#### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Repository**:
   - Select "Import Git Repository"
   - Choose your GitHub account
   - Select your portfolio repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vercel should auto-detect "Vite"
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB connection string |
   | `ADMIN_USERNAME` | admin (or your choice) |
   | `ADMIN_PASSWORD` | Your secure password |
   | `NODE_ENV` | production |

   Make sure to add these for all environments (Production, Preview, Development)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `https://your-project-name.vercel.app`

#### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - What's your project's name? portfolio
   - In which directory is your code located? ./
   - Want to override the settings? No

5. **Add Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add ADMIN_USERNAME
   vercel env add ADMIN_PASSWORD
   ```

6. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### 4. Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow Vercel's instructions to configure DNS

2. **DNS Configuration**:
   - Add A record or CNAME as instructed
   - Wait for DNS propagation (can take up to 48 hours)

### 5. Post-Deployment

1. **Test Your Live Site**:
   - Visit your Vercel URL
   - Test all pages
   - Try the admin panel
   - Upload a test project/certification

2. **Set Up MongoDB Atlas IP Whitelist**:
   - Go to MongoDB Atlas
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere) for Vercel serverless functions
   - Or use MongoDB Atlas's Vercel integration

3. **Enable Automatic Deployments**:
   - Vercel automatically deploys when you push to GitHub
   - Main branch → Production
   - Other branches → Preview deployments

## Common Issues & Solutions

### Build Fails

**Error**: "Cannot find module..."
- **Solution**: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error**: "MONGODB_URI is not defined"
- **Solution**: Add environment variables in Vercel dashboard
- Go to Settings → Environment Variables

### API Routes Not Working

**Error**: 404 on `/api/*` routes
- **Solution**: Check `vercel.json` configuration
- Ensure serverless function is in `server/api/index.js`

### Images Not Uploading

**Issue**: Uploaded images disappear after deployment
- **Solution**: Vercel's filesystem is read-only
- Use a cloud storage service like:
  - AWS S3
  - Cloudinary
  - Vercel Blob Storage
  
  For now, the uploads are stored in the serverless function, but they won't persist between deployments.

### MongoDB Connection Timeout

**Error**: "MongoTimeoutError"
- **Solution**:
  1. Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
  2. Verify connection string is correct
  3. Check MongoDB Atlas cluster is running

## Performance Optimization

### Enable Caching

Add caching headers in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/uploads/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Use Environment-Specific Builds

For development and production:
```json
{
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```

## Monitoring & Analytics

### Vercel Analytics

1. Go to your project in Vercel
2. Click "Analytics"
3. Enable Vercel Analytics (free tier available)

### Error Monitoring

1. Check Vercel deployment logs
2. View function logs in Vercel dashboard
3. Set up error tracking (optional):
   - Sentry
   - LogRocket
   - Datadog

## Continuous Deployment

Every time you push to GitHub:
1. Vercel automatically builds your app
2. Runs tests (if configured)
3. Deploys to preview URL (for branches)
4. Deploys to production (for main branch)

### Preview Deployments

- Every pull request gets a unique preview URL
- Test changes before merging
- Share preview URLs with team/clients

## Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` file
   - Use Vercel's environment variable management

2. **Admin Panel**:
   - Change default password immediately
   - Consider adding proper authentication (Auth0, NextAuth)

3. **CORS**:
   - Configure CORS properly in production
   - Restrict to your domain only

4. **Rate Limiting**:
   - Consider adding rate limiting to API routes
   - Use Vercel's built-in DDoS protection

## Rollback

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find a working deployment
3. Click "..." → "Promote to Production"

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- MongoDB Atlas Support: https://www.mongodb.com/support

---

🎉 Congratulations! Your portfolio is now live on Vercel!
