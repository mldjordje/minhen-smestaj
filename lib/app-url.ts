function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

export function getAppBaseUrl() {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000"
  );
}

export function getRequestBaseUrl(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";

  if (forwardedHost) {
    return normalizeBaseUrl(`${forwardedProto}://${forwardedHost}`);
  }

  return getAppBaseUrl();
}

export function buildRoomExportUrl(roomId: string) {
  return `${getAppBaseUrl()}/api/booking-sync/rooms/${roomId}`;
}

export function buildRoomExportUrlForRequest(request: Request, roomId: string) {
  return `${getRequestBaseUrl(request)}/api/booking-sync/rooms/${roomId}`;
}
