# 🚀 MongoDB Atlas Setup Complete!

Your recruitment platform is now using **MongoDB Atlas** instead of Firebase!

## ✅ What's Been Done

- Installed Mongoose (MongoDB ODM)
- Created MongoDB connection file
- Created Job and Application models  
- Updated all API routes to use MongoDB
- CVs now stored as Buffer in MongoDB (no separate storage needed)
- Migration script ready

## 📝 Next Steps

### 1. Update Your Database Password in .env.local

Open `.env.local` and replace `<db_password>` with your actual MongoDB password:

```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://recruitment-platform:YOUR_ACTUAL_PASSWORD@your-cluster-url.mongodb.net/recruitment?retryWrites=true&w=majority
```

**Replace `YOUR_ACTUAL_PASSWORD`** with the password you created for the `recruitment-platform` user in MongoDB Atlas.

### 2. Run the Migration Script

This will copy your 5 sample jobs to MongoDB:

```bash
npx ts-node scripts/migrate-jobs-mongodb.ts
```

You should see:
```
Starting job migration to MongoDB...
Cleared existing jobs

✅ Migration complete! 5 jobs added to MongoDB.

Jobs migrated:
  ✓ Senior Software Developer
  ✓ IT Support Specialist
  ✓ Junior Network Engineer
  ✓ Data Analyst
  ✓ Graphic Designer
```

### 3. Start Development Server

```bash
pnpm dev
```

### 4. Test Everything

Visit http://localhost:3001/careers

**Test job listing:**
- Careers page should show 3 featured jobs
- Jobs page should show all 5 jobs
- Search and filters should work

**Test application submission:**
- Click on a job
- Fill out the application form
- Upload a CV (PDF/DOCX, max 10MB)
- Submit

**Check MongoDB Atlas:**
1. Go to your MongoDB Atlas dashboard
2. Click "Browse Collections"
3. You should see:
   - `jobs` collection with 5 documents
   - `applications` collection with your test application

## 🎯 Key Changes from Firebase

### CV Storage
- **Before (Firebase):** CVs uploaded to Firebase Storage, URL saved in Firestore
- **Now (MongoDB):** CVs stored directly in MongoDB as Buffer (binary data)
- **Benefit:** No need for separate storage service, everything in one place!

### Database Structure

**Jobs Collection:**
```javascript
{
  _id: ObjectId,
  slug: "senior-software-developer",
  title: "Senior Software Developer",
  location: "London, UK",
  workType: "Hybrid",
  employmentType: "Full-time",
  department: "Engineering",
  summary: "...",
  responsibilities: [...],
  requirements: { mustHave: [...], niceToHave: [...] },
  benefits: [...],
  salaryRange: "£55,000 - £75,000",
  postedDate: "2025-01-15",
  featured: true,
  createdAt: Date,
  updatedAt: Date
}
```

**Applications Collection:**
```javascript
{
  _id: ObjectId,
  jobId: "senior-software-developer",
  jobTitle: "Senior Software Developer",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+44 7700 900000",
  location: "London",
  linkedinUrl: "...",
  portfolioUrl: "...",
  cvFileName: "CV_John_Doe_Senior_Software_Developer.pdf",
  cvData: Buffer, // Binary CV file
  cvMimeType: "application/pdf",
  additionalInfo: "...",
  agreedToPrivacy: true,
  submittedAt: "2025-12-19T...",
  status: "pending",
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 API Endpoints (Same as Before)

### Public Endpoints
- `GET /api/jobs` - List all jobs
- `GET /api/jobs?featured=true` - Featured jobs only
- `GET /api/jobs/[slug]` - Get single job
- `POST /api/apply` - Submit application

### Admin Endpoints
- `GET /api/admin/jobs` - List all jobs
- `POST /api/admin/jobs` - Create job
- `GET /api/admin/jobs/[id]` - Get job
- `PUT /api/admin/jobs/[id]` - Update job
- `DELETE /api/admin/jobs/[id]` - Delete job
- `GET /api/admin/applications` - List applications
- `GET /api/admin/applications/[id]` - Get application (includes CV as base64)
- `PATCH /api/admin/applications/[id]` - Update status
- `DELETE /api/admin/applications/[id]` - Delete application

## 💡 MongoDB Atlas Free Tier

**What's included:**
- ✅ 512MB storage - FREE forever
- ✅ Shared M0 cluster
- ✅ No credit card required
- ✅ Perfect for development & small apps

**Limits:**
- 512MB storage (plenty for thousands of applications)
- Shared compute resources
- 100 max connections

## 🔐 Security Notes

- MongoDB connection string contains credentials - never commit to git
- `.env.local` is already in `.gitignore`
- In MongoDB Atlas, you can whitelist specific IP addresses for extra security
- Current setup allows `0.0.0.0/0` (anywhere) - good for development, restrict in production

## 🚀 Deploying to Production

When deploying (Vercel, Netlify, etc.):

1. Add `MONGODB_URI` environment variable
2. Add `SMTP_*` variables for emails
3. In MongoDB Atlas:
   - Go to Network Access
   - Add `0.0.0.0/0` OR your hosting provider's IP ranges
4. Deploy!

## 🎉 You're All Set!

Your recruitment platform now uses MongoDB Atlas - completely free, no billing required! 

**Questions?** Check the main README or test the endpoints with the migration complete.
