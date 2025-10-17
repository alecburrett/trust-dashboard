# Trust Dashboard

A complete carbon copy of Vanta's trust dashboard, built with Next.js 15 and designed for deployment on Vercel. This dashboard provides transparency around security, compliance, and trust for your organization.

## Features

### Public-Facing
- **Branded Homepage** - Customizable header, logo, colors, and company information
- **Certifications Page** - Display SOC 2, ISO 27001, GDPR, and other compliance certifications
- **Security Controls** - Real-time view of active security controls and monitoring
- **Privacy Policy** - Comprehensive privacy and data protection information
- **Reports & Documents** - Gated access to security reports and audit documents
- **AI Chat Assistant** - Simple FAQ chatbot for security questions

### Admin Dashboard
- **Branding Customization** - Configure colors, fonts, logo, and header images
- **Certification Management** - Add, edit, and manage compliance certifications
- **Security Controls** - Manage active security controls and their status
- **Document Management** - Upload and manage gated documents
- **Access Request Review** - Approve/deny document access requests
- **Authentication** - Secure admin login with NextAuth.js

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** In-memory (easily upgradeable to Vercel Postgres)
- **Deployment:** Vercel-ready
- **Form Validation:** Zod + React Hook Form

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 3. Create Admin User

First, start the development server:
```bash
npm run dev
```

Then create your admin user:
```bash
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-secure-password","name":"Admin"}'
```

### 4. Access the Dashboard

- **Public Site:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin

## Project Structure

```
trust-dashboard/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── branding/       # Branding customization
│   │   ├── login/          # Admin login
│   │   └── page.tsx        # Admin dashboard home
│   ├── api/                # API routes
│   │   ├── admin/          # Protected admin APIs
│   │   └── auth/           # NextAuth routes
│   ├── certifications/     # Public certifications page
│   ├── security/           # Public security controls page
│   ├── privacy/            # Public privacy policy
│   ├── reports/            # Public reports page
│   └── page.tsx            # Public homepage
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── public/             # Public-facing components
│   └── admin/              # Admin-specific components
├── lib/
│   ├── db/                 # Database layer
│   ├── types/              # TypeScript types
│   ├── utils.ts            # Utility functions
│   └── auth.ts             # NextAuth configuration
└── public/                 # Static assets
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Configure environment variables:
   - `NEXTAUTH_URL` - Your production URL
   - `NEXTAUTH_SECRET` - Generate a new secure secret
3. Deploy!

### 3. Set Up Production Database (Optional)

For production, upgrade to Vercel Postgres:

1. In Vercel dashboard, go to Storage → Create Database → Postgres
2. Copy connection strings to environment variables
3. Follow migration guide in `lib/db/README.md`

## Customization

### Branding

1. Log into admin dashboard at `/admin/login`
2. Navigate to "Branding" section
3. Customize:
   - Company name and tagline
   - Primary color
   - Logo URL (use Vercel Blob for hosting)
   - Header image URL
   - Font family

### Adding Certifications

Via Admin UI:
1. Go to `/admin/certifications`
2. Click "Add Certification"
3. Fill in details (name, type, status, dates, etc.)

Via API:
```bash
curl -X POST http://localhost:3000/api/admin/certifications \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{
    "name": "SOC 2 Type II",
    "type": "SOC2",
    "status": "active",
    "description": "Service Organization Control 2 certification"
  }'
```

### Adding Security Controls

Similar to certifications, manage via admin UI at `/admin/controls`

## Upgrading to Production Database

The project uses an in-memory database for simplicity. For production:

### Option 1: Vercel Postgres

```bash
npm install @vercel/postgres
```

See `lib/db/README.md` for migration guide and SQL schema.

### Option 2: Vercel KV (Redis)

```bash
npm install @vercel/kv
```

Great for simpler data models with smaller datasets.

## Features Roadmap

Future enhancements you can add:

- [ ] Real-time compliance monitoring integrations
- [ ] Email notifications for access requests
- [ ] More sophisticated AI chatbot (OpenAI integration)
- [ ] Multi-tenant support
- [ ] Advanced analytics and reporting
- [ ] Custom domain per tenant
- [ ] SSO integration
- [ ] Audit logging
- [ ] Webhook notifications

## API Documentation

### Public APIs

- `GET /api/admin/branding` - Get branding configuration
- `GET /api/admin/certifications` - List all certifications
- `GET /api/admin/controls` - List all security controls

### Admin APIs (Requires Authentication)

- `POST /api/admin/certifications` - Create certification
- `PATCH /api/admin/certifications/[id]` - Update certification
- `DELETE /api/admin/certifications/[id]` - Delete certification
- `PATCH /api/admin/branding` - Update branding
- `POST /api/admin/init` - Create first admin user (no auth required)

## Security Considerations

- Change default admin credentials immediately
- Use strong `NEXTAUTH_SECRET` in production
- Enable HTTPS in production (automatic with Vercel)
- Review and customize privacy policy content
- Implement rate limiting for public APIs
- Consider adding CAPTCHA for access request forms
- Regularly update dependencies

## Support & Contribution

This is a starter template. Feel free to:
- Customize for your needs
- Add additional features
- Improve security controls
- Enhance the admin dashboard

## License

MIT License - feel free to use for commercial projects.

## Acknowledgments

Inspired by Vanta's Trust Center design and functionality.
