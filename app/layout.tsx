import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicTitle from "@/components/DynamicTitle";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: 'swap',
  preload: true,
});

// แยก viewport ออกมาตาม Next.js 16 recommendation
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e40af",
};

export const metadata: Metadata = {
  // ===== BASIC SEO =====
  title: {
    default: "PHANOMPHRAI | รับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้าง ครบวงจร",
    template: "%s | PHANOMPHRAI",
  },
  description: "บริการรับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ ราคายุติธรรม รับประกันผลงาน บริการทั่วประเทศไทย ปรึกษาฟรี!",
  
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
    // Keywords ท้องถิ่น
    "รับสร้างบ้าน อีสาน",
    "รับสร้างบ้าน พนมไพร",
    "ช่างก่อสร้าง ร้อยเอ็ด",
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
    description: "บริการรับออกแบบบ้าน สร้างบ้านครบวงจร ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ ปรึกษาฟรี!",
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
    icon: "/favicon.ico",
    apple: "/apple-icon.svg",
  },
  
  // ===== MANIFEST =====
  manifest: "/manifest.json",
  
  // ===== ALTERNATE LANGUAGES (ถ้ามีภาษาอื่น) =====
  alternates: {
    canonical: "https://phanomphrai-c99bd.web.app",
  },
};

// JSON-LD Structured Data สำหรับ Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://phanomphrai-c99bd.web.app",
  name: "PHANOMPHRAI",
  alternateName: "พนมไพร รับสร้างบ้าน",
  description: "บริการรับออกแบบบ้าน สร้างบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ ราคายุติธรรม",
  url: "https://phanomphrai-c99bd.web.app",
  telephone: "+66-XX-XXX-XXXX", // ใส่เบอร์โทรจริง
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
  ],
};

// Organization Schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PHANOMPHRAI",
  url: "https://phanomphrai-c99bd.web.app",
  logo: "https://phanomphrai-c99bd.web.app/icon.svg",
  description: "บริษัทรับออกแบบและก่อสร้างบ้านครบวงจร",
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
    telephone: "+66-XX-XXX-XXXX",
    availableLanguage: ["Thai"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}
      >
        <DynamicTitle />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
