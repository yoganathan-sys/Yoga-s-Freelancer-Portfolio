# Yoganathan A — Senior Freelancer & Full-Stack Developer Portfolio

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-black?style=flat&logo=resend)](https://resend.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Testing-2EAD33?style=flat&logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A high-performance, responsive developer portfolio engineered for **Yoganathan A**, showcasing Web Application Development, Cross-Platform Mobile Apps, Full-Stack Architecture, and Relational Database Engineering.

Repository: **[https://github.com/yoganathan-sys/Yoga-s-Freelancer-Portfolio.git](https://github.com/yoganathan-sys/Yoga-s-Freelancer-Portfolio.git)**

---

## 🌟 Key Features & Architectural Highlights

### 1. Tomasz Gajda-Inspired Hero Section
- **Split-Screen Geometry:** Framed canvas layout with generous outer white margins.
- **Asymmetric Color Division:** Light grey background (`#D7D7D7`) on the left, pure black background (`#000000`) on the right, seamlessly divided by a high-precision diagonal polygon.
- **Authentic Profile Photograph:** Real profile photograph placed cleanly within the black canvas with an active contract status pill: *"Available for Contracts • Web & Mobile"*.
- **Quick Actions & Socials:** Direct call-to-actions (*"Explore My Work"*, *"Let's Work Together"*), alongside verified links for GitHub, LinkedIn, YouTube, and direct WhatsApp chat.

### 2. Verified Real Client Projects
Showcases genuine, deployed client web development projects with authentic media, screenshots, and live domain links:
1. **RO Water Website** — Commercial and domestic RO water purifier sales, online service booking, and catalog platform.
   - **Live Website:** [https://ro-water-rouge.vercel.app/](https://ro-water-rouge.vercel.app/)
   - **Stack:** Next.js, React, TypeScript, Tailwind CSS, Responsive Web Design
2. **Medical Shop Website** — Complete digital pharmacy platform featuring prescription inquiries, medicine catalog, PWA installability, and pharmacist consultation.
   - **Live Website:** [https://medical-project-wine-one.vercel.app/](https://medical-project-wine-one.vercel.app/)
   - **Stack:** Next.js, React, Tailwind CSS, PWA, Vercel

### 3. Dedicated YouTube Content Creator Section
- Highlights **Yoga's Study Zone** (`@yogasstudyzone`), Yoganathan's educational technology channel.
- Direct links to subscribe, visit the channel, and view programming walkthroughs and web development tutorials.
- Channel URL: [https://www.youtube.com/@yogasstudyzone](https://www.youtube.com/@yogasstudyzone)

### 4. Professional Resume Integration
- **Direct PDF Download:** High-visibility *"Download Resume"* action downloading [`public/resume.pdf`](./public/resume.pdf).
- **Dedicated Web Resume Route:** Accessible at `/resume` with embedded PDF viewer, print styling, and section-by-section breakdown.

### 5. Multi-Channel Contact & WhatsApp Workflow
- **Interactive Location Card:** Detects visitor geolocation via the browser Geolocation API and opens precise Google Maps coordinates, with fallback to [Google Maps Location](https://maps.app.goo.gl/tpTi2YUs5Q9t15F67).
- **Contact Form:** Full Name, Email Address, optional Customer Phone / WhatsApp Number, Project Type, Budget Range, and Project Description.
- **WhatsApp Click-to-Chat Integration:** Upon successful form submission, generates a prefilled WhatsApp message to `+91 90252 81363` (`https://wa.me/919025281363?text=...`) for immediate discussion.
- **Automatic Email Notifications:** Dispatches complete project enquiries to `yoganathan162008@gmail.com` via the Resend API with admin delivery tracking.
- **Database Persistence:** Inquiries are stored in Supabase PostgreSQL with anti-spam honeypot defense.

### 6. Interactive 3D WebGL Canvas
- Embedded Three.js / React Three Fiber interactive 3D model in the About section with smooth orbit controls and hover physics.

### 7. Administrative Control Center (`/admin`)
- Secure admin dashboard protected by Supabase Auth.
- Real-time inquiry manager with status filters (`unread`, `read`, `replied`, `archived`) and one-click email retry pipelines.
- Project CRUD manager for publishing, updating, and managing case studies.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS 3, Radix UI Primitives, Lucide Icons |
| **Animations & 3D** | Framer Motion, Three.js, React Three Fiber, Drei |
| **Database & Auth** | Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS) |
| **Email API** | Resend API |
| **Form Handling** | React Hook Form, Zod Validation |
| **Testing** | Vitest (Unit / Component), Playwright (E2E) |
| **Hosting & CDN** | Vercel (Edge Network) |

---

## 📁 Repository Structure

```text
├── actions/                  # Next.js Server Actions (Contact form dispatch, Admin CRUD)
├── app/                      # App Router pages and API routes
│   ├── admin/                # Admin Console (Overview, Projects, Inquiries, Login)
│   ├── api/contact/          # RESTful endpoint for inquiry submissions
│   ├── projects/[slug]/      # Dynamic case study detail pages with lightbox & video
│   ├── resume/               # Dedicated web resume page with embedded PDF viewer
│   ├── layout.tsx            # Root layout with fonts, metadata & smooth scroll
│   ├── page.tsx              # Homepage assembling all portfolio sections
│   ├── robots.txt            # Search engine crawler directive endpoint
│   └── sitemap.xml           # Dynamic XML sitemap
├── components/
│   ├── 3d/                   # Three.js 3D canvas components
│   ├── admin/                # Admin management UI & inquiries table
│   ├── contact/              # Interactive Geolocation Location Card
│   ├── layout/               # Sticky Navbar, Gajda-inspired theme header, Footer
│   ├── projects/             # Project cards, filter tabs, lightbox & video player
│   ├── sections/             # Hero, About, Services, Skills, Process, YouTube, Contact
│   └── ui/                   # Reusable UI primitives (Buttons, Inputs, Textareas, WhatsApp icon)
├── data/                     # Central data configurations (Profile, Projects, Services, Skills)
├── e2e/                      # Playwright end-to-end test suites
├── lib/                      # Supabase clients, Resend email service, WhatsApp url generator
├── public/                   # Static assets (Resume PDF, project images, profile photo)
├── supabase/
│   ├── migrations/           # SQL migration files (01_init, 02_email_status, 03_add_phone)
│   └── seed.sql              # Initial project and schema data
├── __tests__/                # Vitest unit test suites
├── .env.example              # Environment variables template
├── .gitignore                # Comprehensive Git ignore rules
├── LICENSE                   # MIT License
├── package.json              # Project dependencies and npm scripts
└── playwright.config.ts      # Playwright test configuration
```

---

## ⚙️ Environment Variables

Copy `.env.example` to create your local `.env.local`:

```bash
cp .env.example .env.local
```

Configure the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"

# Supabase Server Service Role Key (Used for secure server actions)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Resend API Key (for email notifications)
RESEND_API_KEY="re_your_api_key_here"

# Destination notification email
CONTACT_NOTIFICATION_EMAIL="yoganathan162008@gmail.com"

# Authorized Administrator Email
ADMIN_EMAIL="yoganathan162008@gmail.com"

# Site Canonical URL
NEXT_PUBLIC_SITE_URL="https://yoganathan.dev"
```

> **Note:** If Supabase is not configured locally, the application automatically runs in graceful in-memory fallback mode using `data/projects.ts`, ensuring zero development blockers.

---

## 🗄️ Database Setup (Supabase)

1. Create a project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** and run the migrations in order:
   - `supabase/migrations/01_init.sql` (Tables, indexes, and RLS policies)
   - `supabase/migrations/02_add_email_status.sql` (Email delivery audit status)
   - `supabase/migrations/03_add_phone_column.sql` (Customer phone column)
3. *(Optional)* Seed initial client projects:
   - Run `supabase/seed.sql`

---

## 🏃 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 3. Run Unit Tests
```bash
npm test
```

### 4. Run End-to-End Tests
```bash
npm run test:e2e
```

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🚀 Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Configure the Environment Variables matching `.env.example`.
4. Click **Deploy**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

Developed with pride by **Yoganathan A** ([@yoganathan-sys](https://github.com/yoganathan-sys)).
