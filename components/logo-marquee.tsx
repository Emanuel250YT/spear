"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)

  // Empresas que confían en Spear
  const companyLogos = [
    { name: "Microsoft", content: "⊞", color: "text-blue-400" },
    { name: "Google", content: "G", color: "text-white", bg: "bg-blue-500" },
    { name: "Meta", content: "M", color: "text-white", bg: "bg-blue-600" },
    { name: "Amazon", content: "A", color: "text-orange-400" },
    { name: "Apple", content: "🍎", color: "text-gray-300" },
    { name: "Netflix", content: "N", color: "text-white", bg: "bg-red-600" },
    { name: "Spotify", content: "♪", color: "text-green-400" },
    { name: "Adobe", content: "Ai", color: "text-white", bg: "bg-red-500" },
  ]

  const startupLogos = [
    { name: "Stripe", content: "S", color: "text-white", bg: "bg-purple-600" },
    { name: "Airbnb", content: "🏠", color: "text-pink-400" },
    { name: "Uber", content: "U", color: "text-white", bg: "bg-black" },
    { name: "Slack", content: "#", color: "text-white", bg: "bg-purple-500" },
    { name: "Discord", content: "D", color: "text-white", bg: "bg-indigo-600" },
    { name: "Shopify", content: "🛍️", color: "text-green-400" },
    { name: "Twilio", content: "T", color: "text-white", bg: "bg-red-500" },
    { name: "Figma", content: "F", color: "text-white", bg: "bg-purple-500" },
  ]

  const LogoCard = ({ logo, rowId }: { logo: any; rowId: string }) => (
    <div
      className="flex-shrink-0 mx-3"
      onMouseEnter={() => setPausedRow(rowId)}
      onMouseLeave={() => setPausedRow(null)}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center hover:border-blue-200/30 transition-all">
        {logo.bg ? (
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${logo.bg} flex items-center justify-center`}>
            <span className={`text-sm sm:text-lg font-bold ${logo.color}`}>{logo.content}</span>
          </div>
        ) : (
          <span className={`text-lg sm:text-xl lg:text-2xl font-semibold ${logo.color}`}>{logo.content}</span>
        )}
      </div>
    </div>
  )

  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-between mb-12 sm:flex-row sm:items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left">
            <span className="text-blue-200">Empresas líderes</span>
            <br />
            confían en nosotros
          </h2>
          <Button 
            variant="outline" 
            className="mt-4 sm:mt-0 liquid-glass hover:liquid-glass-enhanced bg-transparent border-blue-200/30 hover:border-blue-200"
            asChild
          >
            <Link href="/empresas">Ver Casos de Éxito</Link>
          </Button>
        </div>

        {/* Sub-header */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Desde startups innovadoras hasta corporaciones Fortune 500, las mejores empresas 
            encuentran talento excepcional en nuestra plataforma blockchain.
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="relative">
          {/* First Row - Big Tech - Scrolling Right */}
          <div className="flex overflow-hidden mb-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-right whitespace-nowrap ${pausedRow === "first" ? "animation-play-state-paused" : ""}`}
              style={{
                animationPlayState: pausedRow === "first" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {/* Triple the logos for seamless loop */}
              {[...companyLogos, ...companyLogos, ...companyLogos].map((logo, index) => (
                <LogoCard key={`first-${index}`} logo={logo} rowId="first" />
              ))}
            </div>
          </div>

          {/* Second Row - Startups & Scale-ups - Scrolling Left */}
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-left whitespace-nowrap ${pausedRow === "second" ? "animation-play-state-paused" : ""}`}
              style={{
                animationPlayState: pausedRow === "second" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {/* Triple the logos for seamless loop */}
              {[...startupLogos, ...startupLogos, ...startupLogos].map((logo, index) => (
                <LogoCard key={`second-${index}`} logo={logo} rowId="second" />
              ))}
            </div>
          </div>
        </div>

        {/* Top Freelancers Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trabajamos con los mejores</h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Nuestra comunidad está formada por freelancers top-tier verificados, 
              con experiencia comprobada y ratings excepcionales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-2xl font-bold text-blue-200 mb-1">4.9/5</div>
              <div className="text-sm text-gray-400">Rating Promedio</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-2xl font-bold text-blue-200 mb-1">95%</div>
              <div className="text-sm text-gray-400">Proyectos Exitosos</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                <span className="text-2xl">💎</span>
              </div>
              <div className="text-2xl font-bold text-blue-200 mb-1">500+</div>
              <div className="text-sm text-gray-400">Freelancers Verificados</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-2xl font-bold text-blue-200 mb-1">24h</div>
              <div className="text-sm text-gray-400">Tiempo Respuesta</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-200 mb-2">2M+</div>
            <div className="text-sm text-gray-400">Proyectos Completados</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-200 mb-2">150+</div>
            <div className="text-sm text-gray-400">Países Activos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-200 mb-2">$250M+</div>
            <div className="text-sm text-gray-400">Procesados en Blockchain</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-200 mb-2">99.9%</div>
            <div className="text-sm text-gray-400">Tiempo de Actividad</div>
          </div>
        </div>
      </div>
    </section>
  )
}