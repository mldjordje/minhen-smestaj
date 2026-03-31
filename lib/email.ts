import nodemailer from "nodemailer";

type EmailMessage = {
  html: string;
  subject: string;
  text: string;
  to: string | string[];
};

let transporterPromise: Promise<nodemailer.Transporter | null> | null = null;

async function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) {
    return null;
  }

  if (!transporterPromise) {
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth:
          process.env.SMTP_USER && (process.env.SMTP_PASSWORD || process.env.SMTP_PASS)
            ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS
              }
            : undefined
      })
    );
  }

  return transporterPromise;
}

export async function sendEmail(message: EmailMessage) {
  const transporter = await getTransporter();

  if (!transporter) {
    console.warn("SMTP is not configured. Email skipped.", message.subject);
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: Array.isArray(message.to) ? message.to.join(", ") : message.to,
    subject: message.subject,
    text: message.text,
    html: message.html
  });
}

export async function sendBookingEmails(params: {
  adminEmail?: string;
  bookingReference: string;
  checkIn: string;
  checkOut: string;
  guestEmail: string;
  guestName: string;
  guests: number;
  roomName: string;
}) {
  const adminEmail = params.adminEmail || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL_TO;

  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `Novi booking ${params.bookingReference}`,
      text: `${params.guestName} je rezervisao ${params.roomName} od ${params.checkIn} do ${params.checkOut} za ${params.guests} gosta.`,
      html: `<p><strong>${params.guestName}</strong> je rezervisao <strong>${params.roomName}</strong>.</p><p>Termin: ${params.checkIn} - ${params.checkOut}</p><p>Broj gostiju: ${params.guests}</p><p>Referenca: ${params.bookingReference}</p>`
    });
  }

  await sendEmail({
    to: params.guestEmail,
    subject: `Potvrda rezervacije ${params.bookingReference}`,
    text: `Rezervacija za ${params.roomName} je potvrdena od ${params.checkIn} do ${params.checkOut}.`,
    html: `<p>Rezervacija je potvrdena.</p><p><strong>${params.roomName}</strong></p><p>Termin: ${params.checkIn} - ${params.checkOut}</p><p>Broj gostiju: ${params.guests}</p><p>Referenca: ${params.bookingReference}</p>`
  });
}

export async function sendInquiryAdminEmail(params: {
  bookingMode?: "daily" | "monthly";
  checkIn: string;
  checkOut: string;
  guestName: string;
  guests: number;
  phone: string;
  roomName: string;
  selectionSummary?: string | null;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL_TO;

  if (!adminEmail) {
    return;
  }

  const bookingModeLabel = params.bookingMode === "monthly" ? "Mesecni upit" : "Dnevni upit";
  const summaryLine = params.selectionSummary ? `\nOdabrani period: ${params.selectionSummary}` : "";

  await sendEmail({
    to: adminEmail,
    subject: `Novi inquiry za ${params.roomName}`,
    text: `${bookingModeLabel}: ${params.guestName} je poslao inquiry za ${params.roomName} (${params.checkIn} - ${params.checkOut}). Telefon: ${params.phone}${summaryLine}`,
    html: `<p><strong>${bookingModeLabel}</strong> za <strong>${params.roomName}</strong>.</p><p>Gost: ${params.guestName}</p><p>Termin: ${params.checkIn} - ${params.checkOut}</p><p>Broj gostiju: ${params.guests}</p><p>Telefon: ${params.phone}</p>${params.selectionSummary ? `<p>Odabrani period: ${params.selectionSummary}</p>` : ""}`
  });
}
