# 📧 Email Routing Guide - 301A TECH LTD

## Email Addresses Setup

We have strategically configured 3 professional email addresses for different purposes:

### 1. **info@301atech.com** - General Inquiries
- **Purpose**: General questions & information
- **Used for**: Default inquiries, general information requests
- **Shown on**: Contact page, footer (optional)

### 2. **sales@301atech.com** - Sales & Projects  
- **Purpose**: New projects & business partnerships
- **Used for**: Project inquiries, business deals, technical consultations
- **Shown on**: 
  - Contact page
  - Homepage hero "Email Sales" button
  - Contact page CTA "Email Sales" button
  
### 3. **support@301atech.com** - Support & Help
- **Purpose**: Technical support & customer assistance
- **Used for**: Help requests, troubleshooting, maintenance inquiries
- **Shown on**: Contact page

---

## 🎯 Smart Contact Form Routing

The contact form at `/contact` **automatically routes** submissions to the appropriate email based on the selected service:

### Routes to **sales@301atech.com**:
- Software Development
- Smart Homes
- Data Analytics
- Graphics Design

### Routes to **support@301atech.com**:
- Hardware Installation
- Networking & Security
- IT Training

### Routes to **info@301atech.com**:
- Any other service selection
- No service selected (default)

---

## 📍 Where Each Email Appears

| Location | Email Used | Button/Link Text |
|----------|-----------|------------------|
| Homepage Hero | sales@ | "Email Sales" |
| Contact Page - Email Options | All 3 | "General Inquiries", "Sales & Projects", "Support & Help" |
| Contact Page - Bottom CTA | sales@ | "Email Sales" |
| Contact Form API (automatic routing) | Dynamic | Based on service selected |

---

## ⚙️ Technical Implementation

### Backend (API Route)
- **File**: `/app/api/contact/route.ts`
- **Logic**: Smart routing based on `data.service` field
- **SMTP**: Configured via Zoho Mail (smtp.zoho.com:465)
- **Sender**: patrick.adegbesan@301atech.com
- **Environment Variables**:
  - `SMTP_HOST=smtp.zoho.com`
  - `SMTP_PORT=465`
  - `SMTP_USER=patrick.adegbesan@301atech.com`
  - `SMTP_PASS=[App Password]`
  - `CONTACT_TO=info@301atech.com` (default fallback)

### Frontend Display
- **Contact Page**: Shows all 3 emails with descriptions
- **Homepage**: Primary CTA uses sales@ for lead generation
- **Form Submission**: User doesn't see routing logic, emails sent automatically

---

## 🔒 DNS & Security

All email addresses are verified and secured with:
- ✅ MX Records (Zoho Mail servers)
- ✅ SPF Record (v=spf1 include:zoho.com ~all)
- ✅ DKIM Authentication
- ✅ TXT Verification Record

---

## 📊 Email Management

**Platform**: Zoho Mail (Mail Lite Plan - 5GB)
**Domain**: 301atech.com
**Access**: https://mail.zoho.com

Each email address is a **group email** that can have multiple members. To add team members:
1. Log into Zoho Mail
2. Go to Groups section
3. Add members to info@, sales@, or support@ groups

---

## 🚀 Next Steps (Optional)

1. **Set up autoresponders** in Zoho for each email group
2. **Add team members** to appropriate email groups
3. **Monitor email delivery** through Zoho Mail dashboard
4. **Create email templates** for common responses
5. **Set up email forwarding rules** if needed

---

## 📝 Testing

To test the contact form routing:
1. Visit https://301atech.com/contact
2. Fill out form with different service selections
3. Verify emails arrive at correct addresses
4. Check email headers to confirm routing logic

**Test Email Sent**: ✅ Successfully tested on [deployment date]
**Message ID**: d4b2ed1f-a479-6eec-bd20-5acc884f9563@301atech.com

---

*Last Updated: [deployment timestamp]*
*Version: 1.0*
