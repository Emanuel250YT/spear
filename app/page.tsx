import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

//  Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  // Structured data for pricing
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://spear.dev/#pricing",
    name: "Commission Structure",
    description: "Transparent commission structure - From 1% to 5% based on project value for freelancer protection",
    url: "https://spear.dev/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "Freelance Protection Services",
      description: "Protection and support services with variable commission rates",
      offers: [
        {
          "@type": "Offer",
          name: "Basic Protection",
          price: "5",
          priceCurrency: "USD",
          description: "5% commission for projects $10-$100 with full support",
        },
        {
          "@type": "Offer",
          name: "Standard Protection",
          price: "3",
          priceCurrency: "USD",
          description: "3% commission for projects $101-$5000 with dispute resolution",
        },
        {
          "@type": "Offer",
          name: "Premium Protection",
          price: "1",
          priceCurrency: "USD",
          description: "1% commission for projects $15000+ with comprehensive support",
        },
      ],
    },
  }

  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://spear.dev/",
    name: "Spear | Plataforma Blockchain para Freelancers Latinoamericanos",
    description:
      "La primera plataforma descentralizada para freelancers latinoamericanos. Trabaja sin comisiones, con protecci�n blockchain y pagos seguros.",
    url: "https://spear.dev/",
    mainEntity: {
      "@type": "Organization",
      name: "Spear",
      url: "https://spear.dev",
      sameAs: [
        "https://twitter.com/speardev",
        "https://instagram.com/speardev",
        "https://threads.com/speardev",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://spear.dev/#pricing",
        name: "Commission Structure",
        url: "https://spear.dev/#pricing",
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <LogoMarquee />
        <Pricing />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
