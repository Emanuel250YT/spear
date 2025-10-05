import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Plasma from "@/components/plasma"
import { Web3Provider } from "@/contexts/Web3Context"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Spear | Plataforma Blockchain para Freelancers Latinoamericanos",
  description:
    "La primera plataforma descentralizada para freelancers latinoamericanos. Trabaja sin comisiones, con protección blockchain y pagos seguros. Desde desarrollo web hasta marketing digital.",
  generator: "Spear Platform",
  keywords: "freelancers, blockchain, latinoamerica, desarrollo web, diseño, programacion, smart contracts, descentralizado",
  authors: [{ name: "Spear Team" }],
  openGraph: {
    title: "Spear | Freelance Blockchain Latinoamérica",
    description: "Plataforma descentralizada para freelancers latinos. Sin comisiones por defecto, protección blockchain.",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["pt_BR", "en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spear | Freelance Blockchain",
    description: "Freelancers latinoamericanos en blockchain. Sin comisiones, con protección descentralizada.",
    creator: "@speardev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        {/* Font Preload */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Dynamic Favicon Script */}
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/icons/spear-white.svg' : '/icons/spear-white.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            // Listen for changes in theme
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        {/* Google Tag Manager (deferred) */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NFLHXXGK');`}
        </Script>

        {/* Google Analytics (deferred) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-W6LV22900R" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6LV22900R');
          `}
        </Script>
      </head>
      <body>
        <div className="fixed inset-0 z-0 bg-black">
          <Plasma
            color="#8b5cf6"
            speed={0.8}
            direction="forward"
            scale={1.5}
            opacity={0.4}
            mouseInteractive={true}
          />
        </div>
        <Web3Provider>
          <div className="relative z-10">{children}</div>
        </Web3Provider>
      </body>
    </html>
  )
}
