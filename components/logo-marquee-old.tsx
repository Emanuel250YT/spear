"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Shield, TrendingUp } from "lucide-react"

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)

  // Top developers en Spear
  const topDevelopers = [
    { 
      name: "Carlos Mendoza", 
      specialty: "Full Stack & Blockchain",
      rating: 4.9,
      projects: 89,
      location: "México",
      avatar: "/placeholder-user.jpg",
      verified: true
    },
    { 
      name: "Ana García", 
      specialty: "UI/UX Designer",
      rating: 4.8,
      projects: 156,
      location: "Argentina",
      avatar: "/placeholder-user.jpg",
      verified: true
    },
    { 
      name: "Miguel Rodriguez", 
      specialty: "Mobile Developer",
      rating: 4.7,
      projects: 45,
      location: "Colombia",
      avatar: "/placeholder-user.jpg",
      verified: true
    },
    { 
      name: "Isabella Santos", 
      specialty: "Digital Marketing",
      rating: 4.9,
      projects: 78,
      location: "Brasil",
      avatar: "/placeholder-user.jpg",
      verified: true
    },
    { 
      name: "Juan Pablo Morales", 
      specialty: "Data Scientist",
      rating: 4.8,
      projects: 32,
      location: "Perú",
      avatar: "/placeholder-user.jpg",
      verified: true
    },
    { 
      name: "Sofía Herrera", 
      specialty: "Backend Developer",
      rating: 4.6,
      projects: 67,
      location: "Chile",
      avatar: "/placeholder-user.jpg",
      verified: false
    },
  ]

  const DeveloperCard = ({ developer, rowId }: { developer: any; rowId: string }) => (
    <div
      className="flex-shrink-0 mx-3"
      onMouseEnter={() => setPausedRow(rowId)}
      onMouseLeave={() => setPausedRow(null)}
    >
      <div className="w-72 h-40 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 hover:border-blue-200/30 transition-all hover:scale-105 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Image
              src={developer.avatar}
              alt={developer.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            {developer.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-black" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">{developer.name}</h3>
            <p className="text-blue-200 text-xs mb-1">{developer.specialty}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <MapPin className="w-3 h-3" />
              <span>{developer.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-white">{developer.rating}</span>
              </div>
              <div className="text-xs text-gray-400">
                {developer.projects} proyectos
              </div>
            </div>
          </div>
        </div>
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
