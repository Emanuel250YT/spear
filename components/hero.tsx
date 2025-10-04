import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Code2, Palette, Smartphone, TrendingUp, BarChart3, Lock } from "lucide-react"

export function Hero() {
  const buttonNew = (
    <Button asChild className="rounded-full bg-blue-200 px-6 text-black hover:bg-blue-300 transition-all duration-300">
      <Link href="/admin/login">
        Conectar Wallet
      </Link>
    </Button>
  )

  const categoryData = [
    {
      title: "Desarrollo Web",
      sub: "Sitios web y aplicaciones modernas",
      href: "/proyectos?categoria=desarrollo-web",
      gradient: "from-[#0f172a] via-[#1e293b] to-[#334155]",
      icon: Code2,
      video: "/videos/web-dev.mp4"
    },
    {
      title: "Diseño UI/UX",
      sub: "Interfaces y experiencias únicas",
      href: "/proyectos?categoria=diseno",
      gradient: "from-[#1e1b4b] via-[#3730a3] to-[#4338ca]",
      icon: Palette,
      video: "/videos/design.mp4"
    },
    {
      title: "Desarrollo Mobile",
      sub: "Apps iOS y Android nativas",
      href: "/proyectos?categoria=mobile",
      gradient: "from-[#14532d] via-[#16a34a] to-[#22c55e]",
      icon: Smartphone,
      video: "/videos/mobile.mp4"
    },
    {
      title: "Marketing Digital",
      sub: "Growth y estrategias digitales",
      href: "/proyectos?categoria=marketing",
      gradient: "from-[#7c2d12] via-[#ea580c] to-[#fb923c]",
      icon: TrendingUp,
      video: "/videos/marketing.mp4"
    },
    {
      title: "Análisis de Datos",
      sub: "Business Intelligence y ML",
      href: "/proyectos?categoria=datos",
      gradient: "from-[#581c87] via-[#a21caf] to-[#c084fc]",
      icon: BarChart3,
      video: "/videos/data.mp4"
    },
    {
      title: "Blockchain",
      sub: "Smart contracts y DApps",
      href: "/proyectos?categoria=blockchain",
      gradient: "from-[#0c4a6e] via-[#0284c7] to-[#38bdf8]",
      icon: Lock,
      video: "/videos/blockchain.mp4"
    }
  ]

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div className="mb-5 flex items-center gap-2 animate-fade-in">
            <Image src="/icons/spear-white.svg" alt="Spear logo" width={32} height={32} className="h-8 w-8" />
            <p className="text-sm uppercase tracking-[0.25em] text-blue-200/80">spear</p>
          </div>
          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up">
            <span className="block">EL FUTURO DEL</span>
            <span className="block text-blue-200 drop-shadow-[0_0_20px_rgba(191,219,254,0.35)] animate-fade-in-up animate-delay-200">FREELANCE</span>
            <span className="block animate-fade-in-up animate-delay-300">ESTÁ AQUÍ</span>
          </h1>
          <p className="mt-6 text-center text-lg text-gray-300 max-w-3xl animate-fade-in-up animate-delay-400">
            🚀 Conecta con talento excepcional de LATAM. Transparencia total con blockchain,
            pagos seguros instantáneos y comisiones revolucionarias desde 0.5%.
            <span className="text-blue-200 font-semibold">¡La confianza nunca fue tan fácil!</span>
          </p>
          <div className="mt-6 animate-fade-in-up animate-delay-500">{buttonNew}</div>

          {/* Categories grid */}
          <div className="mt-10 grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 animate-fade-in-up animate-delay-500">
            {categoryData.map((c, i) => {
              const visibility = i <= 2 ? "block" : i === 3 ? "hidden md:block" : i === 4 ? "hidden xl:block" : "hidden"
              const delays = ["animate-delay-600", "animate-delay-700", "animate-delay-800", "animate-delay-900", "animate-delay-1000", "animate-delay-1100"]
              const delay = delays[i] || "animate-delay-600"

              return (
                <div key={i} className={`${visibility} animate-fade-in-up ${delay}`}>
                  <CategoryCard
                    title={c.title}
                    sub={c.sub}
                    gradient={c.gradient}
                    icon={c.icon}
                    href={c.href}
                    video={c.video}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({
  title = "Desarrollo Web",
  sub = "Sitios web y aplicaciones modernas",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  icon: IconComponent = Code2,
  href = "/proyectos",
  video = "/videos/placeholder.mp4"
}: {
  title?: string
  sub?: string
  gradient?: string
  icon?: any
  href?: string
  video?: string
}) {
  return (
    <Link href={href} className="group">
      <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/20 hover-lift">
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={video} type="video/mp4" />
          </video>

          <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />

          <div className="relative z-10 p-3 h-full flex flex-col justify-between">
            <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20 group-hover:bg-blue-200/40 transition-colors duration-300" />

            <div className="text-center">
              <div className="flex justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-blue-200 drop-shadow-lg" />
              </div>
              <div className="text-2xl font-bold leading-snug text-white/90 mb-2 group-hover:text-white transition-colors duration-300">{title}</div>
              <p className="text-xs text-white/70 mb-4 group-hover:text-white/90 transition-colors duration-300">{sub}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blue-200 group-hover:bg-blue-200/20 group-hover:text-blue-100 transition-all duration-300 transform group-hover:scale-105">
                spear freelance
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}