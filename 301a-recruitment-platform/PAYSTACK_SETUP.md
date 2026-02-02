# Paystack Setup Guide

## Overview
Your recruitment platform now uses **Paystack** for processing boost payments. Paystack is perfect for African markets (Nigeria, Ghana, Kenya, South Africa) and supports USD, NGN, GHS, ZAR, and KES.

## ✅ API Keys Already Configured
Your live Paystack keys are already in `.env.local`:
- Public Key: `pk_live_YOUR_PAYSTACK_PUBLIC_KEY`
- Secret Key: `sk_live_YOUR_PAYSTACK_SECRET_KEY`

## Pricing Structure
- **Basic**: $1.00 USD (3 days)
- **Standard**: $2.00 USD (7 days) - Default
- **Premium**: $3.00 USD (14 days)

## How It Works

### 1. Candidate Flow
1. Candidate fills out application form
2. Checks "Boost My Application" checkbox
3. Selects pricing tier (Basic/Standard/Premium)
4. Submits application
5. Redirects to Paystack checkout page
6. Pays with card, bank transfer, or USSD
7. After payment, redirects to success page
8. Application appears at top of admin list

### 2. Payment Processing
- Paystack handles all payment processing
- Supports cards (Visa, Mastercard, Verve)
- Bank transfers
- USSD codes
- Mobile money (Ghana, Kenya)

### 3. Webhook Verification
- Paystack sends webhook to: `/api/paystack-webhook`
- Signature verification for security
- Updates database with boost status
- Sets expiry date based on tier

## Testing

### Test Cards
Use Paystack test cards (change keys to test keys first):
- **Success**: `4084084084084081` (any CVV, future expiry)
- **Insufficient Funds**: `4084080000000408`
- **Declined**: `4084084084084081` with CVV `408`

### Test Mode Setup
1. Get test keys from Paystack Dashboard → Settings → API Keys & Webhooks
2. Replace in `.env.local`:
   ```
   PAYSTACK_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_TEST_PUBLIC_KEY
   ```
3. Test payments won't charge real money

## Webhook Setup

### Local Development
1. Install Paystack CLI or use ngrok:
   ```bash
   ngrok http 3001
   ```
2. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
3. Go to Paystack Dashboard → Settings → Webhooks
4. Add webhook URL: `https://abc123.ngrok.io/api/paystack-webhook`
5. Save

### Production
1. Deploy your app
2. Go to Paystack Dashboard → Settings → Webhooks
3. Add webhook URL: `https://yourdomain.com/api/paystack-webhook`
4. Select events: `charge.success`
5. Save

## Receiving Payouts

### Bank Account Setup
1. Go to Paystack Dashboard → Settings → Payout Settings
2. Add your bank account details
3. Choose payout frequency (daily, weekly, monthly)
4. Paystack transfers funds automatically

### Supported Banks
- All Nigerian banks
- Ghanaian banks
- South African banks
- Kenyan banks
- International USD transfers

## Currency Support
Current setup uses **USD**, but you can change to:
- **NGN** (Nigerian Naira)
- **GHS** (Ghanaian Cedi)
- **ZAR** (South African Rand)
- **KES** (Kenyan Shilling)

To change currency, update in `app/api/create-boost-checkout/route.ts`:
```typescript
currency: 'NGN', // Change from 'USD'
```

## Security

### Already Implemented
✅ Webhook signature verification
✅ HTTPS required for production
✅ Secret key stored in environment variables
✅ No sensitive data in client-side code

### Best Practices
- Never commit `.env.local` to git
- Use test keys for development
- Monitor transactions in Paystack Dashboard
- Set up email notifications for payments

## Troubleshooting

### Payment Not Updating Database
- Check webhook URL is correct
- Verify webhook signature
- Check Paystack Dashboard → Logs
- Look at server logs: `pnpm dev`

### Checkout Page Not Loading
- Verify public key in `.env.local`
- Check NEXT_PUBLIC_BASE_URL is correct
- Restart dev server after changing env variables

### Currency Conversion
If charging USD but receiving NGN:
- Paystack auto-converts at current exchange rate
- Small conversion fee (1.5%)
- Check Paystack Dashboard for rates

## Useful Links
- Paystack Dashboard: https://dashboard.paystack.com
- API Documentation: https://paystack.com/docs/api
- Support: support@paystack.com
- Test Cards: https://paystack.com/docs/payments/test-payments

## Support
Your live Paystack account is active. For issues:
1. Check Paystack Dashboard → Logs
2. Email support@paystack.com
3. Check this app's console logs

## Next Steps
1. ✅ API keys configured
2. ✅ Checkout route created
3. ✅ Webhook handler ready
4. ⏳ Test a payment
5. ⏳ Set up webhook in production
6. ⏳ Add bank account for payouts
