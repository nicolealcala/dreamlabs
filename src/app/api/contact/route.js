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

        const mailOptionsToAdmin = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: "Dreamlabs: You got a message.",
            html: `
            <table style="max-width: 550px; border-collapse: collapse; background: white; border-radius:10px">
                <tr style="width: 100%;">
                    <td style="
                    border: 1px solid #CDCDCD;
                    border-radius: 10px;
                    overflow: hidden;
                    ">
                        <table style="width: 100%;">
                            <tr>
                                <td style="
                                font-size: 24px;
                                font-weight: 500;
                                height: 80px;
                                line-height: 80px;
                                padding-left: 15px;
                                background: linear-gradient(130deg, rgba(28, 11, 36, 1) 0%, rgba(33, 18, 60, 1) 60%, rgba(62, 30, 64, 1) 100%);
                                color: white;
                                ">
                                   dreamlabs
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px;">
                                    <h3>Hello, Nicole</h3>
                                    <p>Someone sent a message via Dreamlabs.</p>
        
                                    <div style="margin-top: 15px;">
                                    <p><strong>Name:</strong> ${fname}
                                    <br />
                                    ${phone ? `<strong>Phone number:</strong> ${phone}
                                    <br />` : ''}
                                    <strong>Email:</strong> ${email}
                                    <br />
                                    <strong>Subject:</strong> ${subject}
                                    </p>
                                    <p style="margin-top: 20px">${message}</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            `
        }

        const mailOptionsToUser = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Dreamlabs: Your message has been received – We're on it! 🚀.",
            html: `
            <table style="max-width: 550px; border-collapse: collapse; background: white; border-radius:10px">
                <tr style="width: 100%;">
                    <td style="
                    border: 1px solid #CDCDCD;
                    border-radius: 10px;
                    overflow: hidden;
                    ">
                        <table style="width: 100%;">
                            <tr>
                                <td style="
                                font-size: 24px;
                                font-weight: 500;
                                height: 80px;
                                line-height: 80px;
                                padding-left: 15px;
                                background: linear-gradient(130deg, rgba(28, 11, 36, 1) 0%, rgba(33, 18, 60, 1) 60%, rgba(62, 30, 64, 1) 100%);
                                color: white;
                                ">
                                   dreamlabs
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px;">
                                    <h3>Hello, ${fname}</h3>
                                    <p>Thank you for reaching out! Your message has been successfully delivered, and we appreciate your patience as we carefully review your inquiry.
                                    </p>
                                    <p>
                                    Please expect a response within 2-3 business days. If you have any urgent concerns, please don't hesitate to contact me at [nclmalcala@gmail.com].</p>
                                    <p>Warm regards,
                                    <br />
                                    Nicole - Dreamlabs Developer
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="border-top: 1px solid #CDCDCD;">
                        <p style="font-size: 12px; color: #777;">
                            <em>This email is auto-generated. Please do not reply to this message.</em>
                        </p>
                    </td>
            </tr>
            </table>
            `
        }
        //Send email to admin
        await transporter.sendMail(mailOptionsToAdmin)
        //Send email to user
        await transporter.sendMail(mailOptionsToUser)
        return NextResponse.json({ message: "Email sent." })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Failed to send email." })
    }
}