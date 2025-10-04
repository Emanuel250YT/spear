import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Star,
  Shield,
  CheckCircle,
  Upload,
  Github,
  Linkedin,
  Globe
} from "lucide-react"
import Link from "next/link"

export default function RegistrationPage() {
  const countries = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia",
    "Costa Rica", "Ecuador", "El Salvador", "Guatemala",
    "Honduras", "México", "Nicaragua", "Panamá", "Paraguay",
    "Perú", "República Dominicana", "Uruguay", "Venezuela"
  ]

  const skillCategories = {
    "Desarrollo Web": ["React", "Vue.js", "Angular", "Node.js", "Django", "Laravel", "WordPress"],
    "Desarrollo Mobile": ["React Native", "Flutter", "iOS", "Android", "Xamarin"],
    "Blockchain": ["Solidity", "Web3", "DeFi", "Smart Contracts", "NFTs"],
    "Diseño": ["UI/UX", "Figma", "Adobe XD", "Photoshop", "Illustrator"],
    "Marketing": ["SEO", "SEM", "Social Media", "Content Marketing", "Email Marketing"],
    "Datos": ["Python", "R", "SQL", "Machine Learning", "Data Analysis"]
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Únete a <span className="text-blue-200">Spear</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Crea tu perfil y comienza a trabajar con las mejores empresas de América Latina
            </p>
          </div>

          {/* Registration Form */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="professional">Perfil Profesional</TabsTrigger>
                <TabsTrigger value="skills">Habilidades</TabsTrigger>
                <TabsTrigger value="verification">Verificación</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-200" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre *</Label>
                        <Input
                          id="firstName"
                          placeholder="Tu nombre"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido *</Label>
                        <Input
                          id="lastName"
                          placeholder="Tu apellido"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+52 123 456 7890"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País *</Label>
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Selecciona tu país" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country.toLowerCase()}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input
                        id="city"
                        placeholder="Tu ciudad"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                        Siguiente: Perfil Profesional
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Professional Profile */}
              <TabsContent value="professional">
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-200" />
                      Perfil Profesional
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título Profesional *</Label>
                      <Input
                        id="title"
                        placeholder="ej. Full Stack Developer, UI/UX Designer"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción Profesional *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe tu experiencia, especialidades y lo que te hace único..."
                        className="bg-white/5 border-white/10 text-white min-h-[120px]"
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Años de Experiencia *</Label>
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 años</SelectItem>
                            <SelectItem value="2-3">2-3 años</SelectItem>
                            <SelectItem value="4-5">4-5 años</SelectItem>
                            <SelectItem value="6-10">6-10 años</SelectItem>
                            <SelectItem value="10+">10+ años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Tarifa por Hora (USD) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="25"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Disponibilidad *</Label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="¿Cuántas horas puedes trabajar por semana?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="part-time">Tiempo parcial (10-30 hrs/semana)</SelectItem>
                          <SelectItem value="full-time">Tiempo completo (30+ hrs/semana)</SelectItem>
                          <SelectItem value="project-based">Por proyectos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Portfolio/Sitio Web</Label>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-sm">Sitio Web</Label>
                          <Input
                            id="website"
                            placeholder="https://tu-portfolio.com"
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github" className="text-sm">GitHub</Label>
                          <Input
                            id="github"
                            placeholder="https://github.com/tu-usuario"
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="text-sm">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            placeholder="https://linkedin.com/in/tu-perfil"
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-blue-200/30">
                        Anterior
                      </Button>
                      <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                        Siguiente: Habilidades
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-200" />
                      Habilidades y Especialidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Selecciona tus habilidades principales *</Label>
                      {Object.entries(skillCategories).map(([category, skills]) => (
                        <div key={category} className="space-y-3">
                          <h4 className="font-semibold text-blue-200">{category}</h4>
                          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
                            {skills.map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox id={skill} />
                                <Label htmlFor={skill} className="text-sm cursor-pointer">
                                  {skill}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customSkills">Otras Habilidades</Label>
                      <Textarea
                        id="customSkills"
                        placeholder="Menciona otras habilidades que no estén en la lista (separadas por comas)"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Idiomas que hablas *</Label>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="spanish" defaultChecked />
                            <Label htmlFor="spanish">Español</Label>
                          </div>
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Nivel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="native">Nativo</SelectItem>
                              <SelectItem value="fluent">Fluido</SelectItem>
                              <SelectItem value="advanced">Avanzado</SelectItem>
                              <SelectItem value="intermediate">Intermedio</SelectItem>
                              <SelectItem value="basic">Básico</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="english" />
                            <Label htmlFor="english">Inglés</Label>
                          </div>
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Nivel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="native">Nativo</SelectItem>
                              <SelectItem value="fluent">Fluido</SelectItem>
                              <SelectItem value="advanced">Avanzado</SelectItem>
                              <SelectItem value="intermediate">Intermedio</SelectItem>
                              <SelectItem value="basic">Básico</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-blue-200/30">
                        Anterior
                      </Button>
                      <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                        Siguiente: Verificación
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Verification */}
              <TabsContent value="verification">
                <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-200" />
                      Verificación y Documentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-blue-200/10 border border-blue-200/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">¿Por qué verificar tu identidad?</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Aumenta tu Trust Factor hasta 95%</li>
                        <li>• Acceso a proyectos de mayor valor</li>
                        <li>• Procesamiento de pagos más rápido</li>
                        <li>• Mayor confianza de los clientes</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="font-medium">Verificación de Email</span>
                          </div>
                          <Badge variant="default" className="bg-green-600">
                            Completado
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          Se enviará un código de verificación a tu email
                        </p>
                      </div>

                      <div className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Upload className="w-5 h-5 text-blue-200" />
                            <span className="font-medium">Documento de Identidad</span>
                          </div>
                          <Button variant="outline" size="sm" className="border-blue-200/30">
                            Subir
                          </Button>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          Sube una foto clara de tu cédula, pasaporte o licencia de conducir
                        </p>
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Arrastra tu archivo aquí o haz clic para seleccionar
                          </p>
                        </div>
                      </div>

                      <div className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-blue-200" />
                            <span className="font-medium">Verificación de Teléfono</span>
                          </div>
                          <Button variant="outline" size="sm" className="border-blue-200/30">
                            Verificar
                          </Button>
                        </div>
                        <p className="text-sm text-gray-400">
                          Recibirás un SMS con un código de verificación
                        </p>
                      </div>

                      <div className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Github className="w-5 h-5 text-blue-200" />
                            <span className="font-medium">Conectar GitHub</span>
                          </div>
                          <Button variant="outline" size="sm" className="border-blue-200/30">
                            Conectar
                          </Button>
                        </div>
                        <p className="text-sm text-gray-400">
                          Opcional: Conecta tu GitHub para mostrar tu trabajo
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          Acepto los{" "}
                          <Link href="/t&c" className="text-blue-200 hover:underline">
                            Términos y Condiciones
                          </Link>{" "}
                          y la{" "}
                          <Link href="/privacy" className="text-blue-200 hover:underline">
                            Política de Privacidad
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <Label htmlFor="marketing" className="text-sm">
                          Quiero recibir emails sobre nuevos proyectos y actualizaciones
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-blue-200/30">
                        Anterior
                      </Button>
                      <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                        Crear Mi Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              ¿Por qué elegir <span className="text-blue-200">Spear</span>?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <DollarSign className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Comisiones Bajas</h3>
                  <p className="text-sm text-gray-400">
                    Desde 0.5% fijo en el plan Premium
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pagos Seguros</h3>
                  <p className="text-sm text-gray-400">
                    Blockchain y escrow para proteger tus pagos
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl text-center">
                <CardContent className="p-6">
                  <Star className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Proyectos Premium</h3>
                  <p className="text-sm text-gray-400">
                    Acceso a empresas top de América Latina
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}