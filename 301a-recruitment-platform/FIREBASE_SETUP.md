# Firebase Setup Guide for 301A Recruitment Platform

This guide will help you set up Firebase for the recruitment platform, including Firestore database and Storage for CV files.

## Prerequisites

- A Google account
- Firebase packages already installed (`firebase` and `firebase-admin`)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `301a-recruitment-platform` (or your preferred name)
4. Enable Google Analytics (optional, recommended)
5. Click **"Create project"**

## Step 2: Set Up Firestore Database

1. In Firebase Console, select your project
2. Click **"Firestore Database"** in the left sidebar (under Build section)
3. Click **"Create database"**
4. Choose **"Start in production mode"** (we'll configure rules next)
5. Select location closest to your users: **europe-west2 (London)** recommended for UK
6. Click **"Enable"**

### Configure Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to jobs collection
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if false; // Only server-side can write
    }
    
    // Applications collection - no public access
    match /applications/{applicationId} {
      allow read, write: if false; // Only server-side can access
    }
  }
}
```

3. Click **"Publish"**

## Step 3: Set Up Firebase Storage

1. In Firebase Console, click **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Use the same location as Firestore: **europe-west2 (London)**
5. Click **"Done"**

### Configure Storage Security Rules

1. Go to **Storage** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Only server-side can upload CVs
    match /applications/{jobId}/{fileName} {
      allow read: if false; // Access via signed URLs only
      allow write: if false; // Only server-side can write
    }
  }
}
```

3. Click **"Publish"**

## Step 4: Get Firebase Web Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Enter app nickname: `301A Recruitment Web`
6. **Do NOT** check "Set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the `firebaseConfig` object values

## Step 5: Generate Admin SDK Service Account

1. In Firebase Console → **Project Settings** (⚙️ icon)
2. Click the **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** (a JSON file will download)
5. **Keep this file secure!** It contains sensitive credentials

## Step 6: Update .env.local File

Open `.env.local` in your project and replace the placeholders:

### From Firebase Web Config (Step 4):

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### From Service Account JSON (Step 5):

Open the downloaded JSON file and extract these values:

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

**Important:** For `FIREBASE_PRIVATE_KEY`, keep the quotes and include the full key with `\n` for newlines. The key in the JSON has actual newlines - you need to replace them with `\n`.

## Step 7: Migrate Sample Jobs to Firestore

Run the migration script to copy the 5 sample jobs to Firestore:

```bash
# Install ts-node if not already installed
pnpm add -D ts-node

# Run migration
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

## Step 8: Verify Firestore Data

1. Go to Firebase Console → **Firestore Database**
2. You should see a `jobs` collection with 5 documents
3. Click on any document to view its data

## Step 9: Test the Application

1. **Restart your dev server** (if running):
   ```bash
   # Press Ctrl+C to stop, then:
   pnpm dev
   ```

2. Visit `http://localhost:3001/careers`
3. Jobs should load from Firestore
4. Try submitting an application:
   - CV will upload to Firebase Storage
   - Application data will save to Firestore
   - You'll receive confirmation emails

## Step 10: Verify Applications in Firestore

After submitting a test application:

1. Go to Firebase Console → **Firestore Database**
2. Check the `applications` collection for the new entry
3. Go to **Storage** → **Files**
4. Navigate to `applications/{jobId}/` to see the uploaded CV

## API Endpoints for Job Management

Now you can manage jobs via API:

### List all jobs
```bash
GET http://localhost:3001/api/admin/jobs
```

### Create new job
```bash
POST http://localhost:3001/api/admin/jobs
Content-Type: application/json

{
  "slug": "backend-developer",
  "title": "Backend Developer",
  "location": "London, UK",
  "workType": "Hybrid",
  "employmentType": "Full-time",
  "department": "Engineering",
  "summary": "Join our backend team...",
  "responsibilities": ["Build APIs", "Design databases"],
  "requirements": {
    "mustHave": ["3+ years Node.js"],
    "niceToHave": ["MongoDB experience"]
  },
  "benefits": ["Competitive salary", "Flexible hours"],
  "salaryRange": "£45,000 - £65,000",
  "featured": false
}
```

### Update job
```bash
PUT http://localhost:3001/api/admin/jobs/{jobId}
Content-Type: application/json

{
  "featured": true,
  "salaryRange": "£50,000 - £70,000"
}
```

### Delete job
```bash
DELETE http://localhost:3001/api/admin/jobs/{jobId}
```

### List applications
```bash
# All applications
GET http://localhost:3001/api/admin/applications

# Filter by job
GET http://localhost:3001/api/admin/applications?jobId=job123

# Filter by status
GET http://localhost:3001/api/admin/applications?status=pending
```

### Update application status
```bash
PATCH http://localhost:3001/api/admin/applications/{applicationId}
Content-Type: application/json

{
  "status": "shortlisted"
}
```

## Troubleshooting

### Error: "SMTP configuration missing"
- Make sure you've set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` in `.env.local`
- These are for sending emails (separate from Firebase)

### Error: "Firebase project not found"
- Double-check `FIREBASE_PROJECT_ID` matches your Firebase project
- Verify the service account JSON has the correct project

### Error: "Permission denied" in Firestore
- Check your Firestore security rules allow server-side access
- Make sure you're using `firebase-admin` SDK for server operations

### CVs not uploading
- Verify `FIREBASE_STORAGE_BUCKET` is correct in `.env.local`
- Check Storage rules allow server-side writes
- Ensure the service account has Storage Admin permissions

### Migration script fails
- Make sure Firebase Admin SDK is configured correctly
- Check `FIREBASE_PRIVATE_KEY` format (must have `\n` for newlines)
- Verify you have write access to Firestore

## Next Steps

✅ Firebase is now set up and integrated!
✅ Jobs are stored in Firestore
✅ Applications save to Firestore with CV uploads to Storage
✅ Admin API endpoints ready for job management

**Optional enhancements:**
- Build an admin dashboard UI to manage jobs visually
- Add Firebase Authentication for admin access
- Set up Firebase Functions for automated email notifications
- Implement job analytics and application tracking
- Add Firebase Hosting for production deployment

## Security Notes

🔒 **Never commit `.env.local` to git** - it contains sensitive credentials
🔒 Keep your service account JSON file secure
🔒 Use environment variables in production (Vercel, Netlify, etc.)
🔒 Consider adding authentication to admin API endpoints
🔒 Firestore rules restrict public write access - only server can modify data

---

**Need help?** Check the [Firebase documentation](https://firebase.google.com/docs) or the project README.
