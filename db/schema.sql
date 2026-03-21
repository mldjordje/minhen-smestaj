create table if not exists rooms (
  id text primary key,
  slug text not null unique,
  name text not null,
  neighborhood text not null,
  price_per_night integer not null,
  capacity integer not null,
  beds text not null,
  status text not null,
  image text not null,
  short_description text not null,
  created_at timestamptz not null default now()
);

create table if not exists room_amenities (
  id bigserial primary key,
  room_id text not null references rooms(id) on delete cascade,
  label text not null
);

create table if not exists users (
  id text primary key,
  email text not null unique,
  name text not null,
  image text,
  role text not null default 'guest',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reservations (
  id text primary key,
  guest_name text not null,
  room_id text not null references rooms(id) on delete cascade,
  source text not null,
  check_in date not null,
  check_out date not null,
  status text not null,
  guests integer not null,
  guest_user_id text references users(id) on delete set null,
  contact_email text,
  contact_phone text,
  notes text,
  channel_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists room_blocks (
  id text primary key,
  room_id text not null references rooms(id) on delete cascade,
  check_in date not null,
  check_out date not null,
  reason text not null,
  created_by text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id text primary key,
  guest_name text not null,
  phone text not null,
  requested_room_type text not null,
  check_in date not null,
  check_out date not null,
  guests integer not null,
  message text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists cleaning_tasks (
  id text primary key,
  room_id text not null references rooms(id) on delete cascade,
  assignee text not null,
  due_at text not null,
  status text not null,
  notes text not null,
  created_at timestamptz not null default now()
);

create table if not exists team_members (
  id text primary key,
  name text not null,
  role text not null,
  shift text not null,
  created_at timestamptz not null default now()
);

create table if not exists room_channel_mappings (
  id text primary key,
  room_id text not null unique references rooms(id) on delete cascade,
  provider text not null,
  external_room_id text not null default '',
  external_room_name text not null default '',
  export_url text not null default '',
  import_url text not null default '',
  sync_enabled boolean not null default false,
  last_synced_at timestamptz,
  last_sync_status text not null default 'idle',
  last_sync_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists activity_log (
  id bigserial primary key,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  actor text not null,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists reservations_room_channel_reference_idx
on reservations (room_id, channel_reference)
where channel_reference is not null;
