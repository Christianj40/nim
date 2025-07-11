import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-templates/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const { name, email, message } = await request.json();

		const data = await resend.emails.send({
			from: process.env.CONTACT_EMAIL || "",
			to: ["christian@staggraphics.com"],
			subject: `New Contact Form Submission from ${name}`,
			react: EmailTemplate({ name, email, message }),
			text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error("Email error:", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
