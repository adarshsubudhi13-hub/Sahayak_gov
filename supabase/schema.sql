-- ============================================================
-- Sahayak – Phase 1 Database Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable pgvector for future Phase 2 embedding search
create extension if not exists vector;

-- ── Users / Profiles ─────────────────────────────────────────────────────────

-- Note: Supabase Auth manages the auth.users table automatically.
-- We extend it with a public profiles table.

create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  age           integer check (age > 0 and age < 150),
  gender        text,
  state         text,
  state_id      text,
  district      text,
  occupation    text,
  annual_income_band   text,
  education_level      text,
  social_category      text,
  disability_status    boolean default false,
  preferred_language   text default 'en',
  role          text not null default 'citizen' check (role in ('citizen', 'admin')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Row-level security: users can only read/write their own profile
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ── Saved Schemes ─────────────────────────────────────────────────────────────

create table if not exists public.saved_schemes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  scheme_id   text not null,
  state_id    text,
  created_at  timestamptz default now(),
  unique (user_id, scheme_id)
);

alter table public.saved_schemes enable row level security;

create policy "Users can manage own saved schemes"
  on public.saved_schemes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Applications ──────────────────────────────────────────────────────────────

create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  scheme_id       text not null,
  scheme_name     text,
  state_id        text,
  state_name      text,
  -- Applicant snapshot at time of submission (denormalised for audit trail)
  applicant_name      text,
  applicant_age       integer,
  applicant_gender    text,
  applicant_district  text,
  applicant_income_band        text,
  applicant_social_category    text,
  applicant_occupation         text,
  -- Status lifecycle
  status          text not null default 'submitted'
                    check (status in ('submitted','under_review','approved','rejected','withdrawn')),
  csc_center_id   text,        -- nullable – set if submitted via CSC
  notes           text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.applications enable row level security;

create policy "Users can view own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "Users can insert own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update own applications"
  on public.applications for update
  using (auth.uid() = user_id);

-- Admins can view all applications
create policy "Admins can view all applications"
  on public.applications for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── Chat Logs ─────────────────────────────────────────────────────────────────

create table if not exists public.chat_logs (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete set null,
  scheme_id       text,
  query_text      text not null,
  response_text   text,
  confidence_score real,
  was_low_confidence boolean default false,
  is_real_ai      boolean default false,
  language        text default 'en',
  created_at      timestamptz default now()
);

alter table public.chat_logs enable row level security;

create policy "Users can view own chat logs"
  on public.chat_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert chat logs"
  on public.chat_logs for insert
  with check (auth.uid() = user_id or user_id is null);

-- Admins can view all chat logs
create policy "Admins can view all chat logs"
  on public.chat_logs for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── Flagged Responses ─────────────────────────────────────────────────────────

create table if not exists public.flagged_responses (
  id              uuid primary key default gen_random_uuid(),
  chat_log_id     uuid references public.chat_logs(id) on delete set null,
  user_id         uuid references auth.users(id) on delete set null,
  query_text      text,
  response_text   text,
  confidence_score real,
  flag_reason     text default 'user_flagged'
                    check (flag_reason in ('user_flagged','low_confidence','auto_flag')),
  status          text default 'pending'
                    check (status in ('pending','resolved','dismissed')),
  resolution_note text,
  resolved_by     uuid references auth.users(id) on delete set null,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.flagged_responses enable row level security;

create policy "Users can insert flagged responses"
  on public.flagged_responses for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Admins can manage flagged responses"
  on public.flagged_responses for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── Telemetry Events ──────────────────────────────────────────────────────────

create table if not exists public.telemetry_events (
  id          uuid primary key default gen_random_uuid(),
  -- user_id is nullable so we can log anonymous events
  user_id     uuid references auth.users(id) on delete set null,
  scheme_id   text not null,
  state_id    text,
  district    text,
  event_type  text not null
                check (event_type in ('matched','viewed','chat_query','applied','saved')),
  metadata    jsonb,
  created_at  timestamptz default now()
);

alter table public.telemetry_events enable row level security;

create policy "Anyone can insert telemetry"
  on public.telemetry_events for insert
  with check (true);

create policy "Admins can view telemetry"
  on public.telemetry_events for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── Application status auto-update trigger ────────────────────────────────────

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger applications_updated_at
  before update on public.applications
  for each row execute procedure update_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure update_updated_at();

create trigger flagged_responses_updated_at
  before update on public.flagged_responses
  for each row execute procedure update_updated_at();

-- ── Helpful indexes ───────────────────────────────────────────────────────────

create index if not exists idx_applications_user_id
  on public.applications(user_id);

create index if not exists idx_applications_scheme_id
  on public.applications(scheme_id);

create index if not exists idx_telemetry_scheme_state
  on public.telemetry_events(scheme_id, state_id);

create index if not exists idx_telemetry_event_type
  on public.telemetry_events(event_type);

create index if not exists idx_chat_logs_user_id
  on public.chat_logs(user_id);

create index if not exists idx_flagged_status
  on public.flagged_responses(status);

-- ============================================================
-- Phase 3 Additions — Compliance & Hardening
-- ============================================================

-- ── Consent Records ───────────────────────────────────────────────────────────
-- Retained for 7 years per DPDP Act 2023 requirement.

create table if not exists public.consent_records (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  version         text not null,                   -- consent notice version e.g. '1.0'
  consented       boolean not null,
  consented_at    timestamptz,
  withdrawn_at    timestamptz,
  channel         text default 'web'
                    check (channel in ('web', 'whatsapp', 'ivr')),
  ip_hash         text,                            -- hashed IP for audit, never raw IP
  created_at      timestamptz default now()
);

alter table public.consent_records enable row level security;

create policy "Users can insert own consent"
  on public.consent_records for insert
  with check (auth.uid() = user_id);

create policy "Users can view own consent"
  on public.consent_records for select
  using (auth.uid() = user_id);

create policy "Admins can view all consent records"
  on public.consent_records for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create index if not exists idx_consent_user_id
  on public.consent_records(user_id);

-- ── Hardened RLS: prevent anonymous inserts on profiles ──────────────────────
-- Only authenticated users can insert/update their own profile.

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'profiles' and policyname = 'Authenticated users only on profiles'
  ) then
    execute 'create policy "Authenticated users only on profiles"
      on public.profiles for insert
      with check (auth.role() = ''authenticated'' and auth.uid() = id)';
  end if;
end $$;

-- ── Rate limiting support table ───────────────────────────────────────────────
-- Tracks per-user action counts for server-side rate limiting.

create table if not exists public.rate_limit_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  action      text not null check (action in ('otp_request', 'rag_query', 'apply', 'profile_save')),
  created_at  timestamptz default now()
);

alter table public.rate_limit_events enable row level security;

create policy "System can insert rate limit events"
  on public.rate_limit_events for insert
  with check (true);

create policy "Admins can view rate limit events"
  on public.rate_limit_events for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create index if not exists idx_rate_limit_user_action
  on public.rate_limit_events(user_id, action, created_at);

-- ── Auto-cleanup: purge rate_limit_events older than 1 hour ──────────────────
-- Run this as a scheduled function in Supabase cron (pg_cron extension).
-- create extension if not exists pg_cron;
-- select cron.schedule('cleanup-rate-limits', '*/30 * * * *',
--   'delete from public.rate_limit_events where created_at < now() - interval ''1 hour''');

-- ── Trigger: auto-update consent records updated_at ──────────────────────────
create trigger consent_records_updated_at
  before update on public.consent_records
  for each row execute procedure update_updated_at();
