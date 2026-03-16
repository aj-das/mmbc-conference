import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const monumentExtended = localFont({
  src: [
    {
      path: "../fonts/MonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MonumentExtended-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-monument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MMBC Conference",
  description: "Michigan Music Business Conference mobile experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monumentExtended.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
