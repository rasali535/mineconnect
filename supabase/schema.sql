-- ============================================================
-- MineConnect Supabase Schema
-- Run in Supabase SQL Editor or via migration
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ───────────────────────────────────────────────
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  company      text,
  role         text,
  phone        text,
  location     text,
  avatar_url   text,
  created_at   timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ─── SUPPLIERS ──────────────────────────────────────────────
create table if not exists suppliers (
  id            uuid primary key default uuid_generate_v4(),
  code          text unique not null,
  name          text not null,
  category      text,
  status        text default 'Pending',   -- Active | Suspended | Pending
  bbbee_level   text,
  contact_email text,
  risk_level    text default 'Low',       -- Low | Medium | High
  rating        numeric(3,1) default 0,
  annual_spend  numeric(15,2) default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table suppliers enable row level security;
create policy "All authenticated users can read suppliers"
  on suppliers for select using (auth.role() = 'authenticated');
create policy "Admins can insert/update suppliers"
  on suppliers for all using (auth.role() = 'authenticated');

-- ─── CONTRACTORS ────────────────────────────────────────────
create table if not exists contractors (
  id               uuid primary key default uuid_generate_v4(),
  code             text unique not null,
  name             text not null,
  contractor_type  text,
  sheq_compliant   boolean default false,
  iso_compliant    boolean default false,
  permits_valid    boolean default false,
  env_compliant    boolean default false,
  licence_expiry   date,
  compliance_score integer default 0,
  status           text default 'Pending',  -- Compliant | Warning | Non-Compliant
  created_at       timestamptz default now()
);

alter table contractors enable row level security;
create policy "Authenticated users can read contractors"
  on contractors for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage contractors"
  on contractors for all using (auth.role() = 'authenticated');

-- ─── JOBS ───────────────────────────────────────────────────
create table if not exists jobs (
  id             uuid primary key default uuid_generate_v4(),
  code           text unique not null,
  title          text not null,
  department     text,
  location       text,
  employment_type text,
  salary_range   text,
  status         text default 'Active',  -- Active | Closing Soon | Filled
  posted_at      timestamptz default now(),
  created_at     timestamptz default now()
);

alter table jobs enable row level security;
create policy "Public can read active jobs"
  on jobs for select using (status = 'Active' or auth.role() = 'authenticated');
create policy "Authenticated can manage jobs"
  on jobs for all using (auth.role() = 'authenticated');

-- ─── APPLICANTS ─────────────────────────────────────────────
create table if not exists applicants (
  id          uuid primary key default uuid_generate_v4(),
  job_id      uuid references jobs(id) on delete cascade,
  full_name   text not null,
  email       text not null,
  phone       text,
  location    text,
  stage       text default 'Applied',   -- Applied | Screening | Interview | Offer
  ai_score    integer,
  cv_url      text,
  applied_at  timestamptz default now()
);

alter table applicants enable row level security;
create policy "Authenticated users can read applicants"
  on applicants for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage applicants"
  on applicants for all using (auth.role() = 'authenticated');

-- ─── CSI PROJECTS ───────────────────────────────────────────
create table if not exists csi_projects (
  id              uuid primary key default uuid_generate_v4(),
  code            text unique not null,
  name            text not null,
  category        text,
  location        text,
  phase           text,
  status          text default 'Planning',  -- Active | Planning | Completed
  budget          numeric(15,2) default 0,
  spent           numeric(15,2) default 0,
  beneficiaries   integer default 0,
  created_at      timestamptz default now()
);

alter table csi_projects enable row level security;
create policy "Authenticated users can read csi_projects"
  on csi_projects for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage csi_projects"
  on csi_projects for all using (auth.role() = 'authenticated');

-- ─── COMMUNITY POSTS ────────────────────────────────────────
create table if not exists community_posts (
  id          uuid primary key default uuid_generate_v4(),
  author_id   uuid references profiles(id),
  content     text not null,
  likes       integer default 0,
  created_at  timestamptz default now()
);

alter table community_posts enable row level security;
create policy "Authenticated users can read community posts"
  on community_posts for select using (auth.role() = 'authenticated');
create policy "Users can create posts"
  on community_posts for insert with check (auth.uid() = author_id);
