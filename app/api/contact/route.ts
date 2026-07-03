import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "ademsems93@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const consent = body.consent === true;

  const errors: FieldErrors = {};
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Name is too long.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!message) errors.message = "Please enter a message.";
  else if (message.length > 5000) errors.message = "Message is too long.";
  if (!consent) errors.consent = "Consent is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Env var absent (e.g. local dev without .env.local) — fail cleanly so the
    // UI can show the direct-email fallback instead of crashing.
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const from =
      process.env.CONTACT_FROM_EMAIL || "Adem Asha Website <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "The message could not be sent." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "The message could not be sent." },
      { status: 502 }
    );
  }
}
