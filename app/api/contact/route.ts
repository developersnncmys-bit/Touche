import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  location?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, projectType, message } = body;

  if (!name || !email || !projectType || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // SMTP integration placeholder:
  // In production, send via nodemailer / SendGrid / Resend here.
  // Configure SMTP_HOST, SMTP_USER, SMTP_PASS in env, then dispatch
  // (1) studio notification to Apoorva, (2) confirmation auto-reply to enquirer.
  console.log("[Touché enquiry]", {
    receivedAt: new Date().toISOString(),
    ...body,
  });

  return NextResponse.json({ ok: true });
}
