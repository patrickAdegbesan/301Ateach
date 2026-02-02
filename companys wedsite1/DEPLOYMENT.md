# 301A TECH LTD - Deployment Guide

## Quick Start (Development)

The development server is already running at:
**http://localhost:3000**

## Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production Server
npm start

# Lint Code
npm run lint
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Configure domain and environment variables
4. Deploy automatically on every push

**Benefits:**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Optimal Next.js performance

### Option 2: Self-Hosted (VPS/Cloud)

#### Prerequisites
- Node.js 18+
- nginx or Apache (for reverse proxy)
- SSL certificate

#### Steps

1. **Clone and Install**
```bash
git clone <your-repo>
cd companys-wedsite1
npm install
npm run build
```

2. **Start with PM2**
```bash
npm install -g pm2
pm2 start npm --name "301a-tech" -- start
pm2 save
pm2 startup
```

3. **nginx Configuration**
```nginx
server {
    listen 80;
    server_name 301atech.com www.301atech.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Enable HTTPS with Let's Encrypt**
```bash
sudo certbot --nginx -d 301atech.com -d www.301atech.com
```

### Option 3: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t 301a-tech .
docker run -p 3000:3000 301a-tech
```

## Environment Variables

Create `.env.local`:
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://301atech.com

# Email Configuration (for contact form)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# Analytics (optional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Post-Deployment Checklist

### Essential
- [ ] Test all pages load correctly
- [ ] Verify contact form submission
- [ ] Check mobile responsiveness
- [ ] Test navigation on all pages
- [ ] Verify SEO meta tags
- [ ] Test page load speeds (<3s target)

### SEO & Performance
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check Core Web Vitals
- [ ] Set up Google Analytics (optional)

### Security
- [ ] Verify HTTPS is enforced
- [ ] Check security headers
- [ ] Test form validation
- [ ] Review error handling
- [ ] Enable rate limiting (if applicable)

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Monitor performance metrics
- [ ] Set up backup schedule

## Custom Domain Setup

### DNS Records (Point to hosting)

```
A Record:    @       -> Your server IP
A Record:    www     -> Your server IP
```

Or for Vercel:
```
CNAME:       www     -> cname.vercel-dns.com
A Record:    @       -> 76.76.21.21
```

## Content Updates

### Updating Contact Information

Edit: `app/contact/page.tsx` and `components/Footer.tsx`

### Adding New Services

1. Create new file: `app/services/[service-name]/page.tsx`
2. Update navigation: `components/Header.tsx`
3. Add to sitemap: `app/sitemap.ts`

### Updating Company Information

Edit: `app/about/page.tsx`

## Performance Optimization

### Image Optimization
- Use Next.js `<Image>` component
- Store images in `/public` folder
- Provide width/height attributes

### Code Splitting
- Already implemented via Next.js App Router
- Dynamic imports for heavy components

### Caching
- Static pages cached automatically
- API routes can use ISR or SSG

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

### Styles Not Loading
```bash
# Rebuild Tailwind
npm run build
```

## Support

For technical issues:
- Check Next.js documentation: https://nextjs.org/docs
- Review Tailwind CSS docs: https://tailwindcss.com/docs

## License

© 2025 301A TECH LTD. All rights reserved.
