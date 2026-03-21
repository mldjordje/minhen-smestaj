import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { InquiryStatus } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type InquiryRow = {
  id: string;
  status: InquiryStatus;
};

const allowedStatuses: InquiryStatus[] = ["new", "contacted", "closed"];

function getStatusMessage(status: InquiryStatus) {
  switch (status) {
    case "contacted":
      return "Upit je oznacen kao kontaktiran.";
    case "closed":
      return "Upit je zatvoren.";
    default:
      return "Upit je vracen u status novog.";
  }
}

export async function POST(request: Request, context: RouteContext) {
  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        message: "Baza nije povezana."
      },
      { status: 500 }
    );
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as {
      status?: InquiryStatus;
    };

    if (!payload.status || !allowedStatuses.includes(payload.status)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Prosledjen je neispravan status upita."
        },
        { status: 400 }
      );
    }

    const inquiryRows = await db<InquiryRow[]>`
      select id, status
      from inquiries
      where id = ${id}
      limit 1
    `;

    const inquiry = inquiryRows[0];

    if (!inquiry) {
      return NextResponse.json(
        {
          ok: false,
          message: "Upit nije pronadjen."
        },
        { status: 404 }
      );
    }

    if (inquiry.status === "converted") {
      return NextResponse.json(
        {
          ok: false,
          message: "Pretvoren upit nije moguce menjati kroz status akcije."
        },
        { status: 400 }
      );
    }

    if (inquiry.status === payload.status) {
      return NextResponse.json({
        ok: true,
        message: getStatusMessage(payload.status),
        status: payload.status
      });
    }

    await db`
      update inquiries
      set status = ${payload.status}
      where id = ${id}
    `;

    return NextResponse.json({
      ok: true,
      message: getStatusMessage(payload.status),
      status: payload.status
    });
  } catch (error) {
    console.error("Inquiry status update failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Promena statusa upita nije uspela."
      },
      { status: 500 }
    );
  }
}
