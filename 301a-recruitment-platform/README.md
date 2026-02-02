# 301A TECH LTD - Recruitment Platform

A professional recruitment website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ Modern, responsive design
- ✅ Job listings with search and filters
- ✅ Detailed job pages with inline application forms
- ✅ CV/Resume upload (PDF/DOCX, max 10MB)
- ✅ Email notifications for recruiters and candidates
- ✅ SEO optimized for Google Jobs and LinkedIn sharing
- ✅ Privacy-compliant with GDPR considerations
- ✅ Professional hiring process showcase

## Getting Started

### Prerequisites

- Node.js 18+
- SMTP email service (Zoho, Gmail, etc.)

### Installation

```bash
cd 301a-recruitment-platform
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# SMTP Configuration
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=noreply@301atech.com
SMTP_PASS=your_smtp_password

# Recruitment Email
RECRUIT_EMAIL=recruit@301atech.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the recruitment site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
301a-recruitment-platform/
├── app/
│   ├── api/
│   │   └── apply/
│   │       └── route.ts          # Application submission API
│   ├── careers/
│   │   ├── jobs/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx      # Individual job detail + apply form
│   │   │   └── page.tsx          # Jobs listing
│   │   ├── privacy/
│   │   │   └── page.tsx          # Recruitment privacy notice
│   │   └── page.tsx              # Careers home
│   ├── globals.css
│   └── layout.tsx
├── lib/
│   └── jobs.ts                   # Job data and functions
├── types/
│   └── index.ts                  # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Managing Jobs

Jobs are currently stored in `/lib/jobs.ts`. To add a new job:

1. Open `lib/jobs.ts`
2. Add a new job object to the `jobs` array
3. Set `featured: true` to display on the homepage
4. The job will automatically appear on the jobs listing page

### Job Object Structure

```typescript
{
  id: "unique-id",
  slug: "job-url-slug",
  title: "Job Title",
  location: "Location",
  workType: "On-site" | "Hybrid" | "Remote",
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship",
  department: "Department Name",
  summary: "Brief job description",
  responsibilities: ["..."],
  requirements: {
    mustHave: ["..."],
    niceToHave: ["..."]
  },
  benefits: ["..."],
  salaryRange: "Optional salary range",
  postedAt: "YYYY-MM-DD",
  featured: true/false
}
```

## Email Setup

The platform sends two types of emails:

1. **Recruiter Email** (`recruit@301atech.com`)
   - Subject: `Application – {Job Title} – {Candidate Name}`
   - Includes all candidate details + CV attachment

2. **Candidate Confirmation Email**
   - Subject: `Application Received - {Job Title} at 301A TECH LTD`
   - Confirms receipt and outlines next steps

## LinkedIn Integration

### Posting Jobs on LinkedIn

1. Create/update your LinkedIn Company Page
2. When posting a job, share the link: `https://careers.301atech.com/careers/jobs/{slug}`
3. The page includes proper Open Graph metadata for rich previews
4. Consider using LinkedIn's native Jobs feature for additional reach

### Open Graph Optimization

Each job page automatically includes:
- Title, description, and image for social sharing
- Proper meta tags for LinkedIn, Twitter, and Facebook
- Canonical URLs for SEO

## Google Jobs Integration

To appear in Google Jobs search results, each job page includes structured data (JobPosting schema). This happens automatically—no additional configuration needed.

## Security Features

- File upload validation (type and size)
- Server-side form validation
- SMTP authentication
- Privacy policy consent requirement
- Secure file handling

## Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Option 2: Custom Server

1. Build the application: `npm run build`
2. Set up environment variables on your server
3. Run: `npm start`
4. Use a process manager like PM2 for production

### Domain Setup

For best results:
- Use a subdomain: `careers.301atech.com` or `jobs.301atech.com`
- Or use a path on your main domain: `301atech.com/careers`
- Update all URLs in the code accordingly

## Future Enhancements

Consider adding:
- Database integration (PostgreSQL, MongoDB)
- Admin dashboard for job management
- Application tracking and status updates
- Email templates customization
- Analytics integration
- CAPTCHA for spam protection
- Integration with applicant tracking systems (ATS)

## Support

For questions or issues:
- Email: recruit@301atech.com
- Company website: https://301atech.com

## License

© 2025 301A TECH LTD. All rights reserved.
