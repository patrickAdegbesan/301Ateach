import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Careers at 301A TECH LTD - Join Our Team",
    template: "%s | 301A TECH Careers",
  },
  description: "Explore exciting career opportunities at 301A TECH LTD. Join a team of passionate professionals working on cutting-edge technology solutions.",
  keywords: ["careers", "jobs", "technology jobs", "software developer jobs", "IT careers", "301A TECH"],
  authors: [{ name: "301A TECH LTD" }],
  creator: "301A TECH LTD",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://careers.301atech.com",
    siteName: "301A TECH Careers",
    title: "Careers at 301A TECH LTD - Join Our Team",
    description: "Explore exciting career opportunities at 301A TECH LTD.",
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
      <body className="antialiased" suppressHydrationWarning>
        <header className="sticky top-0 z-50 bg-navy text-white shadow-lg">
          <nav className="container-custom">
            <div className="flex items-center justify-between h-16">
              <Link href="/careers" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Image
                  src="/logo.png"
                  alt="301A TECH LTD"
                  width={160}
                  height={40}
                  priority
                  className="h-10"
                  style={{ width: 'auto', height: '40px' }}
                />
                <span className="text-xl font-bold">Careers</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/careers" className="hover:text-techBlue transition-colors">
                  Home
                </Link>
                <Link href="/careers/jobs" className="hover:text-techBlue transition-colors">
                  All Jobs
                </Link>
                <a 
                  href="https://301atech.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-techBlue transition-colors"
                >
                  Company Site
                </a>
              </div>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-navy text-white py-12 mt-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Image
                  src="/logo.png"
                  alt="301A TECH LTD"
                  width={160}
                  height={40}
                  className="h-10 mb-4"
                  style={{ width: 'auto', height: '40px' }}
                />
                <p className="text-gray-300 text-sm">
                  Professional technology solutions that drive business success.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/careers" className="text-gray-300 hover:text-techBlue transition-colors">
                      Careers Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers/jobs" className="text-gray-300 hover:text-techBlue transition-colors">
                      All Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers/privacy" className="text-gray-300 hover:text-techBlue transition-colors">
                      Recruitment Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <p className="text-gray-300 text-sm">
                  Questions about careers?<br />
                  Email: <a href="mailto:recruit@301atech.com" className="text-techBlue hover:text-techBlue-light hover:underline">recruit@301atech.com</a>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} 301A TECH LTD. All rights reserved.</p>
              <p className="mt-2">
                <Link href="/careers/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
                {" | "}
                <span>Equal Opportunity Employer</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
