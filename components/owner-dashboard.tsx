"use client";

import Link from "next/link";
import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { AdminRoomCalendar } from "@/components/admin-room-calendar";
import { BookingExportField } from "@/components/booking-export-field";
import type { AdminBookingSyncSummary } from "@/lib/admin-data";
import { getRoomDisplayName } from "@/lib/rooms";
import {
  ActivityLogEntry,
  Booking,
  CleaningTask,
  Inquiry,
  InquiryStatus,
  Room,
  RoomBlock,
  RoomChannelMapping,
  TeamMember
} from "@/lib/types";

const initialForm = {
  roomNumber: "",
  neighborhood: "",
  pricePerNight: "",
  capacity: "",
  beds: "",
  shortDescription: ""
};

const initialTeamForm = {
  name: "",
  role: "host" as TeamMember["role"],
  shift: ""
};

type UploadState = {
  message: string;
  status: "idle" | "uploading" | "success" | "error";
  url?: string;
};

type InquiryActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type RoomActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type SyncActionState = {
  message: string;
  status: "idle" | "submitting" | "success" | "error";
};

type InquiryAction = "contacted" | "closed" | "converted";

type MappingDraft = {
  exportUrl: string;
  externalRoomId: string;
  externalRoomName: string;
  importUrl: string;
  syncEnabled: boolean;
};

type OwnerDashboardProps = {
  activityLog: ActivityLogEntry[];
  bookings: Booking[];
  cleaningTasks: CleaningTask[];
  inquiries: Inquiry[];
  integrationSummary: AdminBookingSyncSummary;
  roomBlocks: RoomBlock[];
  roomChannelMappings: RoomChannelMapping[];
  rooms: Room[];
  teamMembers: TeamMember[];
};

function createMappingDraft(mapping?: RoomChannelMapping): MappingDraft {
  return {
    externalRoomId: mapping?.externalRoomId ?? "",
    externalRoomName: mapping?.externalRoomName ?? "",
    exportUrl: mapping?.exportUrl ?? "",
    importUrl: mapping?.importUrl ?? "",
    syncEnabled: mapping?.syncEnabled ?? false
  };
}

function buildInitialMappingDrafts(rooms: Room[], mappings: RoomChannelMapping[]) {
  return Object.fromEntries(
    rooms.map((room) => {
      const mapping = mappings.find((item) => item.roomId === room.id);
      return [room.id, createMappingDraft(mapping)];
    })
  );
}

function getMappingVisualState(draft: MappingDraft) {
  if (draft.syncEnabled && draft.externalRoomName && draft.importUrl) {
    return {
      badgeClassName: "status-mapped",
      label: "sync aktivan"
    };
  }

  if (draft.externalRoomId || draft.externalRoomName || draft.exportUrl || draft.importUrl) {
    return {
      badgeClassName: "status-draft",
      label: "draft mapping"
    };
  }

  return {
    badgeClassName: "status-unmapped",
    label: "nije povezano"
  };
}

function isActiveInquiryStatus(status: InquiryStatus) {
  return status === "new" || status === "contacted";
}

function buildInquiryRoomSelection(rooms: Room[], inquiries: Inquiry[], current?: Record<string, string>) {
  return Object.fromEntries(
    inquiries.map((inquiry) => {
      const matchingRoom =
        rooms.find(
          (room) =>
            room.name === inquiry.requestedRoomType || getRoomDisplayName(room) === inquiry.requestedRoomType
        ) ?? rooms[0];

      return [inquiry.id, current?.[inquiry.id] ?? matchingRoom?.id ?? ""];
    })
  );
}

function getInquiryActionMessage(action: InquiryAction, status: "submitting" | "success") {
  if (status === "submitting") {
    switch (action) {
      case "contacted":
        return "Belezim da je gost kontaktiran...";
      case "closed":
        return "Zatvaram upit...";
      default:
        return "Potvrdjujem rezervaciju...";
    }
  }

  switch (action) {
    case "contacted":
      return "Upit je oznacen kao kontaktiran.";
    case "closed":
      return "Upit je zatvoren.";
    default:
      return "Upit je uspesno pretvoren u rezervaciju.";
  }
}

export function OwnerDashboard({
  activityLog: initialActivityLog,
  bookings: initialBookings,
  cleaningTasks: initialCleaningTasks,
  inquiries: initialInquiries,
  integrationSummary,
  roomBlocks: initialRoomBlocks,
  roomChannelMappings: initialRoomChannelMappings,
  rooms: initialRooms,
  teamMembers: initialTeamMembers
}: OwnerDashboardProps) {
  const [form, setForm] = useState(initialForm);
  const [teamForm, setTeamForm] = useState(initialTeamForm);
  const [taskForm, setTaskForm] = useState({
    roomId: initialRooms[0]?.id ?? "",
    assignee: "",
    dueAt: "",
    status: "todo" as CleaningTask["status"],
    notes: ""
  });
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(initialActivityLog);
  const [localBookings, setLocalBookings] = useState<Booking[]>(initialBookings);
  const [localCleaningTasks, setLocalCleaningTasks] = useState<CleaningTask[]>(initialCleaningTasks);
  const [localInquiries, setLocalInquiries] = useState<Inquiry[]>(initialInquiries);
  const [localRoomBlocks, setLocalRoomBlocks] = useState<RoomBlock[]>(initialRoomBlocks);
  const [localMappings, setLocalMappings] = useState<RoomChannelMapping[]>(initialRoomChannelMappings);
  const [localRooms, setLocalRooms] = useState<Room[]>(initialRooms);
  const [localTeamMembers, setLocalTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [localIntegrationSummary, setLocalIntegrationSummary] =
    useState<AdminBookingSyncSummary>(integrationSummary);
  const [mappingDrafts, setMappingDrafts] = useState<Record<string, MappingDraft>>(() =>
    buildInitialMappingDrafts(initialRooms, initialRoomChannelMappings)
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [inquiryRoomSelection, setInquiryRoomSelection] = useState<Record<string, string>>(() =>
    buildInquiryRoomSelection(initialRooms, initialInquiries)
  );
  const [inquiryActionState, setInquiryActionState] = useState<Record<string, InquiryActionState>>(
    {}
  );
  const [mappingActionState, setMappingActionState] = useState<Record<string, RoomActionState>>({});
  const [roomActionState, setRoomActionState] = useState<RoomActionState>({
    status: "idle",
    message: "Nova soba se cuva u bazi i odmah postaje dostupna u admin kalendaru."
  });
  const [teamActionState, setTeamActionState] = useState<RoomActionState>({
    status: "idle",
    message: "Dodaj stvarne owner/staff clanove kako bi staff panel bio spreman za rad."
  });
  const [taskActionState, setTaskActionState] = useState<RoomActionState>({
    status: "idle",
    message: "Dodaj prvi operativni zadatak za ciscenje, check-in ili pripremu sobe."
  });
  const [syncActionState, setSyncActionState] = useState<SyncActionState>({
    status: "idle",
    message: "Pokreni rucni iCal sync kad hoces da povuces Booking.com izmene odmah."
  });
  const [bookingFilters, setBookingFilters] = useState({
    roomId: "all",
    status: "all",
    date: ""
  });
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    message: "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleTeamFormChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setTeamForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleTaskFormChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setTaskForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    setSelectedImage(nextFile);
    setUploadState({
      status: "idle",
      message: nextFile
        ? `Spremna za upload: ${nextFile.name}`
        : "Dodaj sliku sobe pre cuvanja kako bi se uploadovala na Vercel Blob."
    });
  }

  async function uploadRoomImage(file: File) {
    const body = new FormData();

    body.append("file", file);
    body.append("folder", "rooms");

    const response = await fetch("/api/upload-room-image", {
      method: "POST",
      body
    });

    const result = (await response.json()) as
      | { ok: true; url: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      throw new Error(result.ok ? "Upload nije uspeo." : result.message);
    }

    return result.url;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setRoomActionState({
      status: "submitting",
      message: "Cuvam sobu i pripremam je za admin kalendar..."
    });

    let uploadedImageUrl = "/images/isar-studio.jpg";

    if (selectedImage) {
      setUploadState({
        status: "uploading",
        message: "Uploadujem sliku na Vercel Blob..."
      });

      try {
        uploadedImageUrl = await uploadRoomImage(selectedImage);
        setUploadState({
          status: "success",
          message: "Slika je uspesno uploadovana na Vercel Blob.",
          url: uploadedImageUrl
        });
      } catch (error) {
        setUploadState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Doslo je do greske tokom upload-a."
        });
        setRoomActionState({
          status: "error",
          message: "Soba nije sacuvana zato sto upload slike nije uspeo."
        });
        return;
      }
    }

    const response = await fetch("/api/admin/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        image: uploadedImageUrl,
        pricePerNight: Number(form.pricePerNight || 0),
        capacity: Number(form.capacity || 1),
        amenities: [
          "Wi-Fi",
          "Kupatilo",
          selectedImage ? "Slika sacuvana na Vercel Blob" : "Spremno za Booking.com mapiranje"
        ]
      })
    });

    const result = (await response.json()) as
      | {
          ok: true;
          room: Room;
        }
      | {
          ok: false;
          message: string;
        };

    if (!result.ok) {
      setRoomActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalRooms((current) => [result.room, ...current]);
    setMappingDrafts((current) => ({
      ...current,
      [result.room.id]: createMappingDraft()
    }));
    setForm(initialForm);
    setSelectedImage(null);
    setRoomActionState({
      status: "success",
      message: "Soba je uspesno sacuvana i spremna za Booking.com povezivanje."
    });
  }

  async function handleCreateTeamMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTeamActionState({
      status: "submitting",
      message: "Dodajem clana tima..."
    });

    const response = await fetch("/api/admin/team-members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(teamForm)
    });

    const result = (await response.json()) as
      | { ok: true; member: TeamMember; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTeamActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalTeamMembers((current) => [...current, result.member]);
    setTeamForm(initialTeamForm);
    setTeamActionState({
      status: "success",
      message: result.message
    });
    await refreshOwnerFeed();
  }

  async function handleDeleteTeamMember(memberId: string) {
    setTeamActionState({
      status: "submitting",
      message: "Brisem clana tima..."
    });

    const response = await fetch(`/api/admin/team-members/${memberId}`, {
      method: "DELETE"
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTeamActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalTeamMembers((current) => current.filter((member) => member.id !== memberId));
    setTeamActionState({
      status: "success",
      message: result.message
    });
    await refreshOwnerFeed();
  }

  async function handleCreateCleaningTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTaskActionState({
      status: "submitting",
      message: "Dodajem zadatak..."
    });

    const response = await fetch("/api/admin/cleaning-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskForm)
    });

    const result = (await response.json()) as
      | { ok: true; task: CleaningTask; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTaskActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalCleaningTasks((current) => [...current, result.task]);
    setTaskForm({
      roomId: localRooms[0]?.id ?? "",
      assignee: "",
      dueAt: "",
      status: "todo",
      notes: ""
    });
    setTaskActionState({
      status: "success",
      message: result.message
    });
    await refreshOwnerFeed();
  }

  async function handleDeleteCleaningTask(taskId: string) {
    setTaskActionState({
      status: "submitting",
      message: "Brisem zadatak..."
    });

    const response = await fetch(`/api/admin/cleaning-tasks/${taskId}`, {
      method: "DELETE"
    });

    const result = (await response.json()) as
      | { ok: true; message: string }
      | { ok: false; message: string };

    if (!response.ok || !result.ok) {
      setTaskActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setLocalCleaningTasks((current) => current.filter((task) => task.id !== taskId));
    setTaskActionState({
      status: "success",
      message: result.message
    });
    await refreshOwnerFeed();
  }

  function handleInquiryRoomChange(inquiryId: string, roomId: string) {
    setInquiryRoomSelection((currentValue) => ({
      ...currentValue,
      [inquiryId]: roomId
    }));
  }

  const refreshOwnerFeed = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/owner-feed", {
        method: "GET",
        cache: "no-store"
      });

      const result = (await response.json()) as
        | {
            ok: true;
            activityLog: ActivityLogEntry[];
            inquiries: Inquiry[];
          }
        | {
            ok: false;
          };

      if (!response.ok || !result.ok) {
        return;
      }

      setLocalInquiries(result.inquiries);
      setActivityLog(result.activityLog);
      setInquiryRoomSelection((currentValue) =>
        buildInquiryRoomSelection(localRooms, result.inquiries, currentValue)
      );
    } catch (error) {
      console.error("Owner feed refresh failed", error);
    }
  }, [localRooms]);

  const refreshSyncStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/booking-sync", {
        method: "GET",
        cache: "no-store"
      });

      const result = (await response.json()) as
        | ({ ok: true } & AdminBookingSyncSummary)
        | { ok: false };

      if (!response.ok || !result.ok) {
        return;
      }

      setLocalIntegrationSummary({
        provider: result.provider,
        lastSuccessfulSync: result.lastSuccessfulSync,
        mode: result.mode,
        note: result.note,
        pendingUpdates: result.pendingUpdates
      });
    } catch (error) {
      console.error("Sync status refresh failed", error);
    }
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void refreshOwnerFeed();
    }, 15000);

    const handleWindowFocus = () => {
      void refreshOwnerFeed();
    };

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [refreshOwnerFeed]);

  function updateLocalInquiryStatus(inquiryId: string, nextStatus: InquiryStatus) {
    setLocalInquiries((currentValue) =>
      currentValue.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, status: nextStatus } : inquiry
      )
    );
  }

  async function handleInquiryStatusUpdate(inquiryId: string, nextStatus: Extract<InquiryStatus, "new" | "contacted" | "closed">) {
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "submitting",
        message: getInquiryActionMessage(nextStatus === "closed" ? "closed" : "contacted", "submitting")
      }
    }));

    const response = await fetch(`/api/admin/inquiries/${inquiryId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: nextStatus
      })
    });

    const result = (await response.json()) as
      | {
          ok: true;
          message: string;
          status: InquiryStatus;
        }
      | {
          ok: false;
          message: string;
        };

    if (!response.ok || !result.ok) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    updateLocalInquiryStatus(inquiryId, result.status);
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "success",
        message: result.message
      }
    }));
    await refreshOwnerFeed();
  }

  async function handleConvertInquiry(inquiryId: string) {
    const selectedRoomId = inquiryRoomSelection[inquiryId];

    if (!selectedRoomId) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: "Izaberite sobu pre potvrde."
        }
      }));
      return;
    }

    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "submitting",
        message: getInquiryActionMessage("converted", "submitting")
      }
    }));

    const response = await fetch(`/api/admin/inquiries/${inquiryId}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        roomId: selectedRoomId
      })
    });

    const result = (await response.json()) as
      | {
          ok: true;
          message: string;
          reservation: Booking;
        }
      | {
          ok: false;
          message: string;
        };

    if (!response.ok || !result.ok) {
      setInquiryActionState((currentValue) => ({
        ...currentValue,
        [inquiryId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    setLocalBookings((currentValue) =>
      [...currentValue, result.reservation].sort((leftBooking, rightBooking) =>
        leftBooking.checkIn.localeCompare(rightBooking.checkIn)
      )
    );
    updateLocalInquiryStatus(inquiryId, "converted");
    setInquiryActionState((currentValue) => ({
      ...currentValue,
      [inquiryId]: {
        status: "success",
        message: result.message
      }
    }));
    await refreshOwnerFeed();
  }

  function handleMappingFieldChange(
    roomId: string,
    field: keyof MappingDraft,
    value: string | boolean
  ) {
    setMappingDrafts((current) => ({
      ...current,
      [roomId]: {
        ...(current[roomId] ?? createMappingDraft()),
        [field]: value
      }
    }));
  }

  async function handleSaveMapping(roomId: string) {
    const draft = mappingDrafts[roomId] ?? createMappingDraft();

    setMappingActionState((current) => ({
      ...current,
      [roomId]: {
        status: "submitting",
        message: "Cuvam Booking.com mapping..."
      }
    }));

    const response = await fetch(`/api/admin/rooms/${roomId}/mapping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(draft)
    });

    const result = (await response.json()) as
      | {
          ok: true;
          mapping: RoomChannelMapping;
          message: string;
        }
      | {
          ok: false;
          message: string;
        };

    if (!result.ok) {
      setMappingActionState((current) => ({
        ...current,
        [roomId]: {
          status: "error",
          message: result.message
        }
      }));
      return;
    }

    setLocalMappings((current) => {
      const otherMappings = current.filter((item) => item.roomId !== roomId);
      return [...otherMappings, result.mapping];
    });
    setMappingDrafts((current) => ({
      ...current,
      [roomId]: createMappingDraft(result.mapping)
    }));
    setMappingActionState((current) => ({
      ...current,
      [roomId]: {
        status: "success",
        message: result.message
      }
    }));
    await refreshSyncStatus();
  }

  async function handleRunSync() {
    setSyncActionState({
      status: "submitting",
      message: "Povlacim Booking.com iCal rezervacije i osvezavam health status..."
    });

    const response = await fetch("/api/booking-sync", {
      method: "POST"
    });

    const result = (await response.json()) as
      | {
          ok: true;
          message: string;
          syncedRooms: number;
        }
      | {
          ok: false;
          message: string;
        };

    if (!response.ok || !result.ok) {
      setSyncActionState({
        status: "error",
        message: result.message
      });
      return;
    }

    setSyncActionState({
      status: "success",
      message: `${result.message} Obradjene sobe: ${result.syncedRooms}.`
    });
    await Promise.all([refreshOwnerFeed(), refreshSyncStatus()]);
  }

  const occupiedCount = localRooms.filter((room) => room.status === "occupied").length;
  const upcomingBookings = [...localBookings].sort((leftBooking, rightBooking) =>
    leftBooking.checkIn.localeCompare(rightBooking.checkIn)
  );
  const filteredBookings = upcomingBookings.filter((booking) => {
    const matchesRoom = bookingFilters.roomId === "all" || booking.roomId === bookingFilters.roomId;
    const matchesStatus =
      bookingFilters.status === "all" || booking.status === bookingFilters.status;
    const matchesDate =
      !bookingFilters.date ||
      (booking.checkIn <= bookingFilters.date && booking.checkOut > bookingFilters.date);

    return matchesRoom && matchesStatus && matchesDate;
  });
  const activeInquiries = localInquiries.filter(
    (inquiry) => isActiveInquiryStatus(inquiry.status)
  );
  const resolvedInquiries = localInquiries.filter(
    (inquiry) => !isActiveInquiryStatus(inquiry.status)
  );
  const connectedMappings = localMappings.filter((mapping) => mapping.syncEnabled).length;
  const roomsWithoutMapping = localRooms.length - connectedMappings;

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel hero-panel" id="overview">
        <p className="eyebrow">Owner control panel</p>
        <h1>Pregled soba, rezervacija, tima, zadataka i Booking.com povezivanja</h1>
        <p>
          Owner panel sada automatski osvezava nove upite sa sajta, belezi audit trail i
          omogucava da svaka soba dobije svoj Booking.com room mapping, a tim i zadaci mogu da se
          vode direktno iz istog operativnog panela.
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span>Ukupno soba</span>
            <strong>{localRooms.length}</strong>
          </div>
          <div className="stat-card">
            <span>Zauzeto</span>
            <strong>{occupiedCount}</strong>
          </div>
          <div className="stat-card">
            <span>Booking.com povezano</span>
            <strong>{connectedMappings}</strong>
          </div>
          <div className="stat-card">
            <span>Sobe bez mapiranja</span>
            <strong>{roomsWithoutMapping}</strong>
          </div>
          <div className="stat-card">
            <span>Aktivni upiti</span>
            <strong>{activeInquiries.length}</strong>
          </div>
          <div className="stat-card">
            <span>Clanovi tima</span>
            <strong>{localTeamMembers.length}</strong>
          </div>
          <div className="stat-card">
            <span>Otvoreni zadaci</span>
            <strong>{localCleaningTasks.length}</strong>
          </div>
        </div>
      </section>

      <AdminRoomCalendar
        audience="owner"
        bookings={localBookings}
        onBookingsChange={setLocalBookings}
        onRoomBlocksChange={setLocalRoomBlocks}
        roomBlocks={localRoomBlocks}
        rooms={localRooms}
        sectionId="calendar"
      />

      <div className="dashboard-split-grid">
        <section className="dashboard-panel" id="bookings">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Termini</p>
              <h2>Predstojeci boravci po sobama</h2>
            </div>
          </div>
          <div className="admin-filters">
            <select
              className="admin-inline-select"
              onChange={(event) =>
                setBookingFilters((current) => ({ ...current, roomId: event.target.value }))
              }
              value={bookingFilters.roomId}
            >
              <option value="all">Sve sobe</option>
              {localRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {getRoomDisplayName(room)}
                </option>
              ))}
            </select>
            <select
              className="admin-inline-select"
              onChange={(event) =>
                setBookingFilters((current) => ({ ...current, status: event.target.value }))
              }
              value={bookingFilters.status}
            >
              <option value="all">Svi statusi</option>
              <option value="confirmed">confirmed</option>
              <option value="arriving">arriving</option>
              <option value="checked-in">checked-in</option>
              <option value="checked-out">checked-out</option>
            </select>
            <input
              className="admin-inline-select"
              onChange={(event) =>
                setBookingFilters((current) => ({ ...current, date: event.target.value }))
              }
              type="date"
              value={bookingFilters.date}
            />
          </div>
          {filteredBookings.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Nema rezervacija za izabrani filter</strong>
              <p>Rucne rezervacije, direktni booking i Booking.com sync unosi pojavice se ovde.</p>
            </div>
          ) : (
            <div className="table-like">
              {filteredBookings.map((booking) => {
                const room = localRooms.find((item) => item.id === booking.roomId);

                return (
                  <div key={booking.id} className="table-row">
                    <div>
                      <strong>{room ? getRoomDisplayName(room) : booking.roomId}</strong>
                      <span>{booking.guestName}</span>
                    </div>
                    <div>{booking.source}</div>
                    <div>
                      {booking.checkIn} - {booking.checkOut}
                    </div>
                    <div>
                      <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="dashboard-panel" id="inquiries">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Upiti</p>
              <h2>Novi upiti sa sajta i WhatsApp-a</h2>
            </div>
          </div>
          {activeInquiries.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Nema novih upita</strong>
              <p>Kada stignu novi inquiry unosi iz baze, bice prikazani ovde.</p>
            </div>
          ) : (
            <div className="table-like">
              {activeInquiries.map((inquiry) => (
                <div key={inquiry.id} className="table-row">
                  <div>
                    <strong>{inquiry.guestName}</strong>
                    <span>
                      {inquiry.message} | {inquiry.phone}
                    </span>
                  </div>
                  <div className="admin-inline-stack">
                    <span>
                      {inquiry.requestedRoomType} | {inquiry.guests} gosta
                    </span>
                    <select
                      className="admin-inline-select"
                      onChange={(event) => handleInquiryRoomChange(inquiry.id, event.target.value)}
                      value={inquiryRoomSelection[inquiry.id] ?? ""}
                    >
                      {localRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {getRoomDisplayName(room)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {inquiry.checkIn} - {inquiry.checkOut}
                  </div>
                  <div className="admin-inline-actions">
                    <span className={`status-pill status-inquiry-${inquiry.status}`}>
                      {inquiry.status}
                    </span>
                    <button
                      className="secondary-button"
                      disabled={
                        inquiry.status === "contacted" ||
                        inquiryActionState[inquiry.id]?.status === "submitting"
                      }
                      onClick={() => void handleInquiryStatusUpdate(inquiry.id, "contacted")}
                      type="button"
                    >
                      Oznaci kontaktiranim
                    </button>
                    <button
                      className="secondary-button"
                      disabled={inquiryActionState[inquiry.id]?.status === "submitting"}
                      onClick={() => void handleInquiryStatusUpdate(inquiry.id, "closed")}
                      type="button"
                    >
                      Zatvori upit
                    </button>
                    <button
                      className="secondary-button"
                      disabled={inquiryActionState[inquiry.id]?.status === "submitting"}
                      onClick={() => void handleConvertInquiry(inquiry.id)}
                      type="button"
                    >
                      Pretvori u rezervaciju
                    </button>
                    {inquiryActionState[inquiry.id]?.message ? (
                      <span
                        className={`inline-note ${
                          inquiryActionState[inquiry.id]?.status === "error" ? "inline-note-error" : ""
                        }`}
                      >
                        {inquiryActionState[inquiry.id]?.message}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Istorija</p>
              <h2>Obradjeni upiti</h2>
            </div>
          </div>
          {resolvedInquiries.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Jos nema obradjenih upita</strong>
              <p>Kontaktirani, zatvoreni i pretvoreni upiti pojavljivace se ovde.</p>
            </div>
          ) : (
            <div className="table-like">
              {resolvedInquiries.map((inquiry) => (
                <div key={inquiry.id} className="table-row">
                  <div>
                    <strong>{inquiry.guestName}</strong>
                    <span>
                      {inquiry.requestedRoomType} | {inquiry.guests} gosta
                    </span>
                  </div>
                  <div>{inquiry.phone}</div>
                  <div>
                    {inquiry.checkIn} - {inquiry.checkOut}
                  </div>
                  <div className="admin-inline-actions">
                    <span className={`status-pill status-inquiry-${inquiry.status}`}>
                      {inquiry.status}
                    </span>
                    <span className="inline-note">{inquiry.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Aktivnost</p>
              <h2>Poslednje izmene u sistemu</h2>
            </div>
          </div>
          {activityLog.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Jos nema audit zapisa</strong>
              <p>Promene statusa upita, rezervacija i blokada pojavljivace se ovde.</p>
            </div>
          ) : (
            <div className="table-like">
              {activityLog.map((entry) => (
                <div key={entry.id} className="table-row">
                  <div>
                    <strong>{entry.message}</strong>
                    <span>
                      {entry.entityType} | {entry.action}
                    </span>
                  </div>
                  <div>{entry.actor}</div>
                  <div>{new Date(entry.createdAt).toLocaleString("sr-RS")}</div>
                  <div>
                    <span className="inline-note">{entry.entityId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="dashboard-split-grid">
        <section className="dashboard-panel" id="team-management">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Tim</p>
              <h2>Dodaj owner i staff clanove</h2>
            </div>
          </div>
          <form className="admin-form" onSubmit={handleCreateTeamMember}>
            <input
              name="name"
              onChange={handleTeamFormChange}
              placeholder="Ime i prezime"
              required
              value={teamForm.name}
            />
            <select
              className="admin-inline-select"
              name="role"
              onChange={handleTeamFormChange}
              value={teamForm.role}
            >
              <option value="owner">owner</option>
              <option value="host">host</option>
              <option value="cleaner">cleaner</option>
            </select>
            <input
              name="shift"
              onChange={handleTeamFormChange}
              placeholder="Smena, npr. 08:00 - 16:00"
              required
              value={teamForm.shift}
            />
            <button className="primary-button" type="submit">
              {teamActionState.status === "submitting" ? "Cuvanje..." : "Dodaj clana tima"}
            </button>
            <p
              className={`inline-note ${teamActionState.status === "error" ? "inline-note-error" : ""}`}
            >
              {teamActionState.message}
            </p>
          </form>
          {localTeamMembers.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Tim jos nije dodat</strong>
              <p>Dodaj owner i staff clanove da bi operativni panel bio spreman za smene.</p>
            </div>
          ) : (
            <div className="table-like">
              {localTeamMembers.map((member) => (
                <div key={member.id} className="table-row">
                  <div>
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </div>
                  <div>{member.shift}</div>
                  <div />
                  <div className="admin-inline-actions">
                    <button
                      className="secondary-button"
                      onClick={() => void handleDeleteTeamMember(member.id)}
                      type="button"
                    >
                      Obrisi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-panel" id="task-management">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Zadaci</p>
              <h2>Dodaj operativne taskove</h2>
            </div>
          </div>
          <form className="admin-form" onSubmit={handleCreateCleaningTask}>
            <select
              className="admin-inline-select"
              name="roomId"
              onChange={handleTaskFormChange}
              required
              value={taskForm.roomId}
            >
              {localRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {getRoomDisplayName(room)}
                </option>
              ))}
            </select>
            <input
              name="assignee"
              onChange={handleTaskFormChange}
              placeholder="Zaduzeno lice"
              required
              value={taskForm.assignee}
            />
            <div className="admin-filters">
              <input
                name="dueAt"
                onChange={handleTaskFormChange}
                placeholder="Vreme, npr. 14:30"
                required
                value={taskForm.dueAt}
              />
              <select
                className="admin-inline-select"
                name="status"
                onChange={handleTaskFormChange}
                value={taskForm.status}
              >
                <option value="todo">todo</option>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <textarea
              name="notes"
              onChange={handleTaskFormChange}
              placeholder="Napomena za zadatak"
              required
              rows={4}
              value={taskForm.notes}
            />
            <button className="primary-button" type="submit">
              {taskActionState.status === "submitting" ? "Cuvanje..." : "Dodaj zadatak"}
            </button>
            <p
              className={`inline-note ${taskActionState.status === "error" ? "inline-note-error" : ""}`}
            >
              {taskActionState.message}
            </p>
          </form>
          {localCleaningTasks.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Nema aktivnih zadataka</strong>
              <p>Dodaj prvi zadatak za ciscenje, pripremu sobe ili check-in operativu.</p>
            </div>
          ) : (
            <div className="table-like">
              {localCleaningTasks.map((task) => (
                <div key={task.id} className="table-row">
                  <div>
                    <strong>
                      {getRoomDisplayName(
                        localRooms.find((room) => room.id === task.roomId) ?? {
                          id: task.roomId,
                          name: task.roomId,
                          slug: task.roomId
                        }
                      )}
                    </strong>
                    <span>{task.notes}</span>
                  </div>
                  <div>{task.assignee}</div>
                  <div>{task.dueAt}</div>
                  <div className="admin-inline-actions">
                    <span className={`status-pill status-${task.status}`}>{task.status}</span>
                    <button
                      className="secondary-button"
                      onClick={() => void handleDeleteCleaningTask(task.id)}
                      type="button"
                    >
                      Obrisi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="dashboard-panel" id="mapping">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">Booking.com mapping</p>
            <h2>Povezivanje internih soba sa Booking.com sobama</h2>
          </div>
          <div className="admin-inline-actions">
            <span className="inline-note">
              Povezano: {connectedMappings} / {localRooms.length}
            </span>
            <Link className="text-link" href="/admin/owner/booking-sync">
              Otvori tutorial
            </Link>
          </div>
        </div>
        <div className="booking-mapping-grid">
          {localRooms.map((room) => {
            const mapping = localMappings.find((item) => item.roomId === room.id);
            const draft = mappingDrafts[room.id] ?? createMappingDraft(mapping);
            const visualState = getMappingVisualState(draft);

            return (
              <article key={room.id} className="booking-mapping-card">
                <div className="booking-mapping-card__header">
                  <div>
                    <strong>{getRoomDisplayName(room)}</strong>
                    <span>{room.neighborhood}</span>
                  </div>
                  <span className={`status-pill ${visualState.badgeClassName}`}>
                    {visualState.label}
                  </span>
                </div>
                <div className="admin-form admin-form--dense">
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "externalRoomName", event.target.value)
                    }
                    placeholder="Booking.com room naziv"
                    value={draft.externalRoomName}
                  />
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "externalRoomId", event.target.value)
                    }
                    placeholder="Booking.com room ID (opciono)"
                    value={draft.externalRoomId}
                  />
                  <BookingExportField exportUrl={mapping?.exportUrl || draft.exportUrl} roomId={room.id} />
                  <input
                    onChange={(event) =>
                      handleMappingFieldChange(room.id, "importUrl", event.target.value)
                    }
                    placeholder="Booking.com iCal import URL"
                    value={draft.importUrl}
                  />
                  <label className="admin-checkbox">
                    <input
                      checked={draft.syncEnabled}
                      onChange={(event) =>
                        handleMappingFieldChange(room.id, "syncEnabled", event.target.checked)
                      }
                      type="checkbox"
                    />
                    <span>Aktiviraj sync za ovu sobu</span>
                  </label>
                  <p className="inline-note">
                    Export URL iznad kopiras iz naseg admina i lepis u Booking.com `Import
                    calendar`. U nase polje `importUrl` ide Booking.com `.ics` link za istu sobu.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => void handleSaveMapping(room.id)}
                    type="button"
                  >
                    Sacuvaj mapping
                  </button>
                  <p
                    className={`inline-note ${
                      mappingActionState[room.id]?.status === "error" ? "inline-note-error" : ""
                    }`}
                  >
                    {mappingActionState[room.id]?.message ||
                      (mapping?.lastSyncedAt
                        ? `Poslednji sync: ${mapping.lastSyncedAt}`
                        : "Unesi Booking.com room podatke ili sacuvaj draft za kasnije.")}
                  </p>
                  {mapping?.lastSyncStatus ? (
                    <span
                      className={`status-pill ${
                        mapping.lastSyncStatus === "success"
                          ? "status-mapped"
                          : mapping.lastSyncStatus === "error"
                            ? "status-maintenance"
                            : "status-draft"
                      }`}
                    >
                      sync: {mapping.lastSyncStatus}
                    </span>
                  ) : null}
                  {mapping?.lastSyncError ? (
                    <p className="inline-note inline-note-error">{mapping.lastSyncError}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="dashboard-split-grid">
        <section className="dashboard-panel" id="rooms">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Sobe</p>
              <h2>Dodaj novu sobu</h2>
            </div>
            <span className="inline-note">
              Forma cuva sobu kroz admin API i podrzava upload slike.
            </span>
          </div>
          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              name="roomNumber"
              onChange={handleChange}
              placeholder="Broj sobe"
              required
              value={form.roomNumber}
            />
            <input
              name="neighborhood"
              placeholder="Lokacija u Minhenu"
              value={form.neighborhood}
              onChange={handleChange}
              required
            />
            <input
              name="pricePerNight"
              placeholder="Cena po noci"
              type="number"
              value={form.pricePerNight}
              onChange={handleChange}
              required
            />
            <input
              name="capacity"
              placeholder="Kapacitet"
              type="number"
              value={form.capacity}
              onChange={handleChange}
              required
            />
            <input
              name="beds"
              placeholder="Tip kreveta"
              value={form.beds}
              onChange={handleChange}
              required
            />
            <textarea
              name="shortDescription"
              placeholder="Kratak opis smestaja"
              value={form.shortDescription}
              onChange={handleChange}
              rows={4}
              required
            />
            <label className="admin-file-field">
              <span>Slika sobe (opciono)</span>
              <input
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                type="file"
              />
            </label>
            <p
              className={`inline-note ${uploadState.status === "error" ? "inline-note-error" : ""}`}
            >
              {uploadState.message}
              {uploadState.url ? (
                <>
                  {" "}
                  <a href={uploadState.url} rel="noreferrer" target="_blank">
                    Otvori upload
                  </a>
                </>
              ) : null}
            </p>
            <button type="submit" className="primary-button">
              {roomActionState.status === "submitting" || uploadState.status === "uploading"
                ? "Cuvanje u toku..."
                : "Sacuvaj sobu"}
            </button>
            <p
              className={`inline-note ${roomActionState.status === "error" ? "inline-note-error" : ""}`}
            >
              {roomActionState.message}
            </p>
          </form>
        </section>

        <section className="dashboard-panel" id="inventory">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Inventar</p>
              <h2>Aktivne jedinice</h2>
            </div>
            <Link className="text-link" href="/admin/owner/rooms">
              Otvori room manager
            </Link>
          </div>
          {localRooms.length === 0 ? (
            <div className="admin-empty-state">
              <strong>Jos nema soba u bazi</strong>
              <p>Dodaj prvu sobu kroz owner admin da bi se pojavila i u kalendaru i u inventaru.</p>
            </div>
          ) : (
            <div className="table-like">
              {localRooms.map((room) => {
                const mapping = localMappings.find((item) => item.roomId === room.id);

                return (
                  <div key={room.id} className="table-row">
                    <div>
                      <strong>{getRoomDisplayName(room)}</strong>
                      <span>{room.neighborhood}</span>
                    </div>
                    <div>{room.capacity} gosta</div>
                    <div>{room.pricePerNight} EUR</div>
                    <div className="admin-inline-actions">
                      <span className={`status-pill status-${room.status}`}>{room.status}</span>
                      <span
                        className={`status-pill ${
                          mapping?.syncEnabled ? "status-mapped" : "status-unmapped"
                        }`}
                      >
                        {mapping?.syncEnabled ? "Booking.com" : "bez sync-a"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <section className="dashboard-panel" id="integrations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Integracije</p>
            <h2>Booking.com sync status</h2>
          </div>
        </div>
          <div className="sync-card">
          <div className="admin-inline-actions admin-inline-actions--wrap">
            <button
              className="primary-button"
              onClick={() => void handleRunSync()}
              type="button"
            >
              {syncActionState.status === "submitting" ? "Sync u toku..." : "Sync now"}
            </button>
            <span
              className={`inline-note ${
                syncActionState.status === "error" ? "inline-note-error" : ""
              }`}
            >
              {syncActionState.message}
            </span>
          </div>
          <div className="sync-item">
            <span>Provider</span>
            <strong>{localIntegrationSummary.provider}</strong>
          </div>
          <div className="sync-item">
            <span>Poslednji sync</span>
            <strong>{localIntegrationSummary.lastSuccessfulSync ?? "Jos nema sync zapisa"}</strong>
          </div>
          <div className="sync-item">
            <span>Pending updates</span>
            <strong>{localIntegrationSummary.pendingUpdates}</strong>
          </div>
          <div className="sync-item">
            <span>Aktivne mape soba</span>
            <strong>{connectedMappings}</strong>
          </div>
          <div className="sync-item">
            <span>Mode</span>
            <strong>{localIntegrationSummary.mode}</strong>
          </div>
          <p>{localIntegrationSummary.note}</p>
        </div>
      </section>
    </div>
  );
}
