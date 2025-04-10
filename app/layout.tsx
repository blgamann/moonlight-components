import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "moonlight components",
  description:
    "A collection of reusable React components with a moonlight-inspired design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
