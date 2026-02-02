import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "301A TECH LTD - Technology That Works for You",
    template: "%s | 301A TECH LTD",
  },
  description: "Professional technology solutions including software development, smart homes, IT training, networking, security, and data analytics.",
  keywords: ["software development", "IT solutions", "smart homes", "networking", "cybersecurity", "data analytics", "IT training"],
  authors: [{ name: "301A TECH LTD" }],
  creator: "301A TECH LTD",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://301atech.com",
    siteName: "301A TECH LTD",
    title: "301A TECH LTD - Technology That Works for You",
    description: "Professional technology solutions including software development, smart homes, IT training, networking, security, and data analytics.",
    images: [
      {
        url: "/logo.png",
        width: 640,
        height: 514,
        alt: "301A TECH LTD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "301A TECH LTD - Technology That Works for You",
    description: "Professional technology solutions for businesses and individuals.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
