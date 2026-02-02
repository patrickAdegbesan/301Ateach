# 🚀 Quick Start - Firebase Integration

Your recruitment platform is now fully integrated with Firebase! Follow these steps to get it running.

## ✅ What's Already Done

- Firebase packages installed (`firebase` + `firebase-admin`)
- Database schema updated for Firestore
- Application API uploads CVs to Firebase Storage
- Admin API endpoints for job/application management
- Frontend pages updated to fetch from Firestore
- Migration script ready to copy sample jobs

## 🎯 Next Steps (Required)

### 1. Set Up Firebase Project (10 minutes)

Follow the detailed guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md):

**Quick version:**
1. Go to https://console.firebase.google.com/
2. Create new project: `301a-recruitment-platform`
3. Enable **Firestore Database** (production mode, europe-west2)
4. Enable **Storage** (same location)
5. Get **Web SDK config** (Project Settings → General → Add web app)
6. Generate **Service Account** (Project Settings → Service Accounts → Generate key)

### 2. Configure Environment Variables

Update `.env.local` with your Firebase credentials:

```bash
# From Web SDK Config
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# From Service Account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY"
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
```

⚠️ **Important:** For `FIREBASE_PRIVATE_KEY`, replace actual newlines with `\n`

### 3. Configure Firestore Security Rules

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /jobs/{jobId} {
      allow read: if true;  // Public can read jobs
      allow write: if false; // Only server can write
    }
    
    match /applications/{applicationId} {
      allow read, write: if false; // Only server can access
    }
  }
}
```

Click **Publish**.

### 4. Configure Storage Security Rules

In Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /applications/{jobId}/{fileName} {
      allow read: if false;  // Access via signed URLs only
      allow write: if false; // Only server can write
    }
  }
}
```

Click **Publish**.

### 5. Migrate Sample Jobs to Firestore

Install ts-node (if not already installed):
```bash
pnpm add -D ts-node
```

Run migration:
```bash
npx ts-node scripts/migrate-jobs.ts
```

You should see:
```
Starting job migration to Firestore...
✓ Migrated: Senior Software Developer
✓ Migrated: IT Support Specialist
✓ Migrated: Junior Network Engineer
✓ Migrated: Data Analyst
✓ Migrated: Graphic Designer

✅ Migration complete! All jobs have been added to Firestore.
```

### 6. Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3001/careers

## 🧪 Testing

### Test Job Listing
1. Visit http://localhost:3001/careers
2. You should see 3 featured jobs
3. Click "View Open Positions"
4. All 5 jobs should display with search/filters working

### Test Job Application
1. Click on any job
2. Scroll to "Apply Now" section
3. Fill out the form and upload a CV (PDF/DOCX, max 10MB)
4. Submit application
5. Check your email for confirmation
6. **Verify in Firebase Console:**
   - Firestore → `applications` collection (new entry)
   - Storage → `applications/{jobId}/` (uploaded CV)

### Test Admin API

Using a tool like Postman or curl:

**List all jobs:**
```bash
curl http://localhost:3001/api/admin/jobs
```

**Create new job:**
```bash
curl -X POST http://localhost:3001/api/admin/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "backend-engineer",
    "title": "Backend Engineer",
    "location": "London, UK",
    "workType": "Hybrid",
    "employmentType": "Full-time",
    "department": "Engineering",
    "summary": "Build scalable APIs...",
    "responsibilities": ["Design APIs", "Optimize databases"],
    "requirements": {
      "mustHave": ["Node.js experience", "SQL knowledge"],
      "niceToHave": ["GraphQL", "Redis"]
    },
    "benefits": ["Competitive salary", "Health insurance"],
    "salaryRange": "£50,000 - £70,000",
    "featured": false
  }'
```

**List applications:**
```bash
curl http://localhost:3001/api/admin/applications
```

## 📊 Verify in Firebase Console

After testing:

1. **Firestore Database**
   - `jobs` collection: 5 or 6 documents (if you created one via API)
   - `applications` collection: 1+ documents (your test applications)

2. **Storage**
   - `applications/{jobId}/` folders with uploaded CV files

## 🔧 Troubleshooting

### "Firebase project not found"
- Double-check `FIREBASE_PROJECT_ID` in `.env.local`
- Ensure service account is from the correct project

### "Permission denied" errors
- Verify Firestore and Storage security rules are published
- Check you're using correct credentials

### Jobs not loading
- Check browser console for errors
- Verify migration script ran successfully
- Check Firebase Console → Firestore for job documents

### CVs not uploading
- Verify `FIREBASE_STORAGE_BUCKET` is correct
- Check Storage rules allow server-side writes
- Ensure service account has Storage Admin role

### Still seeing hardcoded jobs
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check Network tab to see if API calls are being made

## 📁 What Changed

### New Files
- `lib/firebase.ts` - Client SDK config
- `lib/firebase-admin.ts` - Server SDK config
- `lib/jobs-firestore.ts` - Firestore data layer
- `scripts/migrate-jobs.ts` - Migration script
- `app/api/jobs/route.ts` - Public jobs API
- `app/api/jobs/[slug]/route.ts` - Single job API
- `app/api/admin/jobs/*` - Admin job management
- `app/api/admin/applications/*` - Admin application management

### Updated Files
- `.env.local` - Added Firebase env vars
- `types/index.ts` - Added `id`, `cvUrl`, `status` to Application
- `app/api/apply/route.ts` - Now saves to Firestore + Storage
- `app/careers/page.tsx` - Fetches jobs from API
- `app/careers/jobs/page.tsx` - Fetches jobs from API
- `app/careers/jobs/[slug]/page.tsx` - Fetches from Firestore

### Old File (no longer used)
- `lib/jobs.ts` - Hardcoded data (can be deleted after testing)

## 🎉 Success Criteria

✅ Careers page loads with 3 featured jobs  
✅ Jobs listing shows all 5 jobs  
✅ Individual job pages load correctly  
✅ Application form submits successfully  
✅ CV uploads to Firebase Storage  
✅ Application data saves to Firestore  
✅ Confirmation emails are sent  
✅ Admin API endpoints work  

## 🚀 Production Deployment

When ready to deploy:

1. **Add Firebase credentials to hosting platform** (Vercel, Netlify, etc.)
   - Add all `NEXT_PUBLIC_FIREBASE_*` vars
   - Add all `FIREBASE_*` vars
   - Add `SMTP_*` vars

2. **Update Firebase security rules** for production (already done)

3. **Deploy application**
   ```bash
   pnpm build
   # Deploy to your platform
   ```

4. **Test production deployment** thoroughly

## 📚 Additional Resources

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Detailed setup guide
- [FIREBASE_INTEGRATION_SUMMARY.md](FIREBASE_INTEGRATION_SUMMARY.md) - Integration details
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Need help?** Check the troubleshooting section or review the Firebase setup guide.
