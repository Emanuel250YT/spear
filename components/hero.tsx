import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const buttonNew = (
    <Button asChild className="rounded-full bg-blue-200 px-6 text-black hover:bg-blue-300">
      <a href="/admin/login">
        Conectar Wallet
      </a>
    </Button>
  )

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div className="mb-5 flex items-center gap-2">
            <Image src="/icons/spear-white.svg" alt="Spear logo" width={32} height={32} className="h-8 w-8" />
            <p className="text-sm uppercase tracking-[0.25em] text-blue-200/80">spear</p>
          </div>
          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">FREELANCE</span>
            <span className="block text-blue-200 drop-shadow-[0_0_20px_rgba(191,219,254,0.35)]">BLOCKCHAIN</span>
            <span className="block">LATINOAMÉRICA</span>
          </h1>
          <p className="mt-6 text-center text-lg text-gray-300 max-w-2xl">
            La primera plataforma descentralizada para freelancers latinoamericanos.
            Trabaja sin comisiones, con protección blockchain y pagos seguros.
          </p>
          <div className="mt-6">{buttonNew}</div>

          {/* Categories grid */}
          <div className="mt-10 grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {categoryData.map((c, i) => {
              const visibility = i <= 2 ? "block" : i === 3 ? "hidden md:block" : i === 4 ? "hidden xl:block" : "hidden"

              return (
                <div key={i} className={visibility}>
                  <CategoryCard title={c.title} sub={c.sub} tone={c.tone} gradient={c.gradient} icon={c.icon} />
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
  tone = "development",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  icon = "💻",
}: {
  title?: string
  sub?: string
  tone?: string
  gradient?: string
  icon?: string
}) {
  return (
    <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        <div className={`absolute inset-0 bg-gradient-to-b ${gradient}`} />

        <div className="relative z-10 p-3 h-full flex flex-col justify-between">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />

          <div className="text-center">
            <div className="text-4xl mb-3">{icon}</div>
            <div className="text-2xl font-bold leading-snug text-white/90 mb-2">{title}</div>
            <p className="text-xs text-white/70 mb-4">{sub}</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blue-200">
              spear freelance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const categoryData = [
  {
    title: "Desarrollo Web",
    sub: "Sitios web y aplicaciones modernas",
    tone: "development",
    gradient: "from-[#0b0b0b] via-[#0f172a] to-[#020617]",
    icon: "💻",
  },
  {
    title: "Diseño UX/UI",
    sub: "Interfaces hermosas y funcionales",
    tone: "design",
    gradient: "from-[#0b1a0b] via-[#052e16] to-[#022c22]",
    icon: "🎨",
  },
  {
    title: "Backend",
    sub: "APIs y arquitectura de servidores",
    tone: "backend",
    gradient: "from-[#001028] via-[#0b355e] to-[#052e5e]",
    icon: "⚙️",
  },
  {
    title: "Blockchain",
    sub: "Smart contracts y DApps",
    tone: "blockchain",
    gradient: "from-[#0b0b0b] via-[#1f2937] to-[#0b1220]",
    icon: "⛓️",
  },
  {
    title: "Marketing",
    sub: "Estrategias digitales efectivas",
    tone: "marketing",
    gradient: "from-[#0b0b0b] via-[#111827] to-[#052e16]",
    icon: "📊",
  },
]