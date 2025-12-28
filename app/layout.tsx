/**
 * Root Layout Component
 * 
 * ไฟล์นี้เป็น Root Layout ของ Next.js App Router
 * ทำหน้าที่:
 * 1. กำหนด Fonts (Geist, Geist Mono, Kanit)
 * 2. กำหนด Metadata และ SEO settings
 * 3. เพิ่ม Structured Data (JSON-LD) สำหรับ SEO
 * 4. กำหนดโครงสร้าง HTML พื้นฐาน (Navbar, Footer, PageTransition)
 * 
 * หมายเหตุ: ไฟล์นี้จะถูกใช้เป็น template สำหรับทุกหน้าในแอปพลิเคชัน
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicTitle from "@/components/DynamicTitle";
import PageTransition from "@/components/PageTransition";

/**
 * Geist Sans Font
 * ใช้สำหรับข้อความทั่วไป (Body text)
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

/**
 * Geist Mono Font
 * ใช้สำหรับ code หรือข้อความที่ต้องการ monospace
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

/**
 * Kanit Font
 * ใช้สำหรับข้อความภาษาไทย (รองรับทั้ง Latin และ Thai)
 * มีหลาย weights: 300, 400, 500, 600, 700
 */
const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: 'swap',
  preload: true,
});

/**
 * Viewport Configuration
 * กำหนดการแสดงผลบนอุปกรณ์ต่างๆ
 * 
 * ตาม Next.js 16 recommendation: แยก viewport ออกมาเป็น export แยก
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e40af",
};

/**
 * Metadata Configuration
 * 
 * กำหนดข้อมูล SEO สำหรับเว็บไซต์:
 * - Title และ Description
 * - Keywords สำหรับ SEO
 * - Open Graph (Facebook, LINE sharing)
 * - Twitter Cards
 * - Robots configuration
 * 
 * หมายเหตุ: metadataBase จำเป็นสำหรับ Open Graph และ Twitter images
 */
export const metadata: Metadata = {
  // ===== METADATA BASE (สำคัญสำหรับ Open Graph/Twitter images) =====
  metadataBase: new URL("https://phanomphrai-c99bd.web.app"),
  
  // ===== BASIC SEO =====
  title: {
    default: "PHANOMPHRAI | รับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้าง ครบวงจร",
    template: "%s | PHANOMPHRAI",
  },
  description: "PHANOMPHRAI บริการรับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ ประสบการณ์กว่า 10 ปี มากกว่า 100+ โครงการสำเร็จ วัสดุคุณภาพสูง ราคายุติธรรม รับประกันผลงาน บริการทั่วประเทศไทย โดยเฉพาะอีสาน ร้อยเอ็ด พนมไพร ปรึกษาฟรี ไม่มีค่าใช้จ่าย!",
  
  // ===== KEYWORDS (สำคัญมากสำหรับ SEO) =====
  keywords: [
    // Keywords หลัก
    "ออกแบบบ้าน",
    "สร้างบ้าน", 
    "รับเหมาก่อสร้าง",
    "รับสร้างบ้าน",
    "บริษัทรับสร้างบ้าน",
    "ก่อสร้างบ้าน",
    "รับออกแบบบ้าน",
    // Keywords ยาว (Long-tail)
    "รับสร้างบ้านราคาถูก",
    "รับสร้างบ้านครบวงจร",
    "บริษัทรับเหมาก่อสร้างบ้าน",
    "ออกแบบบ้านสวย",
    "สร้างบ้านใหม่",
    "ต่อเติมบ้าน",
    "รีโนเวทบ้าน",
    "รับสร้างบ้าน อีสาน",
    "รับสร้างบ้าน ร้อยเอ็ด",
    "รับสร้างบ้าน พนมไพร",
    "ออกแบบบ้านราคาถูก",
    "รับเหมาก่อสร้างราคาถูก",
    "บริษัทรับสร้างบ้าน",
    "ช่างก่อสร้างมืออาชีพ",
    "รับสร้างบ้านคุณภาพ",
    // Keywords ท้องถิ่น
    "รับสร้างบ้าน อีสาน",
    "รับสร้างบ้าน พนมไพร",
    "ช่างก่อสร้าง ร้อยเอ็ด",
    "รับสร้างบ้าน ทุกจังหวัด",
    // Brand
    "PHANOMPHRAI",
    "พนมไพร",
  ],
  
  // ===== AUTHORS & CREATOR =====
  authors: [{ name: "PHANOMPHRAI", url: "https://phanomphrai-c99bd.web.app" }],
  creator: "PHANOMPHRAI",
  publisher: "PHANOMPHRAI",
  
  // ===== ROBOTS =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // ===== OPEN GRAPH (Facebook, LINE) =====
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://phanomphrai-c99bd.web.app",
    siteName: "PHANOMPHRAI",
    title: "PHANOMPHRAI | รับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้าง ครบวงจร",
    description: "บริการรับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ ราคายุติธรรม รับประกันผลงาน",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PHANOMPHRAI - รับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้าง",
      },
    ],
  },
  
  // ===== TWITTER CARDS =====
  twitter: {
    card: "summary_large_image",
    title: "PHANOMPHRAI | รับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้าง",
    description: "PHANOMPHRAI บริการรับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ ประสบการณ์กว่า 10 ปี วัสดุคุณภาพสูง ราคายุติธรรม ปรึกษาฟรี!",
    images: ["/og-image.jpg"],
  },
  
  // ===== VERIFICATION (เพิ่มเมื่อลงทะเบียนกับ Google) =====
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE", // เพิ่มหลังลงทะเบียน Google Search Console
  },
  
  // ===== OTHER =====
  category: "construction",
  applicationName: "PHANOMPHRAI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  
  // ===== ICONS =====
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  
  // ===== MANIFEST =====
  manifest: "/manifest.json",
  
  // ===== ALTERNATE LANGUAGES (ถ้ามีภาษาอื่น) =====
  alternates: {
    canonical: "https://phanomphrai-c99bd.web.app",
  },
};

/**
 * JSON-LD Structured Data
 * 
 * ใช้สำหรับบอก search engines (Google, Bing) เกี่ยวกับธุรกิจ
 * ช่วยให้ search engines เข้าใจข้อมูลธุรกิจได้ดีขึ้น
 * 
 * มี 3 schemas:
 * 1. LocalBusiness - ข้อมูลธุรกิจท้องถิ่น
 * 2. Organization - ข้อมูลองค์กร
 * 3. WebSite - ข้อมูลเว็บไซต์
 */

// JSON-LD Structured Data สำหรับ Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://phanomphrai-c99bd.web.app",
  name: "PHANOMPHRAI",
  alternateName: "พนมไพร รับสร้างบ้าน",
  description: "PHANOMPHRAI บริการรับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ ประสบการณ์กว่า 10 ปี มากกว่า 100+ โครงการสำเร็จ วัสดุคุณภาพสูง ราคายุติธรรม รับประกันผลงาน",
  url: "https://phanomphrai-c99bd.web.app",
  telephone: "+66-92-262-0227",
  image: "https://phanomphrai-c99bd.web.app/og-image.jpg",
  priceRange: "฿฿",
  address: {
    "@type": "PostalAddress",
    streetAddress: "", // ใส่ที่อยู่จริง
    addressLocality: "พนมไพร",
    addressRegion: "ร้อยเอ็ด",
    postalCode: "45140",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 15.8, // ใส่พิกัดจริง
    longitude: 104.1,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    // "https://www.facebook.com/phanomphrai", // ใส่ social media จริง
    // "https://line.me/ti/p/xxxxx",
  ],
  areaServed: {
    "@type": "Country",
    name: "Thailand",
  },
  serviceType: [
    "ออกแบบบ้าน",
    "สร้างบ้าน",
    "รับเหมาก่อสร้าง",
    "ต่อเติมบ้าน",
    "รีโนเวทบ้าน",
    "รับสร้างบ้าน",
    "บริษัทรับสร้างบ้าน",
    "รับเหมาก่อสร้างบ้าน",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "100",
    bestRating: "5",
    worstRating: "1",
  },
};

// Organization Schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PHANOMPHRAI",
  alternateName: "พนมไพร รับสร้างบ้าน",
  url: "https://phanomphrai-c99bd.web.app",
  logo: "https://phanomphrai-c99bd.web.app/icon.svg",
  description: "บริษัทรับออกแบบและก่อสร้างบ้านครบวงจร ประสบการณ์กว่า 10 ปี มากกว่า 100+ โครงการสำเร็จ",
  foundingDate: "2020",
  founders: [
    {
      "@type": "Person",
      name: "PHANOMPHRAI Team",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+66-92-262-0227",
    availableLanguage: ["Thai"],
    areaServed: "TH",
  },
  sameAs: [
    // Add social media links when available
  ],
};

// WebSite Schema for better SEO
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PHANOMPHRAI",
  alternateName: "พนมไพร รับสร้างบ้าน",
  url: "https://phanomphrai-c99bd.web.app",
  description: "บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://phanomphrai-c99bd.web.app/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * RootLayout Component
 * 
 * Component หลักที่ wrap ทุกหน้าในแอปพลิเคชัน
 * 
 * @param children - React Node ที่จะถูก render ในแต่ละหน้า
 * 
 * Structure:
 * - <html> - Root HTML element (lang="th" สำหรับภาษาไทย)
 * - <head> - เพิ่ม JSON-LD structured data และ preconnect links
 * - <body> - ประกอบด้วย Navbar, PageTransition (children), Footer
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* JSON-LD Structured Data - สำหรับ SEO */}
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        
        {/* Preconnect to important origins - เพิ่มความเร็วในการโหลด */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}
      >
        {/* DynamicTitle - จัดการ title ของหน้าเว็บแบบ dynamic */}
        <DynamicTitle />
        
        {/* Navbar - Navigation bar ที่ด้านบน */}
        <Navbar />
        
        {/* PageTransition - เพิ่ม transition effect เมื่อเปลี่ยนหน้า */}
        <PageTransition>
          {children}
        </PageTransition>
        
        {/* Footer - Footer ที่ด้านล่าง */}
        <Footer />
      </body>
    </html>
  );
}
