import type React from "react"
import type { Metadata } from "next"
import { Roboto, Open_Sans } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Society of Legal Excellence - Empowering Future Legal Professionals",
  description:
    "The Society of Legal Excellence (SLE) is a registered non-profit organization committed to the empowerment and advancement of aspiring legal professionals.",
  keywords: "legal education, mentorship, law students, legal professionals, non-profit, South Africa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
