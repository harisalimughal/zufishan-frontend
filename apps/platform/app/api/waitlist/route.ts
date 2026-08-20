import { NextResponse } from "next/server";
import { Resend } from "resend";

type WaitlistPayload = {
  fullName: string;
  email: string;
  userType: string;
  focusArea: string;
  agreeToUpdates: boolean;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<WaitlistPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const userType = body.userType?.trim() || "student";
  const focusArea = body.focusArea?.trim() || "Not specified";
  const agreeToUpdates = Boolean(body.agreeToUpdates);

  if (!fullName || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name and email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.WAITLIST_TO_EMAIL;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL || "Zufishan Waitlist <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.error("Waitlist route misconfigured: missing RESEND_API_KEY or WAITLIST_TO_EMAIL");
    return NextResponse.json(
      { error: "Waitlist signups are temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Zufishan Waitlist: ${fullName}`,
    text: [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `I am a: ${userType}`,
      `Focus area: ${focusArea}`,
      `Wants product updates: ${agreeToUpdates ? "Yes" : "No"}`
    ].join("\n")
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
