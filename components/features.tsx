"use client"

import { useEffect, useState } from "react"
import { Shield, Zap, Users, Coins, Lock, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "¿Por qué elegir Spear?",
  subtitle: "La plataforma blockchain más segura para freelancers latinoamericanos",
}

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent)

  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {content.title}
      </h2>
      <p className="mb-12 text-center text-lg text-gray-400 max-w-2xl mx-auto">
        {content.subtitle}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Blockchain Security */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-200/20">
                <Shield className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-[11px] tracking-widest text-neutral-400">SEGURIDAD</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Protección Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Smart contracts que protegen tus fondos hasta la entrega completa del proyecto.
              Seguridad descentralizada que no depende de terceros.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Contratos inteligentes verificados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Fondos bloqueados hasta entrega</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Disputas resueltas automáticamente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zero Commission */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-200/20">
                <Coins className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-[11px] tracking-widest text-neutral-400">COMISIONES</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Trabaja Sin Comisiones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Por defecto, trabajas completamente gratis. Solo pagas comisión si eliges
              nuestro servicio de protección y acompañamiento.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>0% comisión por defecto</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>1%-5% solo con protección</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Comisiones escalonadas justas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Factor */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-200/20">
                <Users className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-[11px] tracking-widest text-neutral-400">CONFIANZA</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Sistema Trust Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Reputación transparente basada en trabajos completados, reviews y validaciones
              adicionales como ID y antigüedad.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Historial inmutable</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Validaciones opcionales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Reviews verificadas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fast Payments */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-200/20">
                <Zap className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-[11px] tracking-widest text-neutral-400">PAGOS</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Pagos Instantáneos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Recibe pagos automáticos al completar hitos. Pagos fraccionados para mayor
              seguridad y flujo de efectivo constante.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Pagos automáticos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Hitos programables</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Fondo de riesgo opcional</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Limits */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-200/20">
                <Lock className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-[11px] tracking-widest text-neutral-400">LÍMITES</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Límites Inteligentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Sistema balanceado que protege la calidad: máximo 25 solicitudes y 5 proyectos
              simultáneos para garantizar atención de calidad.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>25 solicitudes máx.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>5 proyectos simultáneos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Calidad garantizada</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latinoamerican Focus */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-200/20">
                <Globe className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-[11px] tracking-widest text-neutral-400">COMUNIDAD</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Enfoque Latinoamericano</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Diseñado específicamente para freelancers latinos. Soporte en español,
              horarios regionales y comprensión cultural única.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Soporte en español</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Horarios regionales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                <span>Comunidad unida</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-2xl font-bold mb-6 text-white">Requisitos mínimos del sistema</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="text-left p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold mb-3 text-blue-200">Para Clientes</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Proyectos mínimo $10 USD</li>
                <li>• Duración máxima 7 días antes de renovación</li>
                <li>• Wallet compatible con blockchain</li>
                <li>• Descripción clara de requerimientos</li>
              </ul>
            </div>
            <div className="text-left p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-semibold mb-3 text-blue-200">Para Freelancers</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Wallet conectada para verificación</li>
                <li>• Portfolio o experiencia verificable</li>
                <li>• Disponibilidad para chat directo</li>
                <li>• Compromiso con deadlines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
