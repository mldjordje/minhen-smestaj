# Minhen Smestaj

Pocetna MVP osnova za aplikaciju za smestaj u Minhenu:

- javni sajt za prikaz jedinica
- `owner` admin za vlasnike
- `staff` admin za radnike koji ciste sobe i uvode goste
- pocetni Booking.com sync API stub
- placeholder za Vercel storage upload slika

## Pokretanje

```bash
npm install
npm run dev
```

Ako povezujemo Booking.com i Vercel Blob, treba dodati `.env.local` na osnovu vrednosti iz `.env.example`.

## Produkcijski utility skriptovi

```bash
npm run db:migrate-launch-v1
npm run db:cleanup-live
```

- `db:migrate-launch-v1` uskladjuje launch v1 baznu semu
- `db:cleanup-live` brise operativne test podatke (`reservations`, `inquiries`, `room_blocks`, `cleaning_tasks`, `team_members`, `users`, `activity_log`) i cuva sobe i room mapping konfiguraciju

## Stranice

- `/` javna landing strana
- `/rooms` katalog soba
- `/admin` izbor admin panela
- `/admin/owner` owner dashboard
- `/admin/staff` staff dashboard
- `/api/booking-sync` status Booking.com integracije
- `/api/upload-room-image` placeholder za upload slika

## Sta je sada uradjeno

- Napravljen je cist Next.js projekat u root folderu.
- Dodata je podela na javni deo i dve admin zone.
- Vlasnik moze da unese novu sobu kroz UI formular.
- Staff vidi dnevne zadatke za ciscenje i dolaske gostiju.
- Dodata je struktura za naredni korak: Booking.com sync + Vercel Blob.

## Sledeci koraci za produkciju

1. Dodati autentikaciju i role: `owner`, `cleaner`, `host`.
2. Dodati bazu za sobe, rezervacije i zadatke.
3. Povezati upload slika na Vercel Blob.
4. Uvesti Booking.com rezervacije i kalendar u interni sistem.
5. Dodati CRUD za sobe, cene, availability i zadatke.
