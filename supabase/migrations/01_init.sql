-- ==============================================================================
-- Yoganathan A — Portfolio Database Schema & RLS Policies
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    cover_image TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for querying published projects and category filtering
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);

-- 3. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    budget_range TEXT,
    project_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);

-- 4. Admin Users Table (Links to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Row Level Security (RLS) Setup
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS: Projects
-- Public visitors can only view published projects
CREATE POLICY "Public visitors can view published projects"
    ON public.projects
    FOR SELECT
    USING (published = true);

-- Admins can view all projects (including unpublished drafts)
CREATE POLICY "Admins can view all projects"
    ON public.projects
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Admins can insert new projects
CREATE POLICY "Admins can insert projects"
    ON public.projects
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- Admins can update projects
CREATE POLICY "Admins can update projects"
    ON public.projects
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Admins can delete projects
CREATE POLICY "Admins can delete projects"
    ON public.projects
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- RLS: Contact Messages
-- Anyone can submit a contact message
CREATE POLICY "Anyone can submit contact message"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only admins can view contact inquiries
CREATE POLICY "Admins can view contact inquiries"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Only admins can update inquiry status
CREATE POLICY "Admins can update contact inquiries"
    ON public.contact_messages
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Only admins can delete contact inquiries
CREATE POLICY "Admins can delete contact inquiries"
    ON public.contact_messages
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- RLS: Admin Users
CREATE POLICY "Admins can view admin list"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 6. Supabase Storage Bucket for Project Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public read for project images
CREATE POLICY "Public Access to Project Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'project-images');

-- Storage Policy: Admin upload/modify/delete
CREATE POLICY "Admins can upload project images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'project-images' AND public.is_admin());

CREATE POLICY "Admins can update project images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'project-images' AND public.is_admin());

CREATE POLICY "Admins can delete project images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'project-images' AND public.is_admin());

