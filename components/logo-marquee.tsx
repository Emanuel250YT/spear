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
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Los mejores <span className="text-blue-200">developers</span> están en Spear
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Talento blockchain excepcional verificado y listo para llevar tu proyecto
          al siguiente nivel con las mejores calificaciones y experiencia comprobada.
        </p>
      </div>

      {/* Primera fila de developers */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <div
            className={`flex animate-scroll-left ${pausedRow === 'first' ? 'animation-play-state-paused' : ''}`}
            style={{ width: 'calc(200% + 2rem)' }}
          >
            <div className="flex min-w-full">
              {[...topDevelopers, ...topDevelopers].map((developer, index) => (
                <DeveloperCard key={`first-${index}`} developer={developer} rowId="first" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila de developers (reverso) */}
      <div className="relative mt-8">
        <div className="flex overflow-hidden">
          <div
            className={`flex animate-scroll-right ${pausedRow === 'second' ? 'animation-play-state-paused' : ''}`}
            style={{ width: 'calc(200% + 2rem)' }}
          >
            <div className="flex min-w-full">
              {[...topDevelopers.slice().reverse(), ...topDevelopers.slice().reverse()].map((developer, index) => (
                <DeveloperCard key={`second-${index}`} developer={developer} rowId="second" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-8 lg:p-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-200" />
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              ¿Listo para encontrar tu developer perfecto?
            </h3>
          </div>
          <p className="text-gray-300 mb-8 text-lg">
            Conecta con developers verificados, ve sus proyectos anteriores y contrata con confianza total.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-200 hover:bg-blue-300 text-black font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
              asChild
            >
              <Link href="/freelancers">Explorar Developers</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-200/50 text-blue-200 hover:bg-blue-200/10 hover:border-blue-200 px-8 py-3 rounded-xl transition-all"
              asChild
            >
              <Link href="/proyectos">Publicar Proyecto</Link>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        
        .animation-play-state-paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
