# Stripe Integration Setup Guide

## Overview
The recruitment platform now includes Stripe payment integration for the "Boost Application" feature. Applicants can pay £5.00 to have their application appear at the top of the hiring manager's list for 7 days.

## Setup Steps

### 1. Create a Stripe Account
1. Go to https://stripe.com and sign up
2. Complete your account setup
3. Navigate to the Dashboard

### 2. Get Your API Keys
1. In Stripe Dashboard, go to **Developers** → **API keys**
2. You'll see:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode) - Click "Reveal" to see it

### 3. Update Environment Variables
Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

For production, replace with live keys (starts with `pk_live_` and `sk_live_`)

### 4. Set Up Webhook (for production)
Webhooks allow Stripe to notify your app when payments are completed.

#### Local Testing (Development)
Use Stripe CLI:
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3001/api/stripe-webhook
```

This will give you a webhook secret (starts with `whsec_`). Add it to `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### Production Setup
1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your production URL: `https://yourdomain.com/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** and add to your production environment variables

### 5. Test the Integration

#### Test Mode
1. Start your development server: `pnpm dev`
2. Go to a job posting and fill out an application
3. Check the "Boost My Application" checkbox
4. Submit the application
5. You'll be redirected to Stripe Checkout
6. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any postal code
7. Complete payment
8. You'll be redirected to the success page
9. Check admin dashboard - application should now be marked as "Boosted"

### 6. Verify Webhook Working
1. Make a test payment
2. Check your terminal/logs for: `Application {id} boosted successfully via Stripe payment`
3. In Stripe Dashboard, go to **Developers** → **Webhooks** → Your webhook
4. Check the "Events" tab to see if events are being received

### 7. Update Database Schema
Run this command to add the new fields to your database:
```bash
npx prisma db push
```

## How It Works

### User Flow:
1. User fills out job application
2. Optionally checks "Boost My Application - £5.00"
3. Submits application (saved to database as non-boosted)
4. If boost selected, redirected to Stripe Checkout
5. Completes payment on Stripe's secure page
6. After successful payment, redirected to success page
7. Stripe webhook notifies your app
8. Application updated to `boosted: true` with 7-day expiry

### Admin View:
1. Boosted applications appear with ⭐ star icon
2. Sorted to top of applications list
3. Shows "Active" or "Expired" status
4. Boost expiry date displayed

## Pricing
- **Amount**: £5.00 per boost
- **Duration**: 7 days
- **Currency**: GBP (British Pounds)

To change the price, edit `app/api/create-boost-checkout/route.ts`:
```typescript
unit_amount: 500, // £5.00 in pence (change this)
```

## Security Notes
- ✅ Secret keys never exposed to client
- ✅ Webhook signature verification prevents tampering
- ✅ Payment processed on Stripe's secure servers
- ✅ No credit card data touches your server
- ✅ Application saved before payment (no data loss if payment fails)

## Troubleshooting

### Webhook not working
- Check STRIPE_WEBHOOK_SECRET is set correctly
- Verify webhook endpoint in Stripe Dashboard matches your URL
- Check that `checkout.session.completed` event is selected
- Review webhook logs in Stripe Dashboard

### Payment succeeds but application not boosted
- Check webhook logs in your app
- Verify webhook secret is correct
- Check database for the application
- Look for errors in server logs

### Test card not working
- Ensure using test mode keys (starts with `sk_test_` and `pk_test_`)
- Try card 4242 4242 4242 4242
- Use any future date and any CVC

## Production Checklist
- [ ] Switch to live Stripe keys (pk_live_ and sk_live_)
- [ ] Set up production webhook endpoint
- [ ] Update NEXT_PUBLIC_BASE_URL to production domain
- [ ] Test with real payment in Stripe test mode first
- [ ] Set up Stripe webhook monitoring/alerts
- [ ] Enable Stripe Radar (fraud prevention)
- [ ] Set up email notifications for successful payments

## Support
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Test Cards: https://stripe.com/docs/testing
