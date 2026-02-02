# LinkedIn Auto-Poster Bot

Automated job posting system integrated into the 301A Tech recruitment platform.

## Features

✅ **OAuth 2.0 Authentication** - Secure LinkedIn API connection
✅ **Auto-Post Jobs** - Post job listings as company page updates
✅ **Admin Dashboard** - Manage LinkedIn connection and posts
✅ **Integrated** - Built into existing recruitment platform

## Setup Guide

### 1. LinkedIn Company Page

You already have: **301Atech** LinkedIn page

### 2. LinkedIn Developer App

You already created: **301ATech Job Poster**
- Client ID: `YOUR_LINKEDIN_CLIENT_ID`
- Client Secret: `YOUR_LINKEDIN_CLIENT_SECRET`

### 3. Environment Variables

Add to `.env.local`:
```env
LINKEDIN_CLIENT_ID=YOUR_LINKEDIN_CLIENT_ID
LINKEDIN_CLIENT_SECRET=YOUR_LINKEDIN_CLIENT_SECRET
LINKEDIN_REDIRECT_URI=http://localhost:3001/api/linkedin/callback
LINKEDIN_ORGANIZATION_ID=
LINKEDIN_ACCESS_TOKEN=
```

Add to Vercel production:
```bash
vercel env add LINKEDIN_CLIENT_ID production
# Value: YOUR_LINKEDIN_CLIENT_ID

vercel env add LINKEDIN_CLIENT_SECRET production
# Value: YOUR_LINKEDIN_CLIENT_SECRET

vercel env add LINKEDIN_REDIRECT_URI production
# Value: https://jobs.301atech.com/api/linkedin/callback

vercel env add LINKEDIN_ORGANIZATION_ID production
# Value: (get from OAuth flow)

vercel env add LINKEDIN_ACCESS_TOKEN production
# Value: (get from OAuth flow)
```

### 4. First-Time Authentication

1. Go to: http://localhost:3001/admin/jobs
2. Click "LinkedIn Bot" button
3. Click "Connect LinkedIn"
4. Authorize with LinkedIn
5. Copy the credentials shown
6. Update `.env.local` with the values

### 5. Deploy

```bash
vercel --prod
```

## Usage

### Connect LinkedIn (One-time)

1. Login to admin: https://jobs.301atech.com/admin/login
2. Click "LinkedIn Bot"
3. Click "Connect LinkedIn"
4. Authorize
5. Copy credentials to Vercel env vars
6. Redeploy

### Post a Job

Coming soon: Admin UI to select and post jobs

### API Endpoints

- **GET `/api/linkedin/auth`** - Start OAuth flow
- **GET `/api/linkedin/callback`** - OAuth callback
- **POST `/api/linkedin/post`** - Post a single job
  ```json
  {
    "jobId": "job-id-here"
  }
  ```

## Architecture

```
┌─────────────────────────────────────────┐
│   jobs.301atech.com                    │
├─────────────────────────────────────────┤
│                                         │
│  Admin Panel                            │
│  └─ LinkedIn Bot                        │
│     ├─ Connect LinkedIn (OAuth)         │
│     ├─ Post Jobs                        │
│     └─ View History                     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  API Routes                             │
│  ├─ /api/linkedin/auth                  │
│  ├─ /api/linkedin/callback              │
│  └─ /api/linkedin/post                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Database (Heroku PostgreSQL)           │
│  └─ jobs table (10,000 jobs)            │
│                                         │
└─────────────────────────────────────────┘
           │
           │ LinkedIn API
           ▼
┌─────────────────────────────────────────┐
│   LinkedIn                              │
│   └─ 301Atech Company Page              │
│      └─ Job Posts                       │
└─────────────────────────────────────────┘
```

## Next Steps

1. ✅ Complete OAuth authentication
2. ⏳ Test posting a job
3. ⏳ Build job scheduler UI
4. ⏳ Add auto-post on job creation
5. ⏳ Add bulk posting
6. ⏳ Add post analytics

## Troubleshooting

**"LinkedIn not connected"**
- Complete OAuth flow in admin panel
- Ensure `LINKEDIN_ACCESS_TOKEN` is set
- Ensure `LINKEDIN_ORGANIZATION_ID` is set

**"Failed to post job"**
- Check token hasn't expired (2 months)
- Re-authenticate if needed
- Check LinkedIn API rate limits

**OAuth errors**
- Verify redirect URI matches exactly
- Check client ID and secret are correct
- Ensure "Share on LinkedIn" product is approved

## Files Created

- `lib/linkedin.ts` - LinkedIn API client
- `app/api/linkedin/auth/route.ts` - OAuth start
- `app/api/linkedin/callback/route.ts` - OAuth callback
- `app/api/linkedin/post/route.ts` - Post job API
- `app/admin/linkedin/page.tsx` - Admin UI
