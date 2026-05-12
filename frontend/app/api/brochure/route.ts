import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { readFile } from "fs/promises";

type BrochurePayload = {
  name: string;
  email: string;
  mobile: string;
};

function asText(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function isNonEmptyString(v: string) {
  return v.length > 0;
}

const BROCHURE_PUBLIC_PATH = "/Aalgorix_World_Academy_Brochure.pdf";

export async function POST(req: Request) {
  let body: BrochurePayload | null = null;
  try {
    body = (await req.json()) as BrochurePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = asText(body?.name);
  const email = asText(body?.email);
  const mobile = asText(body?.mobile);

  if (![name, email, mobile].every((v) => isNonEmptyString(v))) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  const downloadUrl = `${origin}${BROCHURE_PUBLIC_PATH}`;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.BROCHURE_FROM_EMAIL || process.env.INQUIRY_FROM_EMAIL || user;

  // If SMTP isn't configured, still return the download URL so the UX works.
  if (!host || !user || !pass || !from) {
    return NextResponse.json({
      ok: true,
      emailSent: false,
      downloadUrl,
      message:
        "SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally BROCHURE_FROM_EMAIL).",
    });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  let attachment: { filename: string; content: Buffer; contentType: string } | null = null;
  try {
    const filePath = path.join(process.cwd(), "public", "Aalgorix_World_Academy_Brochure.pdf");
    const content = await readFile(filePath);
    attachment = {
      filename: "Aalgorix_World_Academy_Brochure.pdf",
      content,
      contentType: "application/pdf",
    };
  } catch {
    attachment = null;
  }

  const subject = "Aalgorix World Academy Brochure";
  const text = [
    `Hi ${name},`,
    "",
    "Thanks for your interest in Aalgorix World Academy.",
    "",
    `Download brochure: ${downloadUrl}`,
    "",
    `Mobile: ${mobile}`,
    "",
    "Regards,",
    "Aalgorix World Academy",
  ].join("\n");

  await transporter.sendMail({
    from,
    to: email,
    subject,
    text,
    attachments: attachment ? [attachment] : undefined,
  });

  // Optional: notify admin if configured.
  const adminTo = process.env.BROCHURE_ADMIN_EMAIL || process.env.INQUIRY_TO_EMAIL;
  if (adminTo) {
    await transporter.sendMail({
      from,
      to: adminTo,
      subject: `Brochure requested: ${name}`,
      text: [`Brochure requested`, "", `Name: ${name}`, `Email: ${email}`, `Mobile: ${mobile}`, `Time: ${new Date().toISOString()}`].join(
        "\n",
      ),
    });
  }

  return NextResponse.json({ ok: true, emailSent: true, downloadUrl });
}

