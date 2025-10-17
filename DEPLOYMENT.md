# Deployment Guide for Vercel

## Prerequisites

Before deploying, you'll need:
- A GitHub account (already done ✓)
- A Vercel account (sign up at vercel.com)
- Your repository pushed to GitHub (already done ✓)

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `alecburrett/trust-dashboard`
4. Click "Import"

### 2. Configure Environment Variables

**CRITICAL:** Before deploying, you MUST set the `NEXTAUTH_SECRET` environment variable.

In the Vercel project configuration:

1. Click on "Environment Variables"
2. Add the following variable:

```
Name: NEXTAUTH_SECRET
Value: [Generate a secure 32-character random string]
Environment: Production, Preview, Development
```

**Generate a secure secret:**
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

3. Add `NEXTAUTH_URL` (Vercel will auto-set this, but you can override):
```
Name: NEXTAUTH_URL
Value: https://your-domain.vercel.app
Environment: Production
```

### 3. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://trust-dashboard-xxx.vercel.app`

### 4. Create Your First Admin User

After deployment, you need to create an admin account:

**Option A: Using curl**
```bash
curl -X POST https://your-domain.vercel.app/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourdomain.com",
    "password": "YourSecurePassword123!",
    "name": "Admin User"
  }'
```

**Option B: Using Postman or similar**
- Method: POST
- URL: `https://your-domain.vercel.app/api/admin/init`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "email": "admin@yourdomain.com",
  "password": "YourSecurePassword123!",
  "name": "Admin User"
}
```

### 5. Access Your Dashboard

- **Public Site:** https://your-domain.vercel.app
- **Admin Login:** https://your-domain.vercel.app/admin/login

## Troubleshooting

### "Server Error" on Admin Pages

**Cause:** Missing `NEXTAUTH_SECRET` environment variable

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `NEXTAUTH_SECRET` with a secure random string
3. Redeploy: Deployments → (⋯) → Redeploy

### Build Fails

**Check the build logs** in Vercel dashboard for specific errors:
- TypeScript errors
- Missing dependencies
- Configuration issues

### Can't Login to Admin

1. Make sure you created an admin user via the `/api/admin/init` endpoint
2. Clear your browser cookies
3. Try an incognito/private window
4. Check Vercel Function Logs for errors

### Database Issues

The app uses in-memory storage by default. For production:

**Upgrade to Vercel Postgres:**
1. In Vercel Dashboard → Storage → Create Database → Postgres
2. Connect to your project
3. Copy connection strings to Environment Variables
4. Follow the migration guide in `lib/db/README.md`

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable to use your custom domain

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request

To manually redeploy:
1. Go to Deployments tab
2. Click (⋯) on any deployment
3. Select "Redeploy"

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXTAUTH_URL` | Yes* | Auto-set by Vercel | Your app's URL |
| `NEXTAUTH_SECRET` | **YES** | None | **MUST SET** - Random 32+ char string |
| `POSTGRES_URL` | No | N/A | Optional: Vercel Postgres connection |
| `BLOB_READ_WRITE_TOKEN` | No | N/A | Optional: Vercel Blob storage token |

*Auto-set by Vercel but can be overridden

## Security Checklist

Before going live:

- [ ] Set a strong `NEXTAUTH_SECRET`
- [ ] Create admin account with strong password
- [ ] Update company branding via `/admin/branding`
- [ ] Review and update privacy policy content
- [ ] Consider enabling Vercel's security features:
  - [ ] Vercel Firewall
  - [ ] DDoS Protection
  - [ ] Attack Challenge Mode

## Support

If you encounter issues:
1. Check Vercel Function Logs
2. Check browser console for errors
3. Review build logs
4. Check the README.md for additional help

---

**Your deployment is ready!** 🚀

Public site: https://your-domain.vercel.app
Admin login: https://your-domain.vercel.app/admin/login
