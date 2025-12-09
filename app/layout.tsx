import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicTitle from "@/components/DynamicTitle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Not critical, can load later
});

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: 'swap', // Optimize font loading
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  // Default metadata สำหรับหน้าแรก
  return {
    title: "PHANOMPHRAI - สร้างบ้านในฝันของคุณ",
    description: "บริการก่อสร้างคุณภาพสูง ด้วยทีมงานมืออาชีพและวัสดุคุณภาพ",
    keywords: ["ก่อสร้าง", "สร้างบ้าน", "รับเหมาก่อสร้าง", "ออกแบบบ้าน", "PHANOMPHRAI"],
    authors: [{ name: "PHANOMPHRAI" }],
    openGraph: {
      title: "PHANOMPHRAI - สร้างบ้านในฝันของคุณ",
      description: "บริการก่อสร้างคุณภาพสูง ด้วยทีมงานมืออาชีพและวัสดุคุณภาพ",
      type: "website",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}
      >
        <DynamicTitle />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
