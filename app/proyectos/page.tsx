import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  TrendingUp,
  Shield,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "DApp de NFT Marketplace",
      description: "Necesitamos desarrollar una plataforma completa de marketplace de NFTs con smart contracts en Solidity, frontend en React y integración con MetaMask.",
      client: {
        name: "CryptoStart",
        avatar: "/placeholder-logo.svg",
        rating: 4.8,
        location: "México",
        verified: true
      },
      budget: "$8,000 - $12,000",
      duration: "2-3 meses",
      skillsRequired: ["React", "Solidity", "Web3", "Node.js"],
      proposalsCount: 12,
      postedAt: "Hace 2 horas",
      urgency: "high",
      category: "Blockchain"
    },
    {
      id: 2,
      title: "Rediseño UI/UX de App Mobile",
      description: "Buscamos diseñador UI/UX para rediseñar completamente nuestra aplicación móvil de fintech. Se requiere experiencia en aplicaciones financieras.",
      client: {
        name: "FinanceApp",
        avatar: "/placeholder-logo.svg",
        rating: 4.9,
        location: "Colombia",
        verified: true
      },
      budget: "$3,500 - $5,000",
      duration: "1-2 meses",
      skillsRequired: ["UI/UX", "Figma", "Mobile Design", "Fintech"],
      proposalsCount: 8,
      postedAt: "Hace 5 horas",
      urgency: "medium",
      category: "Diseño"
    },
    {
      id: 3,
      title: "Desarrollo de E-commerce con Blockchain",
      description: "Plataforma de e-commerce que integre pagos en criptomonedas y sistema de recompensas con tokens. Backend en Node.js y frontend en Next.js.",
      client: {
        name: "TechCommerce",
        avatar: "/placeholder-logo.svg",
        rating: 4.7,
        location: "Argentina",
        verified: false
      },
      budget: "$15,000 - $20,000",
      duration: "3-4 meses",
      skillsRequired: ["Next.js", "Node.js", "Blockchain", "PostgreSQL"],
      proposalsCount: 25,
      postedAt: "Hace 1 día",
      urgency: "low",
      category: "Desarrollo Web"
    },
    {
      id: 4,
      title: "Aplicación Mobile con React Native",
      description: "App de delivery con geolocalización, pagos integrados y panel de administración. Se necesita desarrollador con experiencia en apps de delivery.",
      client: {
        name: "DeliveryPro",
        avatar: "/placeholder-logo.svg",
        rating: 4.6,
        location: "Chile",
        verified: true
      },
      budget: "$6,000 - $9,000",
      duration: "2-3 meses",
      skillsRequired: ["React Native", "Maps API", "Payment Integration"],
      proposalsCount: 18,
      postedAt: "Hace 2 días",
      urgency: "medium",
      category: "Desarrollo Mobile"
    },
    {
      id: 5,
      title: "Estrategia de Marketing Digital",
      description: "Campaña completa de marketing digital para startup fintech. SEO, SEM, redes sociales y growth hacking para aumentar la base de usuarios.",
      client: {
        name: "StartupFintech",
        avatar: "/placeholder-logo.svg",
        rating: 4.5,
        location: "Perú",
        verified: true
      },
      budget: "$2,000 - $4,000",
      duration: "1-2 meses",
      skillsRequired: ["SEO", "SEM", "Social Media", "Growth Hacking"],
      proposalsCount: 15,
      postedAt: "Hace 3 días",
      urgency: "high",
      category: "Marketing"
    },
    {
      id: 6,
      title: "Análisis de Datos y Machine Learning",
      description: "Desarrollo de modelos predictivos para análisis de riesgo crediticio. Experiencia en Python, scikit-learn y análisis de datos financieros.",
      client: {
        name: "DataCorp",
        avatar: "/placeholder-logo.svg",
        rating: 4.8,
        location: "Brasil",
        verified: true
      },
      budget: "$4,000 - $7,000",
      duration: "1-2 meses",
      skillsRequired: ["Python", "Machine Learning", "Data Analysis", "SQL"],
      proposalsCount: 9,
      postedAt: "Hace 1 semana",
      urgency: "low",
      category: "Datos"
    }
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-600"
      case "medium": return "bg-orange-600"
      case "low": return "bg-green-600"
      default: return "bg-gray-600"
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case "high": return "Urgente"
      case "medium": return "Moderado"
      case "low": return "Flexible"
      default: return "Normal"
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Encuentra tu próximo <span className="text-blue-200">proyecto</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Descubre oportunidades laborales de las mejores empresas de América Latina
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-200">2,847</div>
                <div className="text-sm text-gray-400">Proyectos Activos</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">$2.5M</div>
                <div className="text-sm text-gray-400">Valor Total</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">156</div>
                <div className="text-sm text-gray-400">Nuevos Hoy</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">4.8★</div>
                <div className="text-sm text-gray-400">Rating Promedio</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar proyectos..."
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="web">Desarrollo Web</SelectItem>
                      <SelectItem value="mobile">Desarrollo Mobile</SelectItem>
                      <SelectItem value="design">Diseño</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="data">Datos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Presupuesto</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Cualquier presupuesto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier presupuesto</SelectItem>
                      <SelectItem value="low">$500 - $2,000</SelectItem>
                      <SelectItem value="medium">$2,000 - $5,000</SelectItem>
                      <SelectItem value="high">$5,000 - $10,000</SelectItem>
                      <SelectItem value="premium">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duración</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Cualquier duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier duración</SelectItem>
                      <SelectItem value="short">Menos de 1 mes</SelectItem>
                      <SelectItem value="medium">1-3 meses</SelectItem>
                      <SelectItem value="long">3+ meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Filter className="w-4 h-4" />
                  Mostrando {projects.length} de 2,847 proyectos
                </div>
                <Button variant="outline" className="border-blue-200/30">
                  Filtros Avanzados
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2 hover:text-blue-200 transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <Badge className={`${getUrgencyColor(project.urgency)} text-white`}>
                              {getUrgencyText(project.urgency)}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-200/20 text-blue-200">
                              {project.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {project.postedAt}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-400 mb-1">
                            {project.budget}
                          </div>
                          <div className="text-sm text-gray-400">
                            {project.duration}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skillsRequired.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-blue-200/30 text-blue-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={project.client.avatar} />
                              <AvatarFallback>{project.client.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{project.client.name}</span>
                                {project.client.verified && (
                                  <Shield className="w-4 h-4 text-blue-200" />
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  {project.client.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {project.client.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-400">
                            <Users className="w-4 h-4 inline mr-1" />
                            {project.proposalsCount} propuestas
                          </div>
                          <Link href="/test">
                            <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                              Ver Proyecto
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-blue-200/30">
              Cargar Más Proyectos
            </Button>
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  ¿No encuentras lo que buscas?
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Configura alertas personalizadas y recibe notificaciones cuando se publiquen
                  proyectos que coincidan con tus habilidades y preferencias.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                    Crear Alerta de Proyecto
                  </Button>
                  <Button variant="outline" className="border-blue-200/30">
                    Ver Todas las Categorías
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}
