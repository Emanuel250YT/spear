import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Shield,
  Trophy,
  Clock,
  CheckCircle,
  Settings,
  Edit3,
  Eye,
  Download
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Carlos Mendoza",
    username: "@carlosmendoza",
    avatar: "/placeholder-user.jpg",
    location: "México City, México",
    joinDate: "Enero 2024",
    title: "Full Stack Developer & Blockchain Expert",
    description: "Desarrollador con 8+ años de experiencia en React, Node.js y tecnologías blockchain. Especializado en DApps y smart contracts.",
    trustFactor: 95,
    rating: 4.9,
    reviewsCount: 127,
    projectsCompleted: 89,
    totalEarnings: 45600,
    skills: [
      "React", "Node.js", "TypeScript", "Solidity", "Web3",
      "PostgreSQL", "MongoDB", "AWS", "Docker", "GraphQL"
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Avanzado" },
      { name: "Portugués", level: "Intermedio" }
    ],
    verifications: [
      { type: "Identidad", verified: true },
      { type: "Email", verified: true },
      { type: "Teléfono", verified: true },
      { type: "GitHub", verified: true },
      { type: "LinkedIn", verified: false }
    ]
  }

  const recentProjects = [
    {
      id: 1,
      title: "DApp de Trading NFT",
      client: "CryptoStart",
      budget: "$8,500",
      status: "Completado",
      rating: 5,
      completedAt: "2024-09-15"
    },
    {
      id: 2,
      title: "Plataforma E-commerce",
      client: "TechStore",
      budget: "$12,000",
      status: "En Progreso",
      rating: null,
      completedAt: null
    },
    {
      id: 3,
      title: "API de Pagos Blockchain",
      client: "FinanceCorp",
      budget: "$6,200",
      status: "Completado",
      rating: 5,
      completedAt: "2024-08-28"
    }
  ]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="mb-8">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">CM</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                        <p className="text-gray-400 mb-2">{user.username}</p>
                        <p className="text-xl text-blue-200 mb-4">{user.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-blue-200/30">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-200/30">
                          <Eye className="w-4 h-4 mr-2" />
                          Vista Pública
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6">{user.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        Desde {user.joinDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {user.rating} ({user.reviewsCount} reviews)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Shield className="w-4 h-4 text-blue-200" />
                        Trust Factor: {user.trustFactor}%
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-blue-200">{user.projectsCompleted}</div>
                        <div className="text-sm text-gray-400">Proyectos</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">${user.totalEarnings.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Ganados</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">{user.skills.length}</div>
                        <div className="text-sm text-gray-400">Habilidades</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Trust Factor */}
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-200" />
                      Trust Factor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Puntaje General</span>
                          <span className="font-bold text-blue-200">{user.trustFactor}%</span>
                        </div>
                        <Progress value={user.trustFactor} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        {user.verifications.map((verification, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{verification.type}</span>
                            {verification.verified ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Button variant="outline" size="sm" className="text-xs">
                                Verificar
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-200" />
                      Actividad Reciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Proyecto completado: "DApp de Trading NFT"</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Recibió review 5 estrellas de CryptoStart</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Verificación de GitHub completada</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Propuesta enviada para "Sistema CRM"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Overview */}
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Habilidades Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.slice(0, 8).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-200/20 text-blue-200">
                        {skill}
                      </Badge>
                    ))}
                    {user.skills.length > 8 && (
                      <Badge variant="outline" className="border-blue-200/30">
                        +{user.skills.length - 8} más
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Proyectos Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-400">Cliente: {project.client}</p>
                          <p className="text-sm text-blue-200">{project.budget}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={project.status === "Completado" ? "default" : "secondary"}
                            className={project.status === "Completado" ? "bg-green-600" : "bg-orange-600"}
                          >
                            {project.status}
                          </Badge>
                          {project.rating && (
                            <div className="flex items-center gap-1 mt-2">
                              {[...Array(project.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Habilidades Técnicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{skill}</span>
                          <Badge variant="secondary" className="bg-blue-200/20 text-blue-200">
                            Expert
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Idiomas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.languages.map((language, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{language.name}</span>
                          <Badge variant="outline" className="border-blue-200/30">
                            {language.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Reviews de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>CL</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">Cliente Anónimo</h4>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">
                              "Excelente trabajo, muy profesional y entregó antes del deadline.
                              Definitivamente trabajaré con Carlos nuevamente."
                            </p>
                            <p className="text-xs text-gray-500">Hace 2 semanas</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Configuración de Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start border-blue-200/30">
                      <Settings className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200/30">
                      <Shield className="w-4 h-4 mr-2" />
                      Verificaciones
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200/30">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Configurar Pagos
                    </Button>
                  </CardContent>
                </Card>

                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Exportar Datos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start border-blue-200/30">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Portfolio
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200/30">
                      <Download className="w-4 h-4 mr-2" />
                      Historial de Proyectos
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200/30">
                      <Download className="w-4 h-4 mr-2" />
                      Certificados
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}