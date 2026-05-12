import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type InquiryPayload = {
  name: string;
  grade: string;
  email: string;
  country: string;
  city: string;
  countryCode: string;
  mobile: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function asText(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: InquiryPayload | null = null;
  try {
    body = (await req.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = asText(body?.name);
  const grade = asText(body?.grade);
  const email = asText(body?.email);
  const country = asText(body?.country);
  const city = asText(body?.city);
  const countryCode = asText(body?.countryCode);
  const mobile = asText(body?.mobile);

  if (![name, grade, email, country, city, countryCode, mobile].every((v) => isNonEmptyString(v))) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL || process.env.SMTP_USER;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!to || !from || !host || !user || !pass) {
    // Still return ok=false so you notice misconfiguration.
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO_EMAIL (and optionally INQUIRY_FROM_EMAIL).",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `New enquiry: ${name} (Grade: ${grade})`;
  const text = [
    "New enquiry received:",
    "",
    `Name: ${name}`,
    `Grade: ${grade}`,
    `Email: ${email}`,
    `Phone: ${countryCode} ${mobile}`,
    `Country: ${country}`,
    `City: ${city}`,
    "",
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject,
    text,
  });

  return NextResponse.json({ ok: true });
}

