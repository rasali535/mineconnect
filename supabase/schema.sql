-- ============================================================
-- Debswana Connect MVP Supabase Schema
-- Run in Supabase SQL Editor or via migration
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "vector"; -- for AI RAG

-- Drop all existing tables to recreate clean for MVP seed
drop table if exists ai_messages cascade;
drop table if exists ai_documents cascade;
drop table if exists community_requests cascade;
drop table if exists applications cascade;
drop table if exists jobs cascade;
drop table if exists contractor_documents cascade;
drop table if exists contractors cascade;
drop table if exists supplier_documents cascade;
drop table if exists suppliers cascade;
drop table if exists users cascade;
drop table if exists roles cascade;

-- ─── ROLES ───────────────────────────────────────────────
create table roles (
  id          uuid primary key default uuid_generate_v4(),
  name        text unique not null,
  description text,
  created_at  timestamptz default now()
);

alter table roles enable row level security;
create policy "Public can read roles" on roles for select using (true);

-- ─── USERS (Profiles) ───────────────────────────────────────────────
create table users (
  id           uuid primary key,
  role_id      uuid references roles(id),
  full_name    text,
  company      text,
  email        text,
  phone        text,
  location     text,
  avatar_url   text,
  created_at   timestamptz default now()
);

alter table users enable row level security;
create policy "Users can view own profile" on users for select using (auth.uid() = id);
create policy "Users can update own profile" on users for update using (auth.uid() = id);
create policy "Admins can view all users" on users for select using (
  exists (
    select 1 from roles r 
    where r.id = users.role_id and r.name = 'Admin'
  )
);

-- ─── SUPPLIERS ──────────────────────────────────────────────
create table suppliers (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references users(id),
  code          text unique not null,
  name          text not null,
  category      text,
  status        text default 'Pending',   -- Active | Suspended | Pending | Approved | Rejected | Under Review
  is_local      boolean default false,    -- For Botswana local supplier indicator
  contact_email text,
  risk_level    text default 'Low',       -- Low | Medium | High
  rating        numeric(3,1) default 0,
  annual_spend  numeric(15,2) default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table suppliers enable row level security;
create policy "Authenticated users can read suppliers" on suppliers for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage suppliers" on suppliers for all using (auth.role() = 'authenticated');

-- ─── SUPPLIER DOCUMENTS ─────────────────────────────────────
create table supplier_documents (
  id            uuid primary key default uuid_generate_v4(),
  supplier_id   uuid references suppliers(id) on delete cascade,
  doc_type      text not null, -- tax, registration, insurance
  file_url      text not null,
  status        text default 'Pending', -- Pending | Verified | Rejected
  uploaded_at   timestamptz default now()
);

alter table supplier_documents enable row level security;
create policy "Authenticated users can read supplier docs" on supplier_documents for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage supplier docs" on supplier_documents for all using (auth.role() = 'authenticated');

-- ─── CONTRACTORS ────────────────────────────────────────────
create table contractors (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references users(id),
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
create policy "Authenticated users can read contractors" on contractors for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage contractors" on contractors for all using (auth.role() = 'authenticated');

-- ─── CONTRACTOR DOCUMENTS ───────────────────────────────────
create table contractor_documents (
  id              uuid primary key default uuid_generate_v4(),
  contractor_id   uuid references contractors(id) on delete cascade,
  doc_type        text not null, -- safety, insurance, ppe, vehicle
  file_url        text not null,
  expiry_date     date,
  status          text default 'Valid', -- Valid | Expired | Warning
  uploaded_at     timestamptz default now()
);

alter table contractor_documents enable row level security;
create policy "Authenticated users can read contractor docs" on contractor_documents for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage contractor docs" on contractor_documents for all using (auth.role() = 'authenticated');

-- ─── JOBS ───────────────────────────────────────────────────
create table jobs (
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
create policy "Public can read active jobs" on jobs for select using (status = 'Active' or auth.role() = 'authenticated');
create policy "Authenticated can manage jobs" on jobs for all using (auth.role() = 'authenticated');

-- ─── APPLICATIONS ───────────────────────────────────────────
create table applications (
  id          uuid primary key default uuid_generate_v4(),
  job_id      uuid references jobs(id) on delete cascade,
  user_id     uuid references users(id),
  full_name   text not null,
  email       text not null,
  phone       text,
  location    text,
  is_local    boolean default false, -- Botswana citizen
  status      text default 'Submitted',   -- Submitted | Reviewing | Shortlisted | Rejected | Hired
  ai_score    integer,
  cv_url      text,
  applied_at  timestamptz default now()
);

alter table applications enable row level security;
create policy "Authenticated users can read applications" on applications for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage applications" on applications for all using (auth.role() = 'authenticated');

-- ─── COMMUNITY REQUESTS ──────────────────────────────────────
create table community_requests (
  id              uuid primary key default uuid_generate_v4(),
  code            text unique not null,
  title           text not null,
  request_type    text, -- Scholarship | CSR Funding | Grievance | Local Business
  description     text,
  location        text,
  status          text default 'Submitted',  -- Submitted | Reviewing | Approved | Closed
  requested_amount numeric(15,2) default 0,
  approved_amount numeric(15,2) default 0,
  applicant_name  text,
  created_at      timestamptz default now()
);

alter table community_requests enable row level security;
create policy "Authenticated users can read community requests" on community_requests for select using (auth.role() = 'authenticated');
create policy "Authenticated users can manage community requests" on community_requests for all using (auth.role() = 'authenticated');

-- ─── AI DOCUMENTS ───────────────────────────────────────────
create table ai_documents (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  content     text not null,
  embedding   vector(1536), -- Assuming OpenAI embeddings
  source_url  text,
  created_at  timestamptz default now()
);

alter table ai_documents enable row level security;
create policy "Authenticated users can read ai documents" on ai_documents for select using (auth.role() = 'authenticated');
create policy "Admins can manage ai documents" on ai_documents for all using (auth.role() = 'authenticated');

-- ─── AI MESSAGES ────────────────────────────────────────────
create table ai_messages (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references users(id),
  role        text not null, -- user | assistant
  content     text not null,
  created_at  timestamptz default now()
);

alter table ai_messages enable row level security;
create policy "Users can read own ai messages" on ai_messages for select using (auth.uid() = user_id);
create policy "Users can insert own ai messages" on ai_messages for insert with check (auth.uid() = user_id);
