import { EmailBody, EmailBodyHtml } from "@/components/email-body"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

export const sendVerificationEmail = async (email: string, token: string, name?: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

  const emailProps = {
    href: confirmLink,
    name: name || "",
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Confirm your email",
    html: EmailBodyHtml(emailProps),
  })
}
