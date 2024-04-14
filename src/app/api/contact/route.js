import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req) {
    try {
        console.log('Incoming request body:', req.body);
        const { fname, phone, email, subject, message } = await req.json();

        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOption = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: "Dreamlabs: You got a message.",
            html: `
            <h3>Hello, Nicole</h3>
            <p>Someone sent a message from your Dreamlabs app.</p>
            <ul>
            <li><strong>Full name:</strong> ${fname}</li><br />
            ${phone ? `<li><strong>Phone number:</strong> ${phone}</li><br />` : ''}
            <li><strong>Email:</strong> ${email}</li><br />
            <li><strong>Subject:</strong> ${subject}</li><br />
            <li><strong>Message:</strong> ${message}</li><br />
            </ul>
            `
        }

        await transporter.sendMail(mailOption)
        return NextResponse.json({ message: "Email sent." })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Failed to send email." })
    }
}