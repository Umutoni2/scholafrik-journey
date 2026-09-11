import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import "./journey.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-journey-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-journey-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My ScholAfrik Journey | Umutoni Rutaganira Sylvie",
  description:
    "A standalone digital internship experience — from early ScholAfrik work to professional growth as a Front-End Developer Intern.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
