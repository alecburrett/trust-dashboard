# Database Layer

## Current Implementation
This project currently uses an in-memory database for simplicity. Data is stored in memory and will reset when the server restarts.

## Migrating to Vercel Postgres

To upgrade to Vercel Postgres:

1. **Install Vercel Postgres package:**
   ```bash
   npm install @vercel/postgres
   ```

2. **Set up Vercel Postgres in your project:**
   - Go to your Vercel project dashboard
   - Navigate to Storage tab
   - Create a new Postgres database
   - Copy the connection strings to your `.env` file

3. **Create the database schema:**
   ```sql
   CREATE TABLE branding_config (
     id TEXT PRIMARY KEY,
     logo_url TEXT,
     header_image_url TEXT,
     primary_color TEXT NOT NULL,
     font_family TEXT NOT NULL,
     company_name TEXT NOT NULL,
     tagline TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE certifications (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     type TEXT NOT NULL,
     status TEXT NOT NULL,
     issue_date TIMESTAMP,
     expiry_date TIMESTAMP,
     document_url TEXT,
     badge_url TEXT,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE security_controls (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     category TEXT NOT NULL,
     status TEXT NOT NULL,
     description TEXT NOT NULL,
     last_checked TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE documents (
     id TEXT PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     type TEXT NOT NULL,
     file_url TEXT,
     is_gated BOOLEAN DEFAULT false,
     requires_nda BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE access_requests (
     id TEXT PRIMARY KEY,
     document_id TEXT NOT NULL,
     email TEXT NOT NULL,
     full_name TEXT NOT NULL,
     company TEXT,
     status TEXT NOT NULL,
     nda_signed BOOLEAN DEFAULT false,
     message TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW(),
     FOREIGN KEY (document_id) REFERENCES documents(id)
   );

   CREATE TABLE admin_users (
     id TEXT PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     name TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     last_login TIMESTAMP
   );

   CREATE TABLE tags (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     category TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE subscriptions (
     id TEXT PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     preferences JSONB NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Replace the database module** with Postgres queries using the `@vercel/postgres` SDK.

## Alternative: Use Vercel KV

For even simpler setup, you can use Vercel KV (Redis) instead:

```bash
npm install @vercel/kv
```

This works well for smaller datasets and requires minimal code changes.
