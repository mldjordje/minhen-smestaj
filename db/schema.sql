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

create table if not exists reservations (
  id text primary key,
  guest_name text not null,
  room_id text not null references rooms(id) on delete cascade,
  source text not null,
  check_in date not null,
  check_out date not null,
  status text not null,
  guests integer not null,
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
