-- Initial multi-tenant schema for Agnieszka salon platform.
-- Apply using Supabase SQL editor or Supabase CLI. Review policies before production launch.
create extension if not exists pgcrypto;

create type public.member_role as enum ('owner','manager','staff');
create type public.appointment_status as enum ('pending','confirmed','completed','cancelled','no_show');
create type public.deposit_type as enum ('none','fixed','percentage');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.salons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  description text,
  address text not null,
  city text not null default 'Gniezno',
  postal_code text,
  phone text,
  email text,
  timezone text not null default 'Europe/Warsaw',
  currency text not null default 'PLN' check (currency = 'PLN'),
  deposit_kind public.deposit_type not null default 'none',
  deposit_value numeric(10,2) not null default 0 check (deposit_value >= 0),
  cancellation_policy text,
  booking_advance_hours integer not null default 2 check (booking_advance_hours >= 0),
  booking_window_days integer not null default 60 check (booking_window_days between 1 and 365),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.salon_members (
  salon_id uuid not null references public.salons(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.member_role not null default 'staff',
  display_name text,
  bio text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (salon_id,user_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  category text not null default 'Pozostałe',
  name text not null,
  description text,
  duration_minutes integer not null check (duration_minutes between 5 and 600),
  buffer_minutes integer not null default 0 check (buffer_minutes between 0 and 180),
  price numeric(10,2) not null check (price >= 0),
  price_max numeric(10,2) check (price_max is null or price_max >= price),
  deposit_kind public.deposit_type not null default 'none',
  deposit_value numeric(10,2) not null default 0 check (deposit_value >= 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (salon_id,name)
);

create table public.staff_services (
  salon_id uuid not null references public.salons(id) on delete cascade,
  staff_id uuid not null,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (salon_id,staff_id,service_id),
  foreign key (salon_id,staff_id) references public.salon_members(salon_id,user_id) on delete cascade
);

create table public.working_hours (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  staff_id uuid,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_closed boolean not null default false,
  check (end_time > start_time),
  foreign key (salon_id,staff_id) references public.salon_members(salon_id,user_id) on delete cascade
);

create table public.time_off (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  staff_id uuid not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  check (ends_at > starts_at),
  foreign key (salon_id,staff_id) references public.salon_members(salon_id,user_id) on delete cascade
);

create table public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  staff_id uuid,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_by uuid references public.profiles(id) on delete set null,
  check (ends_at > starts_at),
  foreign key (salon_id,staff_id) references public.salon_members(salon_id,user_id) on delete cascade
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete restrict,
  customer_id uuid not null references public.profiles(id) on delete restrict,
  staff_id uuid not null,
  service_id uuid not null references public.services(id) on delete restrict,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.appointment_status not null default 'pending',
  price numeric(10,2) not null check (price >= 0),
  deposit_due numeric(10,2) not null default 0 check (deposit_due >= 0),
  customer_note text,
  internal_note text,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  foreign key (salon_id,staff_id) references public.salon_members(salon_id,user_id) on delete restrict
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete restrict,
  appointment_id uuid not null references public.appointments(id) on delete restrict,
  provider text not null,
  provider_payment_id text,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'PLN' check (currency = 'PLN'),
  status text not null default 'pending' check (status in ('pending','succeeded','failed','refunded','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider,provider_payment_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete restrict,
  appointment_id uuid not null unique references public.appointments(id) on delete restrict,
  rating smallint not null check (rating between 1 and 5),
  body text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.salon_images (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.notification_logs (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references public.salons(id) on delete set null,
  appointment_id uuid references public.appointments(id) on delete set null,
  channel text not null check (channel in ('email','sms')),
  recipient_hash text,
  template_key text not null,
  status text not null default 'pending' check (status in ('pending','sent','failed')),
  provider_message_id text,
  error_code text,
  created_at timestamptz not null default now()
);

create table public.platform_admins (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index appointments_salon_start_idx on public.appointments(salon_id,starts_at);
create index appointments_staff_start_idx on public.appointments(salon_id,staff_id,starts_at);
create index appointments_customer_idx on public.appointments(customer_id,starts_at desc);
create index services_salon_active_idx on public.services(salon_id,is_active);
create index members_user_idx on public.salon_members(user_id,is_active);
create index time_off_range_idx on public.time_off(salon_id,staff_id,starts_at,ends_at);
create index blocked_slots_range_idx on public.blocked_slots(salon_id,starts_at,ends_at);
create index reviews_salon_published_idx on public.reviews(salon_id,is_published,created_at desc);
create index payments_appointment_idx on public.payments(appointment_id,status);

create or replace function public.is_salon_member(target_salon uuid, allowed_roles public.member_role[] default null)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.salon_members m
    where m.salon_id = target_salon and m.user_id = (select auth.uid()) and m.is_active
      and (allowed_roles is null or m.role = any(allowed_roles))
  );
$$;

create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.platform_admins a where a.user_id = (select auth.uid()));
$$;

alter table public.profiles enable row level security;
alter table public.salons enable row level security;
alter table public.salon_members enable row level security;
alter table public.services enable row level security;
alter table public.staff_services enable row level security;
alter table public.working_hours enable row level security;
alter table public.time_off enable row level security;
alter table public.blocked_slots enable row level security;
alter table public.appointments enable row level security;
alter table public.payments enable row level security;
alter table public.reviews enable row level security;
alter table public.salon_images enable row level security;
alter table public.notification_logs enable row level security;
alter table public.platform_admins enable row level security;
alter table public.admin_audit_log enable row level security;

create policy "Profiles read own" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_platform_admin());
create policy "Profiles update own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "Profiles insert own" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "Active salons public read" on public.salons for select to anon, authenticated using (is_active or public.is_salon_member(id) or public.is_platform_admin());
create policy "Salon managers update salon" on public.salons for update to authenticated using (public.is_salon_member(id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
-- Salon creation is intentionally closed until a trusted onboarding RPC provisions both salon and owner membership.
create policy "Members visible to salon" on public.salon_members for select to anon, authenticated using (exists(select 1 from public.salons s where s.id = salon_id and s.is_active) or public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Managers manage members" on public.salon_members for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Active services public read" on public.services for select to anon, authenticated using ((is_active and exists(select 1 from public.salons s where s.id = salon_id and s.is_active)) or public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Managers manage services" on public.services for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Staff service public read" on public.staff_services for select to anon, authenticated using (exists(select 1 from public.salons s where s.id = salon_id and s.is_active));
create policy "Managers manage staff services" on public.staff_services for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Working hours public read" on public.working_hours for select to anon, authenticated using (exists(select 1 from public.salons s where s.id = salon_id and s.is_active) or public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Managers manage working hours" on public.working_hours for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Members read time off" on public.time_off for select to authenticated using (public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Managers manage time off" on public.time_off for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Members read blocked slots" on public.blocked_slots for select to authenticated using (public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Managers manage blocked slots" on public.blocked_slots for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Customers and salon members read appointments" on public.appointments for select to authenticated using (customer_id = (select auth.uid()) or public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Customers cancel own pending appointments" on public.appointments for update to authenticated using (customer_id = (select auth.uid()) and status in ('pending','confirmed')) with check (customer_id = (select auth.uid()) and status = 'cancelled');
create policy "Salon members manage appointments" on public.appointments for update to authenticated using (public.is_salon_member(salon_id) or public.is_platform_admin()) with check (public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Customers and salon members read payments" on public.payments for select to authenticated using (exists(select 1 from public.appointments a where a.id = appointment_id and (a.customer_id = (select auth.uid()) or public.is_salon_member(a.salon_id))) or public.is_platform_admin());
create policy "Published reviews public read" on public.reviews for select to anon, authenticated using (is_published or customer_id = (select auth.uid()) or public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Customers submit review for own completed visit" on public.reviews for insert to authenticated with check (customer_id = (select auth.uid()) and exists(select 1 from public.appointments a where a.id = appointment_id and a.customer_id = (select auth.uid()) and a.salon_id = reviews.salon_id and a.status = 'completed'));
create policy "Managers moderate reviews" on public.reviews for update to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Salon images public read" on public.salon_images for select to anon, authenticated using (exists(select 1 from public.salons s where s.id = salon_id and s.is_active));
create policy "Managers manage salon images" on public.salon_images for all to authenticated using (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin()) with check (public.is_salon_member(salon_id, array['owner','manager']::public.member_role[]) or public.is_platform_admin());
create policy "Members read notification logs" on public.notification_logs for select to authenticated using (public.is_salon_member(salon_id) or public.is_platform_admin());
create policy "Only platform admins read admin roles" on public.platform_admins for select to authenticated using (user_id = (select auth.uid()) or public.is_platform_admin());
create policy "Platform admins audit log read" on public.admin_audit_log for select to authenticated using (public.is_platform_admin());

-- Important: direct appointment inserts are disabled. Add a trusted transactional RPC that validates staff-service assignment, working hours, time off, buffers and overlaps before enabling booking.
