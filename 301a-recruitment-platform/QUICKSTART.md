# Quick Start Guide - 301A TECH Recruitment Platform

## ✅ What's Been Built

A complete, professional recruitment website with:
- **Careers Home** - Why join, hiring process, featured jobs
- **Jobs Listing** - Search and filter by location, work type, department
- **Job Details** - Full job description with inline application form
- **CV Upload** - PDF/DOCX support, max 10MB
- **Email System** - Auto-sends to recruit@301atech.com + candidate confirmation
- **Privacy Page** - GDPR-compliant recruitment privacy notice
- **SEO Ready** - Optimized for Google Jobs and LinkedIn sharing

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
cd "301a-recruitment-platform"
npm install
```

### 2. Configure Email (REQUIRED)

Create a `.env.local` file in the `301a-recruitment-platform` folder:

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=noreply@301atech.com
SMTP_PASS=your_actual_smtp_password

RECRUIT_EMAIL=recruit@301atech.com
```

**Note:** Replace `your_actual_smtp_password` with your real SMTP password from Zoho.

### 3. Run the Development Server

```bash
npm run dev
```

Visit: **http://localhost:3001**

### 4. Test the Application

1. Go to http://localhost:3001/careers
2. Click "View Open Positions"
3. Select a job (e.g., "Senior Software Developer")
4. Fill out the application form
5. Upload a test CV (PDF or DOCX)
6. Submit
7. Check `recruit@301atech.com` inbox for the application email

## 📝 Managing Jobs

Edit [lib/jobs.ts](lib/jobs.ts) to add/edit/remove jobs.

**To add a new job:**
```typescript
{
  id: "6",
  slug: "your-job-slug",
  title: "Your Job Title",
  location: "London, UK",
  workType: "Hybrid",
  employmentType: "Full-time",
  department: "Your Department",
  summary: "Brief description...",
  responsibilities: ["Task 1", "Task 2"],
  requirements: {
    mustHave: ["Requirement 1", "Requirement 2"],
    niceToHave: ["Nice to have 1"]
  },
  benefits: ["Benefit 1", "Benefit 2"],
  salaryRange: "£50,000 - £65,000",
  postedAt: "2025-12-19",
  featured: true  // Shows on homepage
}
```

## 📱 LinkedIn Posting

### 1. Create LinkedIn Company Page
- Go to LinkedIn → Create Company Page
- Add company info and logo

### 2. Post Job Links
When you post a job on LinkedIn:
```
🚀 We're hiring! Join our team as a [Job Title]

📍 Location: [Location]
💼 Type: [Full-time/Hybrid/etc.]

What you'll do:
• [Key responsibility 1]
• [Key responsibility 2]

Apply now: https://careers.301atech.com/careers/jobs/[job-slug]

#Hiring #TechJobs #Careers
```

**Example:**
```
https://careers.301atech.com/careers/jobs/senior-software-developer
```

LinkedIn will automatically pull the job title, description, and preview image.

## 🌐 Deployment

### Option A: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables (SMTP_HOST, SMTP_USER, etc.)
6. Deploy

### Option B: Custom Domain

Set up a subdomain:
- `careers.301atech.com` (recommended)
- `jobs.301atech.com`

Update all URLs in the code from `https://careers.301atech.com` to your actual domain.

## 📧 Email Setup Checklist

Before going live:

- [ ] Create `recruit@301atech.com` email address in Zoho
- [ ] Test SMTP credentials work
- [ ] Send a test application
- [ ] Verify recruiter receives email with CV attachment
- [ ] Verify candidate receives confirmation email
- [ ] Check spam folders if emails not arriving

## 🔒 Security Checklist

- [ ] File upload limited to PDF/DOCX only
- [ ] File size limited to 10MB
- [ ] Server-side validation on all form fields
- [ ] Privacy policy consent required
- [ ] HTTPS enabled in production

## 📊 Sample Jobs Included

The platform comes with 5 sample jobs:
1. **Senior Software Developer** (Featured)
2. **IT Support Specialist**
3. **Junior Network Engineer**
4. **Data Analyst** (Featured, Remote)
5. **Graphic Designer**

Edit or replace these in `lib/jobs.ts`.

## 🆘 Troubleshooting

**Applications not sending?**
- Check `.env.local` exists with correct SMTP settings
- Verify SMTP password is correct
- Check console for error messages

**Jobs not appearing?**
- Ensure jobs are in `lib/jobs.ts` array
- Restart dev server after changes

**CV upload failing?**
- Check file is PDF or DOCX
- Ensure file is under 10MB
- Check browser console for errors

## 📞 Support

Questions? Contact: recruit@301atech.com

---

**Built with:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Nodemailer
