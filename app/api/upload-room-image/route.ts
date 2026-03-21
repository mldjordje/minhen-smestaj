import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_UPLOAD_SIZE_BYTES = 4 * 1024 * 1024;

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  const roleCheck = await requireApiRole(request, ["owner"]);

  if (roleCheck instanceof NextResponse) {
    return roleCheck;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Nedostaje BLOB_READ_WRITE_TOKEN. Povezi Vercel Blob i povuci env promenljive lokalno."
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");
    const folderEntry = formData.get("folder");

    if (!(fileEntry instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Nije prosledjena slika za upload."
        },
        { status: 400 }
      );
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(fileEntry.type)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Dozvoljeni su samo JPG, PNG i WEBP formati."
        },
        { status: 400 }
      );
    }

    if (fileEntry.size > MAX_UPLOAD_SIZE_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          message: "Slika je prevelika. Limit za ovu server upload varijantu je 4 MB."
        },
        { status: 400 }
      );
    }

    const folder =
      typeof folderEntry === "string" && folderEntry.trim().length > 0
        ? folderEntry.trim().replace(/^\/+|\/+$/g, "")
        : "rooms";

    const pathname = `${folder}/${Date.now()}-${sanitizeFilename(fileEntry.name)}`;

    const blob = await put(pathname, fileEntry, {
      access: "public",
      addRandomSuffix: true,
      contentType: fileEntry.type
    });

    return NextResponse.json({
      ok: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      contentType: fileEntry.type,
      size: fileEntry.size
    });
  } catch (error) {
    console.error("Blob upload failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Upload na Vercel Blob nije uspeo."
      },
      { status: 500 }
    );
  }
}
