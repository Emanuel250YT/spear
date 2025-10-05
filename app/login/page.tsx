"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletButton } from "@/components/ui/wallet-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useWeb3 } from "@/hooks/useWeb3"
import { AlertCircle, Wallet, Key, Shield } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'wallet'>('credentials')
  const router = useRouter()

  const { isConnected, account, isCorrectNetwork } = useWeb3()

  // Lista de direcciones autorizadas (en producción esto estaría en un backend)
  const authorizedAddresses = [
    "0xbcf15541a89979f6ca33725c295d3f1814cc4432", // Tu dirección
    "0xBcF15541A89979F6Ca33725c295D3f1814cC4432", // Tu dirección (mayúsculas)
  ]

  const handleCredentialLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simple client-side authentication
    setTimeout(() => {
      // Default credentials
      if (
        (email === "admin@spear.dev" && password === "admin123") ||
        (email === "admin@theskitbit.com" && password === "1234") ||
        (email === "Addy@theskitbit.com" && password === "1234")
      ) {
        // Set a cookie that expires in 24 hours
        const expiryDate = new Date()
        expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000)
        document.cookie = `admin-session=authenticated; path=/; expires=${expiryDate.toUTCString()}`
        router.push("/admin")
      } else {
        setError("Credenciales inválidas")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleWalletLogin = () => {
    console.log('handleWalletLogin called');
    console.log('isConnected:', isConnected);
    console.log('account:', account);
    
    if (!isConnected) {
      setError("Por favor conecta tu wallet primero")
      return
    }

    if (!account) {
      setError("No se pudo obtener la dirección de la wallet")
      return
    }

    // Permitir acceso a cualquier wallet
    console.log('Setting session and redirecting...');
    const expiryDate = new Date()
    expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000)
    document.cookie = `admin-session=wallet-${account}; path=/; expires=${expiryDate.toUTCString()}`
    sessionStorage.setItem('admin-wallet', account)
    sessionStorage.setItem('admin-auth', 'true')
    console.log('Session set, redirecting to /admin');
    router.push('/admin')
  }

  // Auto-login removido para evitar loops

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
      {/* Left side - only visible on desktop */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/icons/spear-white.svg"
              alt="Spear logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-2xl font-semibold text-white">Spear</span>
          </div>
          <h1 className="text-4xl font-bold text-white mt-12">Panel de Administración</h1>
          <p className="text-purple-100 mt-4 max-w-md">
            Gestiona contratos inteligentes, proyectos y configuraciones de la plataforma desde un panel centralizado.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-purple-100">
              <Shield className="h-5 w-5" />
              <span>Autenticación segura con Web3</span>
            </div>
            <div className="flex items-center gap-3 text-purple-100">
              <Wallet className="h-5 w-5" />
              <span>Conecta tu wallet autorizada</span>
            </div>
            <div className="flex items-center gap-3 text-purple-100">
              <Key className="h-5 w-5" />
              <span>O usa credenciales tradicionales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        {/* Mobile header - only visible on mobile */}
        <div className="flex md:hidden items-center gap-3 mb-8 w-full">
          <Image
            src="/icons/spear-white.svg"
            alt="Spear logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-2xl font-semibold text-white">Spear</span>
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Acceso Administrativo</h2>
            <p className="text-neutral-400 mt-2">Elige tu método de autenticación preferido</p>
          </div>

          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-white">Iniciar Sesión</CardTitle>
              <CardDescription className="text-neutral-400">
                Accede al panel de administración
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={loginMethod} onValueChange={(value) => {
                setLoginMethod(value as 'credentials' | 'wallet')
                setError("")
              }}>
                <TabsList className="grid w-full grid-cols-2 bg-[#0a0a0a]">
                  <TabsTrigger value="credentials" className="data-[state=active]:bg-blue-200 data-[state=active]:text-black">
                    <Key className="h-4 w-4 mr-2" />
                    Credenciales
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="data-[state=active]:bg-blue-200 data-[state=active]:text-black">
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallet
                  </TabsTrigger>
                </TabsList>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3 mt-4">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}

                <TabsContent value="credentials" className="space-y-4 mt-4">
                  <form onSubmit={handleCredentialLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-neutral-200">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@spear.dev"
                        className="bg-[#0a0a0a] border-neutral-700 text-white focus:border-blue-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-neutral-200">
                          Contraseña
                        </Label>
                        <button type="button" className="text-sm text-blue-200 hover:underline">
                          ¿Olvidaste tu contraseña?
                        </button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-[#0a0a0a] border-neutral-700 text-white focus:border-blue-200"
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full bg-blue-200 text-black hover:bg-blue-300">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                          Iniciando sesión...
                        </>
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="wallet" className="space-y-4 mt-4">
                  <div className="text-center space-y-4">
                    <div className="space-y-2">
                      <p className="text-neutral-300 text-sm">
                        Conecta tu wallet autorizada para acceder al panel de administración
                      </p>
                      {isConnected && account && (
                        <div className="p-3 bg-[#0a0a0a] rounded-lg border border-neutral-700">
                          <p className="text-xs text-neutral-400">Wallet conectada:</p>
                          <p className="text-sm font-mono text-blue-200 break-all">{account}</p>
                        </div>
                      )}
                    </div>

                    <WalletButton
                      variant="default"
                      size="lg"
                      className="w-full bg-blue-200 text-black hover:bg-blue-300"
                      showAccount={false}
                      showNetwork={true}
                    />

                    {isConnected && (
                      <Button
                        onClick={handleWalletLogin}
                        className="w-full bg-purple-600 text-white hover:bg-purple-700"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Acceder como Administrador
                      </Button>
                    )}

                    <div className="text-xs text-neutral-500 space-y-1">
                      <p>• Conecta tu wallet para acceder</p>
                      <p>• Soporta SubWallet, Talisman y MetaMask</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-neutral-400 text-sm">
              ¿Necesitas ayuda? Contacta{" "}
              <a href="mailto:support@spear.dev" className="text-blue-200 hover:underline">
                support@spear.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
