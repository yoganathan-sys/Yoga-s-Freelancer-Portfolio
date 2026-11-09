-- ==============================================================================
-- Yoganathan A — Supabase Initial Seed Data (Verified Client Projects Only)
-- ==============================================================================

INSERT INTO public.projects (id, title, slug, short_description, full_description, category, technologies, cover_image, live_url, github_url, featured, published, created_at, updated_at)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'RO Water Website',
    'ro-water-website',
    'A complete commercial and domestic RO water purifier sales & service web application featuring online service booking, product catalogs, and direct customer communication channels.',
    'RO Water Website is an authentic, production web application built for a premier water purification sales and service business in Tamil Nadu. The business required a dedicated digital platform to replace manual inquiry handling, showcase their commercial and domestic reverse-osmosis (RO) products, highlight 99.9% purity benchmarks, and streamline incoming customer service bookings.',
    'Web Application',
    ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive Web Design', 'WhatsApp API'],
    '/projects/client-1/images/client-6.png',
    'https://ro-water-rouge.vercel.app/',
    NULL,
    true,
    true,
    '2026-10-17 14:30:00+00',
    '2026-10-17 17:00:00+00'
),
(
    '00000000-0000-0000-0000-000000000002',
    'Medical Shop Website',
    'medical-shop-website',
    'A comprehensive digital pharmacy and healthcare platform featuring online prescription inquiries, shop gallery, PWA app install, business hours, and pharmacist consultation.',
    'Medical Shop Website is an official healthcare and pharmacy web application created for a registered pharmacist serving patients and families in Tamil Nadu. The platform bridges community health needs with digital accessibility, allowing customers to easily review available pharmaceutical categories, submit prescription inquiries, locate the clinic, and directly communicate with the pharmacist.',
    'Web Application',
    ARRAY['Next.js', 'React', 'Tailwind CSS', 'PWA', 'Vercel', 'WhatsApp API'],
    '/projects/client-2/images/med-2.png',
    'https://medical-project-wine-one.vercel.app/',
    NULL,
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
