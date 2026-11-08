# Yoganathan A — Premium Freelancer Portfolio

A high-end, production-ready developer portfolio website engineered for **Yoganathan A**, showcasing Web Application Development, Mobile Application Development, Full-Stack Development, and Custom Software Solutions.

Inspired by the visual identity of the Tomasz Gajda portfolio, this project recreation elevates the concept with an original, modern design, interactive 3D WebGL elements, smooth animations, a secure Supabase backend with Row Level Security (RLS), and an administrative control panel.

---

## 🚀 Key Highlights & Architectural Features

### 1. Tomasz Gajda-Inspired Hero Section
- **Split-Screen Canvas:** Framed layout with generous white outer margins.
- **Color Geometry:** Light grey background (`#D7D7D7`) on the left, pure black background (`#000000`) on the right, seamlessly separated by a diagonal angled polygon divider.
- **Personal Introduction:** Left-aligned intro ("Hi, I'm", "YOGANATHAN A", "Full-Stack Developer | Web & Mobile App Developer"), tagline, action buttons ("Explore My Work", "Let's Work Together"), and social links.
- **Profile Presentation:** Professionally framed profile photograph with an active contract status pill.
- **Responsive Stacking:** Converts cleanly into a stacked layout on tablets and mobile phones with zero horizontal overflow.
- **Navigation:** Sticky header with branded monogram logo, section highlighting, and white rounded `CONTACT ME` button.

### 2. Comprehensive Website Sections
- **About Me:** Bio highlighting development interests, approach to business problem-solving, reliable application goals, Download Resume button, and an interactive 3D WebGL element.
- **Services:** 6 cards with Lucide icons, service checklists, and hover effects:
  1. Web Development
  2. Mobile App Development
  3. Full-Stack Development
  4. UI/UX Development
  5. Database Development
  6. Deployment & Maintenance
- **Skills & Technologies:** Organized into Frontend, Backend, Database, Mobile, and Tools with interactive category filtering.
- **Portfolio Showcase:** Case study cards with category filters (All, Web Applications, Mobile Applications, Full-Stack Projects, UI/UX Designs), technology pills, and direct links to live demos, GitHub repositories, and dedicated slug detail pages (`/projects/[slug]`).
- **Structured Work Process:** Modern 6-step lifecycle timeline (`01 Discover`, `02 Plan & Design`, `03 Develop`, `04 Test`, `05 Deploy`, `06 Maintain`).
- **Contact Section:** "Have a Project in Mind?", React Hook Form + Zod validation, honeypot anti-spam protection, Supabase storage, and Resend email dispatch.
- **Footer:** Brand logo, navigation links, social networks, dynamic copyright year, and a smooth back-to-top button.

### 3. Dedicated Admin Dashboard (`/admin`)
- Accessible via `/admin` with Supabase Auth integration.
- Real-time telemetry metrics: Total Projects, Published Projects, Total Inquiries, Unread Inquiries.
- Full CRUD project management: Create, update, toggle publish/draft, and delete with confirmation.
- Inquiries manager: Filter incoming client leads by status (`unread`, `read`, `replied`, `archived`) and reply directly via email.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS, Radix UI Primitives, Lucide React Icons |
| **Motion & 3D** | Framer Motion, Three.js (WebGL Canvas) |
| **Backend & DB** | Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS) |
| **Email Service** | Resend API |
| **Forms & Validation** | React Hook Form, Zod |
| **Testing** | Vitest (Unit & Component), Playwright (End-to-End) |
| **Deployment** | Vercel (Edge Network) & Supabase |

---

## 📁 Directory Structure

```text
├── actions/                  # Next.js Server Actions (Contact dispatch, Admin CRUD)
├── app/                      # Next.js App Router routes & layouts
│   ├── admin/                # Admin Console (Overview, Projects, Messages, Login)
│   ├── projects/[slug]/      # Dynamic case study detail pages (SSG/ISR)
│   ├── robots.txt/           # Search engine crawler directive endpoint
│   ├── sitemap.xml/          # Dynamic XML sitemap endpoint
│   ├── error.tsx             # Global application error boundary
│   ├── globals.css           # Tailwind CSS directives & color variables
│   ├── layout.tsx            # Root layout with fonts, SEO & desktop cursor
│   ├── loading.tsx           # Suspense loading state
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Homepage assembling all portfolio sections
├── components/
│   ├── 3d/                   # Three.js interactive 3D WebGL canvas
│   ├── admin/                # Admin dashboard management components
│   ├── layout/               # Sticky Navbar, Footer
│   ├── projects/             # Project cards & detail views
│   ├── sections/             # Hero, About, Services, Skills, Process, Contact
│   └── ui/                   # Reusable UI primitives (Button, Input, Textarea, Badge, Cursor)
├── data/                     # Central configuration files (Profile, Services, Skills, Process)
├── e2e/                      # Playwright end-to-end test scenarios
├── lib/                      # Supabase clients (Client, Server, Admin), utility helpers
├── public/                   # Static assets (SVGs, Resume PDF, Project imagery)
├── supabase/
│   ├── migrations/           # 01_init.sql (Postgres schema, tables, RLS policies, buckets)
│   └── seed.sql              # Initial production project records
└── __tests__/                # Vitest unit test suites
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Populate the variables with your actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"

# Supabase Server-Only Service Role Key (Used for secure server actions)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Resend API Key (for client inquiry email delivery)
RESEND_API_KEY="re_your_api_key_here"

# Destination email where inquiries are sent
CONTACT_NOTIFICATION_EMAIL="yoganathan.developer@gmail.com"

# Authorized Administrator Email
ADMIN_EMAIL="yoganathan.developer@gmail.com"

# Site Canonical URL
NEXT_PUBLIC_SITE_URL="https://yoganathan.dev"
```

> **Note on Local Development:** The application includes graceful fallbacks. If Supabase is not yet configured, the portfolio automatically operates using the local fallback store in `data/projects.ts` and in-memory inquiries, enabling seamless development without database lock-in.

---

## 🗄️ Database Setup & Migrations (Supabase)

1. **Create a Supabase Project:**
   Log in to [Supabase](https://supabase.com) and create a new project.

2. **Execute Migrations:**
   In your Supabase Dashboard, open the **SQL Editor** and paste the contents of:
   `supabase/migrations/01_init.sql`
   Click **Run**. This establishes:
   - `projects` table with search and category indexes
   - `contact_messages` table with inquiry statuses
   - `admin_users` table linking to Supabase Auth
   - Row Level Security (RLS) policies allowing public read access to published projects while securing private inquiries and drafts to admins only.
   - `project-images` Supabase Storage bucket with public read policies.

3. **Seed Initial Case Studies:**
   In the **SQL Editor**, run:
   `supabase/seed.sql`

4. **Grant Administrator Access:**
   In Supabase Dashboard -> **Authentication** -> **Users**, create your admin user (or sign up via Supabase Auth). Then run this SQL query replacing with your user's UUID:
   ```sql
   INSERT INTO public.admin_users (user_id)
   VALUES ('your-user-uuid-here');
   ```

---

## 🏃 Local Development & Build Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Unit Tests (Vitest)
```bash
npm test
```

### 4. Run End-to-End Tests (Playwright)
```bash
npm run test:e2e
```

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deployment to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Yoganathan A portfolio website"
   git remote add origin https://github.com/your-username/yoganathan-portfolio.git
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Under **Environment Variables**, add the environment variables defined in `.env.example`.
4. Click **Deploy**. Vercel will build and deploy the Next.js application with automatic ISR caching and Edge optimization.

---

## 📄 License
MIT License. Created for **Yoganathan A**.

