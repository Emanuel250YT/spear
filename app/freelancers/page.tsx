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
  Star,
  MapPin,
  DollarSign,
  Shield,
  Trophy,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronRight,
  Heart,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

export default function FreelancersPage() {
  const freelancers = [
    {
      id: 1,
      name: "Carlos Mendoza",
      title: "Full Stack Developer & Blockchain Expert",
      avatar: "/placeholder-user.jpg",
      location: "México City, México",
      hourlyRate: 45,
      rating: 4.9,
      reviewsCount: 127,
      projectsCompleted: 89,
      responseTime: "1 hora",
      successRate: 98,
      verified: true,
      topRated: true,
      available: true,
      description: "Desarrollador con 8+ años de experiencia en React, Node.js y tecnologías blockchain. Especializado en DApps y smart contracts.",
      skills: ["React", "Node.js", "Solidity", "Web3", "TypeScript"],
      languages: ["Español (Nativo)", "Inglés (Avanzado)"],
      recentWork: "DApp de Trading NFT para CryptoStart"
    },
    {
      id: 2,
      name: "Ana García",
      title: "Senior UI/UX Designer",
      avatar: "/placeholder-user.jpg",
      location: "Buenos Aires, Argentina",
      hourlyRate: 38,
      rating: 4.8,
      reviewsCount: 94,
      projectsCompleted: 156,
      responseTime: "2 horas",
      successRate: 96,
      verified: true,
      topRated: true,
      available: true,
      description: "Diseñadora UI/UX con especialización en aplicaciones fintech y e-commerce. Experta en research y diseño centrado en el usuario.",
      skills: ["UI/UX", "Figma", "Adobe XD", "Design Systems", "User Research"],
      languages: ["Español (Nativo)", "Inglés (Fluido)", "Portugués (Intermedio)"],
      recentWork: "Rediseño de app móvil para FinanceApp"
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      title: "Mobile App Developer",
      avatar: "/placeholder-user.jpg",
      location: "Bogotá, Colombia",
      hourlyRate: 35,
      rating: 4.7,
      reviewsCount: 68,
      projectsCompleted: 45,
      responseTime: "30 min",
      successRate: 94,
      verified: true,
      topRated: false,
      available: false,
      description: "Desarrollador mobile especializado en React Native y Flutter. Experiencia en apps de delivery, fintech y e-commerce.",
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      languages: ["Español (Nativo)", "Inglés (Avanzado)"],
      recentWork: "App de delivery para DeliveryPro"
    },
    {
      id: 4,
      name: "Isabella Santos",
      title: "Digital Marketing Strategist",
      avatar: "/placeholder-user.jpg",
      location: "São Paulo, Brasil",
      hourlyRate: 42,
      rating: 4.9,
      reviewsCount: 112,
      projectsCompleted: 78,
      responseTime: "1 hora",
      successRate: 97,
      verified: true,
      topRated: true,
      available: true,
      description: "Especialista en marketing digital con enfoque en growth hacking y startups. Experta en SEO, SEM y redes sociales.",
      skills: ["SEO", "SEM", "Social Media", "Growth Hacking", "Analytics"],
      languages: ["Portugués (Nativo)", "Español (Fluido)", "Inglés (Avanzado)"],
      recentWork: "Estrategia de crecimiento para StartupFintech"
    },
    {
      id: 5,
      name: "Juan Pablo Morales",
      title: "Data Scientist & ML Engineer",
      avatar: "/placeholder-user.jpg",
      location: "Lima, Perú",
      hourlyRate: 50,
      rating: 4.8,
      reviewsCount: 43,
      projectsCompleted: 32,
      responseTime: "2 horas",
      successRate: 95,
      verified: true,
      topRated: false,
      available: true,
      description: "Científico de datos con PhD en Machine Learning. Especializado en modelos predictivos y análisis de datos financieros.",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
      languages: ["Español (Nativo)", "Inglés (Avanzado)"],
      recentWork: "Modelo predictivo de riesgo crediticio"
    },
    {
      id: 6,
      name: "Sofía Herrera",
      title: "Backend Developer",
      avatar: "/placeholder-user.jpg",
      location: "Santiago, Chile",
      hourlyRate: 40,
      rating: 4.6,
      reviewsCount: 85,
      projectsCompleted: 67,
      responseTime: "3 horas",
      successRate: 93,
      verified: false,
      topRated: false,
      available: true,
      description: "Desarrolladora backend especializada en Node.js y Python. Experiencia en microservicios, APIs REST y bases de datos.",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS"],
      languages: ["Español (Nativo)", "Inglés (Intermedio)"],
      recentWork: "API de pagos para e-commerce"
    }
  ]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Encuentra el <span className="text-blue-200">talento perfecto</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Conecta con los mejores freelancers de América Latina verificados y evaluados
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-200">12,500+</div>
                <div className="text-sm text-gray-400">Freelancers</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">4.8★</div>
                <div className="text-sm text-gray-400">Rating Promedio</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">95%</div>
                <div className="text-sm text-gray-400">Tasa de Éxito</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">2.5k</div>
                <div className="text-sm text-gray-400">Disponibles</div>
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
                      placeholder="Buscar freelancers..."
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Habilidad</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Todas las habilidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las habilidades</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="node">Node.js</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarifa por Hora</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Cualquier tarifa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier tarifa</SelectItem>
                      <SelectItem value="low">$10 - $25</SelectItem>
                      <SelectItem value="medium">$25 - $50</SelectItem>
                      <SelectItem value="high">$50 - $100</SelectItem>
                      <SelectItem value="premium">$100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ubicación</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Cualquier ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier ubicación</SelectItem>
                      <SelectItem value="mexico">México</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="brazil">Brasil</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="peru">Perú</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="topRated" className="rounded" />
                    <label htmlFor="topRated" className="text-sm">Solo Top Rated</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="available" className="rounded" />
                    <label htmlFor="available" className="text-sm">Solo Disponibles</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="verified" className="rounded" />
                    <label htmlFor="verified" className="text-sm">Solo Verificados</label>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Mostrando {freelancers.length} de 12,500+ freelancers
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Freelancers Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {freelancers.map((freelancer) => (
              <Card key={freelancer.id} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                          <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {freelancer.available && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                          {freelancer.verified && (
                            <Shield className="w-4 h-4 text-blue-200" />
                          )}
                          {freelancer.topRated && (
                            <Trophy className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-blue-200 text-sm font-medium">{freelancer.title}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {freelancer.location}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{freelancer.rating}</span>
                        <span className="text-gray-400 text-sm">({freelancer.reviewsCount})</span>
                      </div>
                      <div className="text-xl font-bold text-green-400">
                        ${freelancer.hourlyRate}/hr
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {freelancer.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proyectos completados:</span>
                      <span className="font-medium">{freelancer.projectsCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tasa de éxito:</span>
                      <span className="font-medium text-green-400">{freelancer.successRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Responde en:</span>
                      <span className="font-medium">{freelancer.responseTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-200/20 text-blue-200 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 4 && (
                        <Badge variant="outline" className="border-blue-200/30 text-xs">
                          +{freelancer.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Idiomas:</p>
                    <div className="flex flex-wrap gap-1">
                      {freelancer.languages.map((language, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Trabajo reciente:</p>
                    <p className="text-sm">{freelancer.recentWork}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-200 hover:bg-blue-300 text-black text-sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contactar
                    </Button>
                    <Button variant="outline" className="border-blue-200/30 text-sm">
                      Ver Perfil
                    </Button>
                  </div>

                  <div className="mt-3 text-center">
                    <Badge
                      variant={freelancer.available ? "default" : "secondary"}
                      className={freelancer.available ? "bg-green-600" : "bg-gray-600"}
                    >
                      {freelancer.available ? "Disponible Ahora" : "Ocupado"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-blue-200/30">
              Cargar Más Freelancers
            </Button>
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  ¿Necesitas ayuda para encontrar el talento adecuado?
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Nuestro equipo de expertos puede ayudarte a encontrar el freelancer perfecto
                  para tu proyecto específico en menos de 24 horas.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                    Hablar con un Experto
                  </Button>
                  <Button variant="outline" className="border-blue-200/30">
                    Publicar Proyecto
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
