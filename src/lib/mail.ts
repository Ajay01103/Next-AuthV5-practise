import { TwoFactorEmailHtml } from "@/components/2fa-code-email"
import { EmailBodyHtml } from "@/components/email-body"
import { ResetEmailHtml } from "@/components/reset-email"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (email: string, token: string, name?: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

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
  const resetLink = `${domain}/auth/new-password?token=${token}`

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

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const TwoFactorProps = {
    TwoFactorcode: token,
  }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Two Factor Auth PIN",
    html: TwoFactorEmailHtml(TwoFactorProps),
  })
}
