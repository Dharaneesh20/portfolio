# Quick Start Guide - New Features

## 🚀 Getting Started

### 1. Install Dependencies (if not already done)
```bash
cd e:\Projects\Portfolio
npm install
cd client
npm install
```

### 2. Start the Application
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

---

## 📊 Coding Progress Feature

### Seed Sample Data
To populate sample coding progress data:

```bash
cd server
node seedCodingProgress.js
```

This will add sample data for:
- LeetCode (250 problems, Knight rank)
- HackerRank (180 problems, 5 Star)
- SkillRack (320 problems, Top 100)

### View Coding Progress
Visit: `http://localhost:3000/coding-progress`

### Manage via API
```bash
# Get all progress
GET http://localhost:5000/api/coding-progress

# Add new platform
POST http://localhost:5000/api/coding-progress
Content-Type: application/json

{
  "platform": "LeetCode",
  "username": "your_username",
  "problemsSolved": 150,
  "rank": "Knight",
  "rating": 1650,
  "streak": 30,
  "profileUrl": "https://leetcode.com/your_username",
  "stats": {
    "easy": 70,
    "medium": 60,
    "hard": 20
  },
  "badges": ["50 Days Badge", "SQL Explorer"]
}

# Update progress
PUT http://localhost:5000/api/coding-progress/{id}

# Delete progress
DELETE http://localhost:5000/api/coding-progress/{id}
```

---

## 🎓 Certifications Filter

### Using the Dropdown
1. Go to `/certifications`
2. Click the dropdown at the top
3. Select a provider to filter (AWS, Azure, MongoDB, etc.)
4. Select "All Providers" to show everything

### Adding Certifications with New Providers
In Admin panel:
1. Click "Certifications" → "Add Certification"
2. Select from providers:
   - AWS, Azure, GCP
   - MongoDB, Kubernetes, Docker
   - GitHub, IBM, NVIDIA (NEW!)
3. Optionally add external image URL (LinkedIn certificate)

---

## 📝 Blog Posts - Fixed

### Creating a Blog Post
All required fields are now in the form:

1. **Title** - Blog post title
2. **Author** - Your name (defaults to "Dharaneesh RS")
3. **Excerpt** - Brief summary (REQUIRED)
4. **Content** - Full article (REQUIRED)
5. **Cloud Provider** - Optional
6. **Image** - URL or file upload

### Example Blog Post Data
```json
{
  "title": "My Journey with AWS Lambda",
  "author": "Dharaneesh RS",
  "excerpt": "How I built serverless applications using AWS Lambda and saved costs",
  "content": "Full article content here with detailed explanation...",
  "cloudProvider": "aws",
  "imageUrl": "https://example.com/image.jpg",
  "tags": ["aws", "serverless", "lambda"]
}
```

---

## 📄 CV Management

### Edit CV in Admin
1. Login to admin: `http://localhost:3000/admin`
   - Username: `admin`
   - Password: `changeme123`
2. Click "CV" card
3. Edit sections:
   - **Basic Info**: Name, Title, Summary
   - **Skills**: Category and items (comma-separated)
   - **Achievements**: One per line
4. Click "Save CV"

### Download CV
1. Visit `/cv` page
2. Click "Download CV" button
3. Text file downloads automatically as `{Name}_CV.txt`

---

## 🎨 Available Cloud Providers

All sections (Projects, Certifications, Blog) now support:

| Provider | Icon | Color |
|----------|------|-------|
| AWS | 🟧 | Orange |
| Azure | 🔵 | Blue |
| MongoDB | 🟢 | Green |
| Kubernetes | 🔷 | Blue |
| Red Hat | 🔴 | Red |
| GCP | 🔵 | Blue |
| Docker | 🐳 | Blue |
| GitHub | ⚫ | Gray/White |
| IBM | 🔵 | Blue |
| NVIDIA | 🟢 | Green |

---

## 🧪 Testing the Features

### Test Checklist
```bash
✅ Navigate to /coding-progress
✅ See sample coding progress cards
✅ Test dropdown filter on /certifications
✅ Login to admin panel
✅ Edit CV and save
✅ Download CV from /cv page
✅ Create a new blog post with all fields
✅ Add certification with GitHub/IBM/NVIDIA provider
✅ Verify provider icons show correctly
```

---

## 🔧 Troubleshooting

### MongoDB Connection
If you see "MongoDB connection error":
```bash
# Check MongoDB is running
# Update .env file with correct MONGODB_URI
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Coding Progress Not Showing
```bash
# Run seed script
cd server
node seedCodingProgress.js
```

### Blog Save Error
Make sure you fill in:
- Title ✅
- Excerpt ✅
- Content ✅

### CV Download Not Working
- Check browser console for errors
- Make sure CV data is loaded (visit /cv first)

---

## 📱 Mobile Responsiveness

All features are mobile-friendly:
- ✅ Coding progress cards stack on mobile
- ✅ Certification dropdown works on touch
- ✅ CV download button responsive
- ✅ Admin forms scroll properly

---

## 🎯 Next Steps (Optional Enhancements)

1. **Admin Panel for Coding Progress**
   - Add CRUD interface in admin panel
   - Similar to Projects/Certifications sections

2. **PDF CV Download**
   - Install `jsPDF` library
   - Generate styled PDF instead of text

3. **Rich Text Editor for Blog**
   - Add Markdown or WYSIWYG editor
   - Better formatting options

4. **Auto-sync with LeetCode/HackerRank APIs**
   - Fetch real-time stats
   - Auto-update progress

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check server terminal for backend errors
3. Verify MongoDB is connected
4. Ensure all dependencies are installed

---

**Happy Coding! 🚀**

All features are now live and ready to showcase your skills!
