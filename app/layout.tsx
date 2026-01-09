import Script from "next/script";

// ... (other imports)

// ... (RootLayout function)
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
