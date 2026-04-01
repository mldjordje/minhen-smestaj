"use client";

import { useEffect, useState } from "react";

type BookingExportFieldProps = {
  exportUrl?: string;
  roomId: string;
};

function buildRoomExportUrlFromOrigin(roomId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.origin}/api/booking-sync/rooms/${roomId}`;
}

export function BookingExportField({ exportUrl, roomId }: BookingExportFieldProps) {
  const [fallbackUrl, setFallbackUrl] = useState(exportUrl ?? "");
  const [copyFeedback, setCopyFeedback] = useState("");

  useEffect(() => {
    setFallbackUrl(buildRoomExportUrlFromOrigin(roomId) || exportUrl || "");
  }, [exportUrl, roomId]);

  const resolvedExportUrl = fallbackUrl || exportUrl;

  async function handleCopy() {
    if (!resolvedExportUrl) {
      setCopyFeedback("Export link jos nije spreman.");
      return;
    }

    try {
      await navigator.clipboard.writeText(resolvedExportUrl);
      setCopyFeedback("Link je kopiran. Nalepi ga u Booking.com > Import calendar.");
    } catch (error) {
      console.error("Copy export URL failed", error);
      setCopyFeedback("Copy nije uspeo. Otvori link i kopiraj ga rucno.");
    }
  }

  return (
    <div className="export-feed-box">
      <span className="export-feed-box__label">Export URL za Booking.com import</span>
      <div className="export-feed-box__row">
        <input readOnly value={resolvedExportUrl} />
        <button className="secondary-button" onClick={() => void handleCopy()} type="button">
          Kopiraj link
        </button>
      </div>
      <div className="admin-inline-actions admin-inline-actions--wrap">
        <span className="inline-note">
          Ovaj link lepis u Booking.com kada kliknes na `Import calendar`.
        </span>
        {resolvedExportUrl ? (
          <a className="text-link" href={resolvedExportUrl} rel="noreferrer" target="_blank">
            Otvori export feed
          </a>
        ) : null}
      </div>
      {copyFeedback ? <p className="inline-note">{copyFeedback}</p> : null}
    </div>
  );
}
