import {
  Booking,
  CleaningTask,
  Inquiry,
  Room,
  RoomBlock,
  RoomChannelMapping,
  TeamMember
} from "@/lib/types";

export const rooms: Room[] = [
  {
    id: "rm-101",
    name: "Soba 1",
    slug: "soba-1",
    neighborhood: "Eichenried",
    pricePerNight: 69,
    capacity: 1,
    beds: "1 single bed",
    status: "available",
    image: "/images/legacy/cache_2481988833.jpg",
    amenities: ["Wi-Fi", "Radni sto", "Kupatilo", "Mirna zona"],
    shortDescription:
      "Kompaktna soba za jednog gosta, prakticna za posao, projekat ili kraci boravak u Minhenu."
  },
  {
    id: "rm-204",
    name: "Soba 2",
    slug: "soba-2",
    neighborhood: "Eichenried",
    pricePerNight: 99,
    capacity: 2,
    beds: "1 double bed",
    status: "occupied",
    image: "/images/legacy/cache_2481988840.jpg",
    amenities: ["Wi-Fi", "Kupatilo", "TV", "Ormar"],
    shortDescription:
      "Komforna soba za dve osobe sa privatnim kupatilom i prijatnim rasporedom za duzi ili kraci boravak."
  },
  {
    id: "rm-305",
    name: "Soba 3",
    slug: "soba-3",
    neighborhood: "Eichenried",
    pricePerNight: 129,
    capacity: 4,
    beds: "1 double + bunk bed",
    status: "cleaning",
    image: "/images/legacy/cache_2481988838.jpg",
    amenities: ["Wi-Fi", "Kupatilo", "Vise kreveta", "Parking"],
    shortDescription:
      "Veca soba pogodna za porodice, radnike i manje grupe koje dolaze na duzi boravak."
  },
  {
    id: "rm-406",
    name: "Soba 4",
    slug: "soba-4",
    neighborhood: "Eichenried",
    pricePerNight: 89,
    capacity: 2,
    beds: "2 single bed",
    status: "available",
    image: "/images/client-gallery/gallery-07.webp",
    amenities: ["Wi-Fi", "Kupatilo", "Ormar", "Parking"],
    shortDescription:
      "Test soba za proveru novog booking flow-a, sa zasebnom stranicom i javnim kalendarom dostupnosti."
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
  },
  {
    id: "bk-784",
    guestName: "Test Gost",
    roomId: "rm-406",
    source: "Direktno",
    checkIn: "2026-03-21",
    checkOut: "2026-03-24",
    status: "confirmed",
    guests: 2
  }
];

export const roomBlocks: RoomBlock[] = [
  {
    id: "blk-101",
    roomId: "rm-305",
    checkIn: "2026-03-22",
    checkOut: "2026-03-24",
    reason: "Generalno sredjivanje sobe",
    createdBy: "owner",
    status: "blocked"
  },
  {
    id: "blk-102",
    roomId: "rm-406",
    checkIn: "2026-03-27",
    checkOut: "2026-03-29",
    reason: "Test blokada za proveru javnog kalendara",
    createdBy: "owner",
    status: "blocked"
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

export const inquiries: Inquiry[] = [
  {
    id: "inq-101",
    guestName: "Milos Petrovic",
    phone: "+381 63 111 222",
    requestedRoomType: "Soba 2",
    checkIn: "2026-03-18",
    checkOut: "2026-03-25",
    guests: 2,
    message: "Treba nam mirnija soba i parking za kombi.",
    status: "new"
  },
  {
    id: "inq-102",
    guestName: "Nikola Markovic",
    phone: "+387 61 555 444",
    requestedRoomType: "Soba 1",
    checkIn: "2026-03-20",
    checkOut: "2026-03-28",
    guests: 1,
    message: "Dolazim zbog posla, potreban mi je duzi boravak.",
    status: "contacted"
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

export const roomChannelMappings: RoomChannelMapping[] = [
  {
    id: "map-101",
    roomId: "rm-204",
    provider: "Booking.com",
    externalRoomId: "bk-room-204",
    externalRoomName: "Doppelzimmer Comfort",
    exportUrl: "https://admin.booking.com/hotel/hoteladmin/ical.html?room=204&direction=export",
    importUrl: "https://admin.booking.com/hotel/hoteladmin/ical.html?room=204&direction=import",
    syncEnabled: true,
    lastSyncedAt: "2026-03-16T08:45:00.000Z"
  },
  {
    id: "map-102",
    roomId: "rm-101",
    provider: "Booking.com",
    externalRoomId: "",
    externalRoomName: "",
    exportUrl: "",
    importUrl: "",
    syncEnabled: false,
    lastSyncedAt: null
  }
];

export const bookingSyncSummary = {
  provider: "Booking.com",
  lastSuccessfulSync: "2026-03-14 08:45",
  mode: "manual-stub",
  pendingUpdates: 2,
  note: "Sledeci korak je povezivanje internih soba sa Booking.com sobama i unos iCal linkova po sobi."
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
    description: "Zajednicki prostor i prijatna atmosfera."
  },
  {
    image: "/images/legacy/cache_2481988840.jpg",
    title: "Soba 2",
    description: "Udobna soba za parove, radnike ili goste na projektu."
  },
  {
    image: "/images/legacy/cache_2481988838.jpg",
    title: "Soba 3",
    description: "Pogodna za vise gostiju i duze boravke."
  },
  {
    image: "/images/legacy/cache_2481988834.jpg",
    title: "Kupatilo",
    description: "Uredno i funkcionalno kupatilo u sklopu smestaja."
  }
];
