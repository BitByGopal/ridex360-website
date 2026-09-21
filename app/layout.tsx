import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RideX360 — Smart Mobility. Safer Journeys.",
  description:
    "RideX360 is a transportation management platform that connects organizations, drivers and passengers through one system — for schools, companies, hospitals, factories and more.",
  openGraph: {
    title: "RideX360 — Smart Mobility. Safer Journeys.",
    description:
      "One connected platform for every journey. Live tracking, smart routing and safety workflows for organizational transportation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}