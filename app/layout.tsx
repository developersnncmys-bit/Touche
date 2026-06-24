import type { Metadata } from "next";
import { Inter_Tight, Inter, Baskervville } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

// Baskervville — serif used only for the italic accent line in the hero.
// Gives that "Designs Inspired by Milan…" Aiti-style script feel.
const script = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Touché — Interior Design Studio | Bangalore",
  description:
    "Touché is a Bangalore-based interior design studio crafting refined residential and commercial spaces. Founded by Apoorva Yadav R.",
  keywords: [
    "interior design",
    "luxury interior",
    "residential design",
    "commercial interiors",
    "Bangalore interior designer",
    "Touché",
  ],
  openGraph: {
    title: "Touché — Interior Design Studio",
    description:
      "Refined interiors. Considered details. A practice rooted in restraint.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${script.variable}`}>
      <body className="bg-ivory text-ink antialiased">
        <Preloader />
        <SmoothScroll>
          <Navigation />
          <PageTransition>
            <main>{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
