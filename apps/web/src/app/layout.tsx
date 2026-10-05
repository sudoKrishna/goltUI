import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelFont = localFont({
  src: "./fonts/pixelart.ttf",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "goltUI — Copy-paste UI blocks for React & Tailwind",
  description:
    "goltUI is a copy-paste library of React + Tailwind components, blocks, and templates.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelFont.variable} h-full antialiased dark`}
    >
      <head>
        <link
          rel="stylesheet"
          precedence="default"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Silkscreen&family=Pixelify+Sans&family=Handjet&family=Roboto&family=Montserrat&family=Playfair+Display&family=Lora&family=Poppins&family=Oswald&family=Lobster&family=Pacifico&family=Bebas+Neue&family=Cormorant+Garamond&family=Space+Mono&family=Fira+Code&family=Anton&family=Caveat&family=Righteous&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
