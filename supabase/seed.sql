-- ==============================================================================
-- Yoganathan A — Supabase Initial Seed Data
-- ==============================================================================

INSERT INTO public.projects (id, title, slug, short_description, full_description, category, technologies, cover_image, live_url, github_url, featured, published, created_at, updated_at)
VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'NexStore — Headless Enterprise Commerce Platform',
    'nexstore-headless-ecommerce',
    'A high-performance headless e-commerce store with server-side rendering, instant search, dynamic cart, and secure checkout integration.',
    'NexStore is a modern headless e-commerce solution engineered for scalability and lightning-fast load times. Built using Next.js App Router, Tailwind CSS, and Supabase PostgreSQL, it features real-time inventory tracking, Stripe payment gateway integration, dynamic filterable product catalogs, and server-side cached API responses. The architecture ensures Sub-second Core Web Vitals, resulting in high conversion rates and effortless store administration.',
    'Full-Stack Projects',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Stripe'],
    '/images/projects/project-ecommerce.svg',
    'https://example.com/demo/nexstore',
    'https://github.com/yoganathan-sys/nexstore-commerce',
    true,
    true,
    NOW() - INTERVAL '30 days',
    NOW() - INTERVAL '5 days'
),
(
    '00000000-0000-0000-0000-000000000002',
    'HealthPulse — Cross-Platform Telehealth & Vitals App',
    'healthpulse-telehealth-mobile',
    'Cross-platform iOS and Android healthcare app facilitating real-time doctor appointments, vitals charting, and encrypted prescription sharing.',
    'HealthPulse is a mobile application developed with React Native and Expo, providing a secure and accessible bridge between patients and clinicians. The application features encrypted consultation messaging, appointment scheduling with calendar synchronization, wearable vitals monitoring graphs, and automated push notifications via Expo EAS. Engineered with strict data privacy considerations and offline-first data caching.',
    'Mobile Applications',
    ARRAY['React Native', 'Expo', 'TypeScript', 'Node.js', 'Supabase'],
    '/images/projects/project-healthpulse.svg',
    'https://example.com/demo/healthpulse',
    'https://github.com/yoganathan-sys/healthpulse-mobile',
    true,
    true,
    NOW() - INTERVAL '60 days',
    NOW() - INTERVAL '10 days'
),
(
    '00000000-0000-0000-0000-000000000003',
    'DevFlow — Agile Project Tracking & Sprint Workspace',
    'devflow-agile-workspace',
    'Interactive real-time project management dashboard with Kanban boards, sprint telemetry, and team activity streams.',
    'DevFlow is a full-featured web application designed for agile development squads. It provides drag-and-drop Kanban sprint management, automated burn-down charts, milestone roadmaps, and real-time team notifications powered by Supabase Realtime and PostgreSQL triggers. Clean interface design combined with keyboard shortcuts gives developers a distraction-free productivity environment.',
    'Web Applications',
    ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    '/images/projects/project-devflow.svg',
    'https://example.com/demo/devflow',
    'https://github.com/yoganathan-sys/devflow-workspace',
    true,
    true,
    NOW() - INTERVAL '90 days',
    NOW() - INTERVAL '15 days'
),
(
    '00000000-0000-0000-0000-000000000004',
    'FinTrack — Wealth Intelligence & Real-Time Portfolio',
    'fintrack-wealth-analytics',
    'Financial intelligence dashboard featuring multi-currency asset tracking, interactive data visualization, and predictive ROI modeling.',
    'FinTrack enables private investors and businesses to monitor multi-asset portfolios in real time. Built with Next.js App Router, Three.js 3D visualizations, and Tailwind CSS, the platform delivers interactive financial charts, automatic dividend tracking, currency conversion, and CSV ledger exports. Robust database indexing guarantees sub-50ms query responses on historical portfolios.',
    'Full-Stack Projects',
    ARRAY['Next.js', 'TypeScript', 'Three.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    '/images/projects/project-fintrack.svg',
    'https://example.com/demo/fintrack',
    'https://github.com/yoganathan-sys/fintrack-analytics',
    true,
    true,
    NOW() - INTERVAL '120 days',
    NOW() - INTERVAL '20 days'
),
(
    '00000000-0000-0000-0000-000000000005',
    'FitPulse — Workout Architect & Nutrition Log',
    'fitpulse-workout-nutrition-app',
    'Native mobile companion for fitness tracking, custom routine builder, barcode food scanning, and community challenges.',
    'FitPulse is an engaging mobile app engineered using React Native and Expo. It allows fitness enthusiasts to design complex workout splits, log sets/reps with an intuitive numeric keypad, track caloric intake, and view weekly progression metrics. Features include local SQLite offline persistence with cloud sync, haptic feedback on PR achievements, and customized sound timers.',
    'Mobile Applications',
    ARRAY['React Native', 'Expo', 'TypeScript', 'MySQL', 'Node.js'],
    '/images/projects/project-fitpulse.svg',
    'https://example.com/demo/fitpulse',
    'https://github.com/yoganathan-sys/fitpulse-mobile',
    false,
    true,
    NOW() - INTERVAL '150 days',
    NOW() - INTERVAL '25 days'
),
(
    '00000000-0000-0000-0000-000000000006',
    'Aurora — High-Accessibility SaaS Design System',
    'aurora-saas-design-system',
    'Comprehensive design system with over 60 accessible UI primitives, Figma component library, and interactive documentation.',
    'Aurora is a bespoke design system created to unify web and mobile products across an enterprise SaaS ecosystem. Features include comprehensive Figma variables, strict WCAG 2.1 AA accessibility compliance, fluid dark/light themes, and interactive React/Tailwind component examples. The documentation site includes live editable code playgrounds and automated token exports.',
    'UI/UX Designs',
    ARRAY['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    '/images/projects/project-aurora.svg',
    'https://example.com/demo/aurora-design',
    'https://github.com/yoganathan-sys/aurora-design-system',
    false,
    true,
    NOW() - INTERVAL '180 days',
    NOW() - INTERVAL '30 days'
)
ON CONFLICT (slug) DO NOTHING;
