import { EmailBody, EmailBodyHtml } from "@/components/email-body"
import { ResetEmailHtml } from "@/components/reset-email"
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

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

  const emailProps = {
    resetPasswordLink: resetLink,
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset your Password",
    html: ResetEmailHtml(emailProps),
  })
}
