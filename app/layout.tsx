import type { Metadata } from "next";
import { Space_Grotesk, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Paul Cobley | Founder, Operator, Technical Architect",
  description:
    "Personal website for Paul Cobley - exited founder, fractional COO, and hands-on technical architect helping companies scale without founder dependency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${sora.variable} ${plexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
