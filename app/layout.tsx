import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
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
  keywords: ["导航", "起始页", "设计师导航", "极简主页", "创意工具", "沉浸式体验", "LUMINA", "Next.js", "网盘资源", "AI工具", "影视搜索", "夸克网盘"],
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
  themeColor: "#000000",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LUMINA | 灵感起始页",
  "url": "https://lumina.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lumina.app?q={search_term_string}",
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MCN2V8MXLH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MCN2V8MXLH');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://image.jkai.de" />
        <link rel="dns-prefetch" href="https://image.jkai.de" />
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}
