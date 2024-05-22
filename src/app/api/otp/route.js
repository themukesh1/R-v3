import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const {email,otp} = await request.json()
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Verification OTP',
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({data});
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}