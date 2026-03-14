import { Booking, CleaningTask, Room, TeamMember } from "@/lib/types";

export const rooms: Room[] = [
  {
    id: "rm-101",
    name: "Einzelzimmer Classic",
    slug: "einzelzimmer-classic",
    neighborhood: "Eichenried",
    pricePerNight: 69,
    capacity: 1,
    beds: "1 single bed",
    status: "available",
    image: "/images/legacy/cache_2481988833.jpg",
    amenities: ["Wi-Fi", "Radni sto", "Kupatilo", "Mirna zona"],
    shortDescription:
      "Kompaktna soba za jednog gosta, praktična za posao, projekat ili kraći boravak u Minhenu."
  },
  {
    id: "rm-204",
    name: "Doppelzimmer Comfort",
    slug: "doppelzimmer-comfort",
    neighborhood: "Eichenried",
    pricePerNight: 99,
    capacity: 2,
    beds: "1 double bed",
    status: "occupied",
    image: "/images/legacy/cache_2481988840.jpg",
    amenities: ["Wi-Fi", "Kupatilo", "TV", "Ormar"],
    shortDescription:
      "Komforna dvokrevetna soba sa privatnim kupatilom i prijatnim rasporedom za duži ili kraći boravak."
  },
  {
    id: "rm-305",
    name: "Mehrbettzimmer Family",
    slug: "mehrbettzimmer-family",
    neighborhood: "Eichenried",
    pricePerNight: 129,
    capacity: 4,
    beds: "1 double + bunk bed",
    status: "cleaning",
    image: "/images/legacy/cache_2481988838.jpg",
    amenities: ["Wi-Fi", "Kupatilo", "Više kreveta", "Parking"],
    shortDescription:
      "Veća soba pogodna za porodice, radnike i manje grupe koje dolaze na duži boravak."
  }
];

export const bookings: Booking[] = [
  {
    id: "bk-781",
    guestName: "Marko Ilic",
    roomId: "rm-204",
    source: "Booking.com",
    checkIn: "2026-03-14",
    checkOut: "2026-03-18",
    status: "checked-in",
    guests: 2
  },
  {
    id: "bk-782",
    guestName: "Jelena Nikolic",
    roomId: "rm-305",
    source: "Booking.com",
    checkIn: "2026-03-14",
    checkOut: "2026-03-16",
    status: "arriving",
    guests: 3
  },
  {
    id: "bk-783",
    guestName: "Stefan Jovanov",
    roomId: "rm-101",
    source: "Direktno",
    checkIn: "2026-03-15",
    checkOut: "2026-03-20",
    status: "confirmed",
    guests: 1
  }
];

export const cleaningTasks: CleaningTask[] = [
  {
    id: "task-11",
    roomId: "rm-305",
    assignee: "Ana",
    dueAt: "10:30",
    status: "in-progress",
    notes: "Promena posteljine i dopuna higijenskog seta."
  },
  {
    id: "task-12",
    roomId: "rm-204",
    assignee: "Ivana",
    dueAt: "13:00",
    status: "todo",
    notes: "Dubinsko ciscenje kupatila posle check-out-a."
  },
  {
    id: "task-13",
    roomId: "rm-101",
    assignee: "Milan",
    dueAt: "17:00",
    status: "todo",
    notes: "Priprema welcome poruke i provera smart lock pristupa."
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "usr-1",
    name: "Vlasnik",
    role: "owner",
    shift: "Celodnevni pregled"
  },
  {
    id: "usr-2",
    name: "Ana",
    role: "cleaner",
    shift: "08:00 - 16:00"
  },
  {
    id: "usr-3",
    name: "Milan",
    role: "host",
    shift: "14:00 - 22:00"
  }
];

export const bookingSyncSummary = {
  provider: "Booking.com",
  lastSuccessfulSync: "2026-03-14 08:45",
  mode: "manual-stub",
  pendingUpdates: 2,
  note: "Sledeci korak je povezivanje putem Booking.com iCal ili partnerskog API pristupa."
};

export const legacyGallery = [
  {
    image: "/images/legacy/jagdschloessl-5.jpg",
    title: "Spoljasnjost objekta",
    description: "Mirna lokacija i objekat u Eichenriedu, nedaleko od Minhena."
  },
  {
    image: "/images/legacy/jagdschloessl-1.jpg",
    title: "Ulaz i dvoriste",
    description: "Prilaz objektu i prostor za goste."
  },
  {
    image: "/images/legacy/jagdschloessl-2.jpg",
    title: "Restoranski deo",
    description: "Zajednički prostor i prijatna atmosfera."
  },
  {
    image: "/images/legacy/cache_2481988840.jpg",
    title: "Dvokrevetna soba",
    description: "Udobna soba za parove, radnike ili goste na projektu."
  },
  {
    image: "/images/legacy/cache_2481988838.jpg",
    title: "Soba za više osoba",
    description: "Pogodna za više gostiju i duže boravke."
  },
  {
    image: "/images/legacy/cache_2481988834.jpg",
    title: "Kupatilo",
    description: "Uredno i funkcionalno kupatilo u sklopu smeštaja."
  }
];
