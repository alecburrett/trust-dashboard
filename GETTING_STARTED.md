# Getting Started with Trust Dashboard

## Quick Setup (5 minutes)

### 1. Start the Development Server

```bash
npm run dev
```

The server will start at http://localhost:3000

### 2. Create Your Admin Account

In a new terminal, run:

```bash
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: "application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!",
    "name": "Admin User"
  }'
```

### 3. Log In to Admin Dashboard

1. Navigate to http://localhost:3000/admin/login
2. Use the credentials you just created
3. You'll be redirected to the admin dashboard

### 4. Customize Your Branding

1. In the admin dashboard, click "Branding"
2. Update:
   - Company name
   - Tagline
   - Primary color
   - Logo URL (optional)
   - Header image URL (optional)
3. Click "Save Changes"

### 5. View Your Public Dashboard

Navigate to http://localhost:3000 to see your trust dashboard!

## What's Included Out of the Box

### Pre-loaded Data

The dashboard comes with sample data:
- 3 compliance certifications (SOC 2, ISO 27001, GDPR)
- 4 security controls (MFA, Encryption, Audits, IDS)
- Default branding configuration

### Pages Available

**Public Pages:**
- `/` - Homepage with overview
- `/certifications` - All certifications
- `/security` - Security controls
- `/privacy` - Privacy policy
- `/reports` - Documents and reports

**Admin Pages:**
- `/admin` - Admin dashboard
- `/admin/login` - Login page
- `/admin/branding` - Customize branding
- `/admin/certifications` - Manage certifications
- `/admin/controls` - Manage security controls

## Next Steps

### Add Your Own Certifications

1. Go to `/admin` (you'll need this once we build the certifications management page)
2. Click "Certifications"
3. Add your actual certifications with real data

### Customize Content

1. Edit security controls to match your actual systems
2. Update privacy policy in `app/privacy/page.tsx`
3. Add your company's actual documentation

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to deploy your dashboard!

### Upgrade to Production Database

For production use, migrate to Vercel Postgres:

1. Create a Postgres database in Vercel dashboard
2. Copy connection strings to `.env`
3. Follow migration guide in `lib/db/README.md`

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use a different port
PORT=3001 npm run dev
```

### Admin Login Not Working

1. Make sure you created an admin user via the `/api/admin/init` endpoint
2. Check that `.env` file exists with `NEXTAUTH_SECRET`
3. Clear browser cookies and try again

### Build Errors

```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev
```

## Tips

- The chatbot has basic FAQ responses about security topics
- All data is stored in memory and will reset on server restart
- For production, definitely upgrade to a real database
- Customize the AI chatbot responses in `components/public/AIChat.tsx`

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the code - it's well-commented and organized
- Search for similar Next.js/NextAuth issues online

Happy building! 🚀
