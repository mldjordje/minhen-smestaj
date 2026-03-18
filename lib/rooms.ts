import { Room } from "@/lib/types";

function normalizeRoomNumber(value: string) {
  const trimmedValue = value.trim();

  if (/^\d+$/.test(trimmedValue)) {
    return String(Number(trimmedValue));
  }

  return trimmedValue.replace(/\s+/g, "-").toLowerCase();
}

function extractRoomNumber(value: string) {
  const roomMatch = value.match(/soba[\s-]*(\d+)/i);

  if (roomMatch) {
    return String(Number(roomMatch[1]));
  }

  return null;
}

function extractLegacyRoomNumber(roomId: string) {
  const legacyMatch = roomId.match(/^rm-(\d)\d{2}$/i);

  if (legacyMatch) {
    return String(Number(legacyMatch[1]));
  }
 
  return null;
}

function extractGenericDigits(value: string) {
  const fallbackMatch = value.match(/(\d+)/);

  if (fallbackMatch) {
    return String(Number(fallbackMatch[1]));
  }

  return null;
}

export function createRoomIdentity(roomNumber: string) {
  const normalizedRoomNumber = normalizeRoomNumber(roomNumber);

  return {
    roomNumber: normalizedRoomNumber,
    name: `Soba ${normalizedRoomNumber}`,
    slug: `soba-${normalizedRoomNumber}`
  };
}

export function getRoomDisplayName(room: Pick<Room, "id" | "name" | "slug">) {
  const roomNumber =
    extractRoomNumber(room.name) ??
    extractRoomNumber(room.slug) ??
    extractLegacyRoomNumber(room.id) ??
    extractGenericDigits(room.name) ??
    extractGenericDigits(room.slug) ??
    extractGenericDigits(room.id);

  if (!roomNumber) {
    return room.name;
  }

  return `Soba ${roomNumber}`;
}
