import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Wallet, FileText, Handshake, DollarSign, Shield, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ComoFunciona() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen text-white bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              ¿Cómo funciona <span className="text-blue-200">Spear</span>?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre cómo nuestra plataforma blockchain revoluciona el freelancing en Latinoamérica
            </p>
          </div>

          {/* For Freelancers */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Para Freelancers</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-200/20">
                      <Wallet className="h-6 w-6 text-blue-200" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">01</span>
                  </div>
                  <CardTitle>Conecta tu Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Usa cualquier wallet compatible con blockchain para crear tu perfil verificado.
                    Tu identidad quedará registrada de forma segura y descentralizada.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-200/20">
                      <FileText className="h-6 w-6 text-blue-200" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">02</span>
                  </div>
                  <CardTitle>Configura tu Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Completa tu perfil con habilidades, portfolio y tarifas.
                    Opcionalmente, valida tu identidad para aumentar tu Trust Factor.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-200/20">
                      <Handshake className="h-6 w-6 text-blue-200" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">03</span>
                  </div>
                  <CardTitle>Recibe Propuestas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Los clientes te envían solicitudes de trabajo. Puedes manejar hasta 25 solicitudes
                    y trabajar en máximo 5 proyectos simultáneamente.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-200/20">
                      <MessageCircle className="h-6 w-6 text-blue-200" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">04</span>
                  </div>
                  <CardTitle>Negocia y Acepta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Usa nuestro chat integrado para negociar términos, plazos y precios.
                    Una vez acordado, acepta el proyecto y los fondos se bloquean automáticamente.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-200/20">
                      <Shield className="h-6 w-6 text-blue-200" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">05</span>
                  </div>
                  <CardTitle>Trabaja Protegido</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Desarrolla el proyecto con la seguridad de que los fondos están protegidos.
                    Puedes solicitar pagos por hitos completados si está configurado.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-200/20">
                      <DollarSign className="h-6 w-6 text-blue-200" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">06</span>
                  </div>
                  <CardTitle>Recibe tu Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Al entregar el trabajo completo, recibe tu pago automáticamente.
                    El cliente confirma la entrega o el sistema verifica automáticamente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* For Clients */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Para Clientes</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-400/20">
                      <Wallet className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-400">01</span>
                  </div>
                  <CardTitle>Conecta tu Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Conecta tu wallet para poder depositar fondos y crear solicitudes de trabajo.
                    Tu dinero estará siempre protegido por smart contracts.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-400/20">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-400">02</span>
                  </div>
                  <CardTitle>Publica tu Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Describe tu proyecto con el máximo detalle posible. Establece presupuesto mínimo de $10 USD
                    y define si quieres fondo de riesgo adicional.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-400/20">
                      <DollarSign className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-400">03</span>
                  </div>
                  <CardTitle>Deposita los Fondos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Los fondos se bloquean en el smart contract por máximo 7 días.
                    Si no encuentras freelancer, puedes retirarlos o renovar la solicitud.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-400/20">
                      <Handshake className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-400">04</span>
                  </div>
                  <CardTitle>Selecciona Freelancer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Revisa propuestas de freelancers, evalúa su Trust Factor y experiencia.
                    Usa el chat para hacer preguntas antes de decidir.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-400/20">
                      <MessageCircle className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-400">05</span>
                  </div>
                  <CardTitle>Monitorea el Progreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Mantente en contacto con el freelancer a través del chat.
                    Recibe actualizaciones y aprueba hitos si configuraste pagos fraccionados.
                  </p>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-400/20">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-2xl font-bold text-blue-400">06</span>
                  </div>
                  <CardTitle>Recibe y Confirma</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Revisa el trabajo entregado. Si cumple con tus expectativas, confirma la entrega
                    y los fondos se liberan automáticamente al freelancer.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Protection Service */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Servicio de Protección</h2>
              <p className="text-xl text-gray-300">Opcional pero recomendado para máxima seguridad</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Sin Protección (Gratis)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Transacciones directas blockchain</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Chat básico entre partes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Sin mediación en disputas</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Ideal para usuarios experimentados</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl">Con Protección (1%-5%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      <span>Soporte y mediación experta</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      <span>Resolución de disputas garantizada</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      <span>Verificación de calidad de entrega</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      <span>Chat monitoreado y asistido</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a la revolución del freelancing blockchain en Latinoamérica
            </p>
            <Button
              asChild
              size="lg"
              className="bg-blue-200 text-black font-medium rounded-lg px-8 py-3 hover:bg-lime-300"
            >
              <Link href="/admin/login">Conectar Wallet y Empezar</Link>
            </Button>
          </section>
        </div>
      </main>
      <AppverseFooter />
    </>
  )
}
