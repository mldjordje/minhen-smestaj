export function getAppBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000";
}

export function buildRoomExportUrl(roomId: string) {
  return `${getAppBaseUrl()}/api/booking-sync/rooms/${roomId}`;
}
