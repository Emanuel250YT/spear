import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Shield, Users, Zap, Globe, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SmartLoginButton } from "@/components/ui/smart-login-button"
import Link from "next/link"

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spear",
    url: "https://spear.com",
    logo: "https://spear.com/logo.png",
    description:
      "Spear es la plataforma blockchain descentralizada que conecta clientes con los mejores freelancers tecnológicos del mundo de forma segura y transparente.",
    sameAs: [
      "https://www.instagram.com/spear",
      "https://www.linkedin.com/company/spear",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Global",
      addressRegion: "Blockchain",
      addressCountry: "Decentralized",
    },
    areaServed: [
      { "@type": "Place", name: "Global" },
      { "@type": "Place", name: "Americas" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Asia" },
    ],
  }

  const stats = [
    { number: "50K+", label: "Freelancers Verificados", icon: Users },
    { number: "250M+", label: "Procesado en Blockchain", icon: TrendingUp },
    { number: "99.9%", label: "Tiempo de Actividad", icon: Zap },
    { number: "180+", label: "Países Activos", icon: Globe },
  ]

  const values = [
    {
      icon: Shield,
      title: "Seguridad Primero",
      description: "Contratos inteligentes y tecnología blockchain garantizan que todos los pagos y acuerdos sean seguros y transparentes."
    },
    {
      icon: Users,
      title: "Comunidad Global",
      description: "Conectamos talento excepcional de todo el mundo con proyectos que impulsan la innovación tecnológica."
    },
    {
      icon: Award,
      title: "Calidad Verificada",
      description: "Todos nuestros freelancers pasan por un riguroso proceso de verificación para garantizar la más alta calidad."
    },
    {
      icon: Zap,
      title: "Innovación Constante",
      description: "Utilizamos la tecnología más avanzada para crear la mejor experiencia de trabajo freelance del mundo."
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <SiteHeader />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                Revolucionando el <span className="text-blue-200">trabajo freelance</span><br />
                con blockchain
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Spear es la primera plataforma descentralizada que conecta clientes con
                freelancers de élite utilizando la seguridad y transparencia de la tecnología blockchain.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-200/10 border border-blue-200/20 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-blue-200 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-8 lg:p-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Nuestra Misión
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Democratizar el acceso al talento tecnológico global, eliminando intermediarios
                  innecesarios y creando un ecosistema de trabajo justo, transparente y eficiente
                  que beneficie tanto a freelancers como a clientes.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    El Futuro del Trabajo es Descentralizado
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    En Spear, creemos que la tecnología blockchain puede transformar
                    fundamentalmente cómo trabajamos. Eliminamos la necesidad de confiar
                    en terceros, reducimos costos y tiempos de transacción, y creamos
                    un ambiente donde la calidad y la innovación son recompensadas de forma justa.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Nuestra plataforma no es solo un marketplace - es un ecosistema completo
                    que incluye herramientas de colaboración, sistemas de reputación basados
                    en blockchain, y contratos inteligentes que protegen tanto a freelancers
                    como a clientes.
                  </p>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-600/20 border border-blue-200/30 rounded-2xl p-6 backdrop-blur-sm">
                      <Shield className="w-8 h-8 text-blue-200 mb-4" />
                      <h4 className="text-white font-semibold mb-2">100% Seguro</h4>
                      <p className="text-gray-400 text-sm">Contratos inteligentes garantizan pagos</p>
                    </div>
                    <div className="bg-purple-600/20 border border-purple-200/30 rounded-2xl p-6 backdrop-blur-sm mt-8">
                      <Zap className="w-8 h-8 text-purple-200 mb-4" />
                      <h4 className="text-white font-semibold mb-2">Ultra Rápido</h4>
                      <p className="text-gray-400 text-sm">Transacciones instantáneas</p>
                    </div>
                    <div className="bg-green-600/20 border border-green-200/30 rounded-2xl p-6 backdrop-blur-sm">
                      <Users className="w-8 h-8 text-green-200 mb-4" />
                      <h4 className="text-white font-semibold mb-2">Global</h4>
                      <p className="text-gray-400 text-sm">Talento de todo el mundo</p>
                    </div>
                    <div className="bg-orange-600/20 border border-orange-200/30 rounded-2xl p-6 backdrop-blur-sm mt-8">
                      <Award className="w-8 h-8 text-orange-200 mb-4" />
                      <h4 className="text-white font-semibold mb-2">Verificado</h4>
                      <p className="text-gray-400 text-sm">Talento de élite únicamente</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Nuestros Valores
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Los principios que guían cada decisión que tomamos en Spear
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8 hover:border-blue-200/30 transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-200/10 border border-blue-200/20 flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-blue-200" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-200/20 rounded-3xl backdrop-blur-xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                ¿Listo para formar parte del futuro?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Únete a la revolución del trabajo descentralizado. Conecta con oportunidades globales
                o encuentra el talento perfecto para tu proyecto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SmartLoginButton
                  className="bg-blue-200 hover:bg-blue-300 text-black font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105 text-lg"
                >
                  Empezar Ahora
                </SmartLoginButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-200/50 text-blue-200 hover:bg-blue-200/10 hover:border-blue-200 px-8 py-3 rounded-xl transition-all"
                  asChild
                >
                  <Link href="/faq">Conoce Más</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </div>
  )
}
