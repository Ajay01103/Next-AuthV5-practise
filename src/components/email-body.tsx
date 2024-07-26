import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  render,
  Section,
  Text,
  Link,
} from "@react-email/components"
import * as React from "react"
import { Header } from "./header"

interface EmailProps {
  href: string
  name: string
}

export const EmailBody = ({ href, name }: EmailProps) => (
  <Html>
    <Head />
    <Preview>AuthJS the best NextJs auth solution</Preview>
    <Body style={main}>
      <Container style={container}>
        <Header label="AuthJS" />
        <Text style={paragraph}>Hi {name}</Text>
        <Text style={paragraph}>
          Welcome to AuthJs the all in one auth solution for SAAS founders and fast shippers
        </Text>
        <Section style={btnContainer}>
          <Link
            style={button}
            href={href}
          >
            Get started
          </Link>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Koala team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>470 Noor Ave STE B #1148, South San Francisco, CA 94080</Text>
      </Container>
    </Body>
  </Html>
)

export const EmailBodyHtml = (props: EmailProps) =>
  render(<EmailBody {...props} />, {
    pretty: true,
  })

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const logo = {
  margin: "0 auto",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const btnContainer = {
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}
