-- Supabase schema for the portfolio blog.
-- Run this file once in Supabase -> SQL Editor.

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  category text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_published_date_idx
  on public.blogs (published, published_at desc);

create index if not exists blogs_featured_idx
  on public.blogs (featured desc, published_at desc)
  where published = true;

create or replace function public.set_blog_timestamps()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();

  if new.published = true and new.published_at is null then
    new.published_at = now();
  elsif new.published = false then
    new.published_at = null;
  end if;

  return new;
end;
$$;

drop trigger if exists blogs_set_timestamps on public.blogs;
create trigger blogs_set_timestamps
before insert or update on public.blogs
for each row execute function public.set_blog_timestamps();

alter table public.blogs enable row level security;

-- Public visitors can only read published posts.
drop policy if exists "Public can read published blogs" on public.blogs;
create policy "Public can read published blogs"
on public.blogs
for select
to anon
using (published = true);

-- Authenticated users still only get read access from the frontend.
-- Create/edit/delete posts safely from the Supabase dashboard.
drop policy if exists "Authenticated can read blogs" on public.blogs;
create policy "Authenticated can read blogs"
on public.blogs
for select
to authenticated
using (true);

grant select on table public.blogs to anon, authenticated;
revoke insert, update, delete on table public.blogs from anon, authenticated;

-- Example post (optional):
-- insert into public.blogs (title, slug, excerpt, content, category, tags, featured, published)
-- values (
--   'How I structure production Next.js applications',
--   'how-i-structure-production-nextjs-applications',
--   'A practical approach to keeping large Next.js codebases maintainable.',
--   '## Start with clear boundaries\n\nKeep UI, data access, and domain logic intentionally separated.\n\n- Prefer small modules\n- Keep server/client boundaries explicit\n- Test behavior, not implementation details',
--   'Engineering',
--   array['nextjs', 'typescript', 'architecture'],
--   true,
--   true
-- );
