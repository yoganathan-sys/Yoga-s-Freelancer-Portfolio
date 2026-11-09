-- ==============================================================================
-- Yoganathan A — Supabase Initial Seed Data (Verified Client Projects Only)
-- ==============================================================================

INSERT INTO public.projects (id, title, slug, short_description, full_description, category, technologies, cover_image, live_url, github_url, featured, published, created_at, updated_at)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'R-Tech Pure Water — Commercial & Domestic RO Web Platform',
    'r-tech-pure-water',
    'A complete commercial and domestic RO water purifier sales & service web application built for R-Tech Pure Water in Tirupattur, featuring online service booking, product catalogs, and direct customer communication channels.',
    'R-Tech Pure Water is a production web application engineered for a premier water purification sales and service business located in Tirupattur, Tamil Nadu. The business required an authentic digital storefront to replace manual inquiry handling, present their commercial and domestic reverse-osmosis (RO) products, showcase 99.9% purity benchmarks, and streamline incoming technician service appointments.',
    'Web Applications',
    ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive Web Design', 'WhatsApp API'],
    '/projects/client-1/images/client-6.png',
    'https://r-techpurewater.com',
    'https://github.com/yoganathan-sys',
    true,
    true,
    '2026-10-17 14:30:00+00',
    '2026-10-17 17:00:00+00'
),
(
    '00000000-0000-0000-0000-000000000002',
    'Sri Siva Medicals — Trusted Pharmacy & Healthcare Web Platform',
    'sri-siva-medicals',
    'A comprehensive digital pharmacy and healthcare platform built for Sri Siva Medicals, featuring online prescription inquiries, shop gallery, PWA app install, business hours, and pharmacist consultation.',
    'Sri Siva Medicals is an official healthcare and pharmacy web application created for Mr. Gangeyan M (Owner & Registered Pharmacist, D.Pharm) serving patients and families in Vadugamuthampatti and Kurusilapattu, Tamil Nadu. The platform bridges neighborhood community health needs with digital accessibility.',
    'Web Applications',
    ARRAY['Next.js', 'React', 'Tailwind CSS', 'PWA', 'Vercel', 'WhatsApp API'],
    '/projects/client-2/images/med-2.png',
    'https://sri-siva-medicals.vercel.app',
    'https://github.com/yoganathan-sys',
    true,
    true,
    '2026-11-06 21:50:00+00',
    '2026-11-06 22:35:00+00'
)
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    category = EXCLUDED.category,
    technologies = EXCLUDED.technologies,
    cover_image = EXCLUDED.cover_image,
    live_url = EXCLUDED.live_url,
    github_url = EXCLUDED.github_url,
    featured = EXCLUDED.featured,
    published = EXCLUDED.published;
