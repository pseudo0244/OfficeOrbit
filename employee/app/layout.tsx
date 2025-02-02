import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

// Import the font
const inter = Inter({ subsets: ["latin"] });

// Server-side metadata export
export const metadata: Metadata = {
  title: "Employee Dashboard",
  description: "Book your seat and search for employees",
};

// No 'use client' directive here as it should be a server-side layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
