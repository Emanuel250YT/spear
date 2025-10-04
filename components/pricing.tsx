"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Shield, Zap, Users, TrendingUp, Calculator, DollarSign } from "lucide-react"

type Feature = { text: string; muted?: boolean }

const ACCENT = "#bfdbfe" // blue-200

function FeatureItem({ text, muted = false }: Feature) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
      <span className={`text-sm ${muted ? "text-neutral-500" : "text-neutral-200"}`}>{text}</span>
    </li>
  )
}

function CommissionCalculator() {
  const [amount, setAmount] = useState<number>(1000)
  const [commission, setCommission] = useState<number>(0)
  const [commissionRate, setCommissionRate] = useState<number>(0)

  // Fórmula lineal: tasa(monto) = 3% - (monto - 100) / 14900 × 2%
  const calculateCommission = (projectAmount: number) => {
    if (projectAmount < 101) {
      return { rate: 3, fee: projectAmount * 0.03 }
    }

    if (projectAmount >= 15000) {
      return { rate: 0.5, fee: projectAmount * 0.005 }
    }

    // Fórmula lineal para montos entre $101 y $15,000
    const rate = 3 - ((projectAmount - 100) / 14900) * 2
    const fee = projectAmount * (rate / 100)

    return { rate: Math.max(1, rate), fee }
  }

  useEffect(() => {
    const result = calculateCommission(amount)
    setCommissionRate(result.rate)
    setCommission(result.fee)
  }, [amount])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <Card className="max-w-2xl mx-auto liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-200/20">
            <Calculator className="h-6 w-6 text-blue-200" />
          </div>
          <CardTitle className="text-xl">Calculadora de Protección</CardTitle>
        </div>
        <p className="text-gray-400 text-sm">
          Compara la protección básica (gratis) vs. protección premium
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">
            Monto del Proyecto (USD)
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="pl-10 bg-white/5 border-white/10 text-white text-lg"
              placeholder="1000"
              min="10"
              max="100000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Protección Básica - Gratis */}
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Protección Básica (GRATIS)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monto del Proyecto:</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Comisión:</span>
                <span className="font-medium text-green-400">$0.00 (0%)</span>
              </div>
              <div className="flex justify-between">
                <span>Recibes:</span>
                <span className="font-medium text-green-400">{formatCurrency(amount)}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              ✓ Protección completa de fondos<br />
              ✓ Sistema de disputas<br />
              ✓ Soporte 24/7
            </div>
          </div>

          {/* Protección Premium */}
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Protección Premium
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monto del Proyecto:</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tasa de Comisión:</span>
                <span className="font-medium text-blue-200">{formatPercentage(commissionRate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Comisión:</span>
                <span className="font-medium text-red-400">{formatCurrency(commission)}</span>
              </div>
              <div className="flex justify-between">
                <span>Recibes:</span>
                <span className="font-medium text-green-400">{formatCurrency(amount - commission)}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              ✓ Todo lo de Básica +<br />
              ✓ Resolución prioritaria<br />
              ✓ Gestión de hitos
            </div>
          </div>
        </div>        <div className="grid grid-cols-3 gap-2 text-xs">
          {[50, 75, 100, 500, 1000, 2000, 5000, 7500, 10000, 12500, 15000, 25000].map((presetAmount) => {
            const result = calculateCommission(presetAmount)
            return (
              <Button
                key={presetAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(presetAmount)}
                className="border-blue-200/30 text-blue-200 hover:bg-blue-200/10"
              >
                ${presetAmount.toLocaleString()}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="text-white" itemScope itemType="https://schema.org/PriceSpecification">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "rgba(191,219,254,0.12)", color: ACCENT }}
          >
            Sistema de Comisiones
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" itemProp="name">
            Comisiones Transparentes
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400" itemProp="description">
            Protección básica gratis para todos. Solo pagas comisión si eliges nuestros servicios premium.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full px-5 text-neutral-900 hover:brightness-95"
              style={{ backgroundColor: ACCENT }}
            >
              <Link href="/admin/login">
                Conectar Wallet
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Protección Básica */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div
              className="absolute right-4 top-11 rounded-full px-2 py-0.5 text-[10px]"
              style={{ backgroundColor: "#10b981", color: "#000" }}
            >
              ¡GRATIS!
            </div>

            <CardHeader className="relative z-10 p-6 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5" style={{ color: ACCENT }} />
                <h3 className="text-lg font-semibold" itemProp="name">
                  Protección Básica
                </h3>
              </div>
              <div className="text-3xl font-bold" itemProp="price">
                0%
              </div>
              <div className="text-sm text-neutral-400" itemProp="priceRange">
                Sin costo - Disponible para todos
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-4">
              <ul className="space-y-2">
                <FeatureItem text="Protección completa de fondos" />
                <FeatureItem text="Sistema de disputas" />
                <FeatureItem text="Soporte 24/7" />
                <FeatureItem text="Verificación de entrega" />
                <FeatureItem text="Chat seguro" />
                <FeatureItem text="Pagos fraccionados" />
              </ul>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button
                asChild
                size="lg"
                className="w-full rounded-lg text-neutral-900 hover:brightness-95"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/admin/login">Empezar ahora</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Protección Estándar */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            style={{ border: `2px solid ${ACCENT}` }}
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div
              className="absolute right-4 top-11 rounded-full px-2 py-0.5 text-[10px]"
              style={{ backgroundColor: ACCENT, color: "#000" }}
            >
              Más Popular
            </div>

            <CardHeader className="relative z-10 p-6 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5" style={{ color: ACCENT }} />
                <h3 className="text-lg font-semibold" itemProp="name">
                  Protección Estándar
                </h3>
              </div>
              <div className="text-3xl font-bold" itemProp="price">
                3% - 1%
              </div>
              <div className="text-sm text-neutral-400" itemProp="priceRange">
                Proyectos de $101 - $15,000 USD
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-4">
              <ul className="space-y-2">
                <FeatureItem text="Todo lo de Protección Básica" />
                <FeatureItem text="Resolución prioritaria de disputas" />
                <FeatureItem text="Fondo de riesgo personalizable" />
                <FeatureItem text="Validaciones adicionales" />
                <FeatureItem text="Múltiples revisiones" />
                <FeatureItem text="Gestión de hitos" />
              </ul>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button
                asChild
                size="lg"
                className="w-full rounded-lg text-neutral-900 hover:brightness-95"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/admin/login">Empezar ahora</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Protección Premium */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div
              className="absolute right-4 top-11 rounded-full px-2 py-0.5 text-[10px]"
              style={{ backgroundColor: "#1f1f1f", color: "#d4d4d4" }}
            >
              Enterprise
            </div>

            <CardHeader className="relative z-10 p-6 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" style={{ color: ACCENT }} />
                <h3 className="text-lg font-semibold" itemProp="name">
                  Protección Premium
                </h3>
              </div>
              <div className="text-3xl font-bold" itemProp="price">
                0.5%
              </div>
              <div className="text-sm text-neutral-400" itemProp="priceRange">
                Proyectos de $15,000+ USD
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-4">
              <ul className="space-y-2">
                <FeatureItem text="Todo lo de Protección Estándar" />
                <FeatureItem text="Account manager dedicado" />
                <FeatureItem text="Soporte telefónico directo" />
                <FeatureItem text="Contratos legales personalizados" />
                <FeatureItem text="Revisiones ilimitadas" />
                <FeatureItem text="Garantía extendida" />
              </ul>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button
                asChild
                size="lg"
                className="w-full rounded-lg text-neutral-900 hover:brightness-95"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/admin/login">Empezar ahora</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabla de Comisiones Detallada */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Tabla de Comisiones Detallada</h3>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white/5 rounded-xl border border-white/10">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: ACCENT }}>
                    Monto del Proyecto
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: ACCENT }}>
                    Protección Básica (Gratis)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: ACCENT }}>
                    Protección Premium
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: ACCENT }}>
                    Fee Premium
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">Cualquier monto</td>
                  <td className="px-6 py-3 font-semibold text-green-400">0% - GRATIS</td>
                  <td className="px-6 py-3 text-gray-300">-</td>
                  <td className="px-6 py-3 text-gray-300">$0.00</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">&lt; $101</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">3.00%</td>
                  <td className="px-6 py-3 text-gray-300">$100 → $3.00</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$500</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈2.95%</td>
                  <td className="px-6 py-3 text-gray-300">$14.76</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$1,000</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈2.88%</td>
                  <td className="px-6 py-3 text-gray-300">$28.79</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$2,000</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈2.74%</td>
                  <td className="px-6 py-3 text-gray-300">$54.83</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$5,000</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈2.34%</td>
                  <td className="px-6 py-3 text-gray-300">$116.85</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$7,500</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈2.00%</td>
                  <td className="px-6 py-3 text-gray-300">$150.00</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$10,000</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈1.67%</td>
                  <td className="px-6 py-3 text-gray-300">$167.11</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$12,500</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">≈1.34%</td>
                  <td className="px-6 py-3 text-gray-300">$166.95</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="px-6 py-3 text-gray-300">$15,000</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 text-gray-300">0.5%</td>
                  <td className="px-6 py-3 text-gray-300">$75.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-300">$15,000+</td>
                  <td className="px-6 py-3 text-green-400">Gratis ✓</td>
                  <td className="px-6 py-3 font-semibold" style={{ color: ACCENT }}>0.5%</td>
                  <td className="px-6 py-3 text-gray-300">$250 (para $50K)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculadora de Protección */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Comparar Protección Básica vs. Premium</h3>
          <CommissionCalculator />
        </div>

        {/* Servicios Adicionales para Freelancers */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Servicios Adicionales para Freelancers</h3>
            <p className="text-xl text-gray-300">Potencia tu negocio con nuestro equipo de profesionales</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-400/20">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-blue-400">2.5%</span>
                </div>
                <CardTitle className="text-xl">Servicio de Closers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <span>Ayuda profesional para cerrar proyectos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <span>Negociación de precios y términos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <span>Comunicación efectiva con clientes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <span>Estrategias de venta personalizadas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-green-400/20">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-green-400">0.5%</span>
                </div>
                <CardTitle className="text-xl">Soporte Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Análisis de requerimientos detallado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Asesoría técnica especializada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Revisión de propuestas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Equipo de profesionales dedicado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">¿Cómo funciona?</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl">🔒</div>
                <h4 className="font-semibold mb-2">Fondos Seguros</h4>
                <p className="text-sm text-gray-400">Los fondos se mantienen en smart contracts hasta la entrega</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl">⚖️</div>
                <h4 className="font-semibold mb-2">Disputas Justas</h4>
                <p className="text-sm text-gray-400">Sistema de resolución imparcial para proteger ambas partes</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl">🎯</div>
                <h4 className="font-semibold mb-2">Límites Inteligentes</h4>
                <p className="text-sm text-gray-400">Máximo 25 solicitudes y 5 proyectos simultáneos por freelancer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}