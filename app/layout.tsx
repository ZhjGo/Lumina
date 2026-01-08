import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUMINA | 灵感起始页 - 沉浸式创意导航",
  description: "LUMINA 是一个为创意工作者打造的极简、沉浸式导航起始页。汇聚全球顶级设计灵感、开发工具与AI资源，提供丝滑的交互体验与每日灵感一言，让每一次新标签页的打开都成为享受。",
  keywords: ["导航", "起始页", "设计师导航", "极简主页", "创意工具", "沉浸式体验", "LUMINA", "Next.js"],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "LUMINA | 灵感起始页",
    description: "重塑你的浏览器起始体验，沉浸、高效、灵动。",
    type: "website",
    locale: "zh_CN",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E6E6FA",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ClayNav 导航",
  "url": "https://claynav.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://claynav.com?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={cn(
          quicksand.variable,
          "antialiased min-h-screen font-sans bg-black text-white"
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}
