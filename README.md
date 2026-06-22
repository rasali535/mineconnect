# ⛏️ MineConnect

> The all-in-one platform for mining operations — supplier management, contractor compliance, recruitment, community investment, and AI-powered insights.

![MineConnect Dashboard](./public/screenshot-placeholder.png)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/rasali535/mineconnect.git
cd mineconnect
npm install
```

### 2. Configure Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.local .env.local.example
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

In your Supabase project SQL Editor, run the migration script:

```bash
# Copy contents of supabase/schema.sql and paste into Supabase SQL Editor
```

Or use the Supabase CLI:

```bash
supabase db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── auth/
│   │   ├── login/page.tsx          # Sign in
│   │   └── signup/page.tsx         # Register
│   └── dashboard/
│       ├── layout.tsx              # Dashboard shell (sidebar + topbar)
│       ├── page.tsx                # Executive overview
│       ├── suppliers/page.tsx      # Supplier management
│       ├── compliance/page.tsx     # Contractor compliance
│       ├── recruitment/page.tsx    # Recruitment portal
│       ├── community/page.tsx      # CSI / Community portal
│       ├── ai/page.tsx             # MineIQ AI assistant
│       └── settings/page.tsx       # Account settings
├── lib/
│   ├── utils.ts                    # Helper functions
│   └── supabase/
│       ├── client.ts               # Browser Supabase client
│       ├── server.ts               # Server Supabase client
│       └── middleware.ts           # Session refresh middleware
├── middleware.ts                   # Next.js route middleware
└── globals.css                     # Design system CSS
supabase/
└── schema.sql                      # Database schema & RLS policies
```

---

## 🏗️ Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | Next.js 15 (App Router) |
| Language    | TypeScript |
| Styling     | Vanilla CSS (custom design system) |
| Database    | Supabase (PostgreSQL) |
| Auth        | Supabase Auth |
| AI          | Google Gemini (via Genkit) |
| Deployment  | Vercel |

---

## 🧩 Modules

| Module | Description |
|--------|-------------|
| **Dashboard** | Executive KPIs, compliance overview, activity feed |
| **Suppliers** | Full supplier lifecycle management, risk scoring |
| **Compliance** | Contractor SHEQ/ISO/permit tracking with alerts |
| **Recruitment** | Job postings + applicant pipeline with AI scoring |
| **Community** | CSI project tracking + community feed |
| **MineIQ AI** | AI assistant with RAG over your operational data |
| **Settings** | Profile, notifications, account management |

---

## 🔐 Authentication

- Email/password via Supabase Auth
- Google OAuth (configure in Supabase Dashboard)
- All `/dashboard/*` routes are protected via middleware
- Row-Level Security on all database tables

---

## 🌍 Deployment

### Deploy to Vercel

```bash
npx vercel
```

Add the same environment variables in your Vercel project settings.

---

## 📄 License

MIT — Built for Africa's mining industry.
