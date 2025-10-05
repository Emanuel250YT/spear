'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useWeb3 } from '@/hooks/useWeb3'
import { Wallet, LogOut, AlertCircle, Loader2, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface WalletButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showAccount?: boolean
  showNetwork?: boolean
}

export function WalletButton({
  variant = 'default',
  size = 'default',
  className,
  showAccount = true,
  showNetwork = true
}: WalletButtonProps) {
  const {
    isConnected,
    account,
    network,
    isCorrectNetwork,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    loading,
    error,
    clearError,
    isInitialized
  } = useWeb3()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // No renderizar hasta que esté montado (hidratación)
  if (!mounted || !isInitialized) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2">Cargando...</span>
      </Button>
    )
  }

  // Si no está conectado, mostrar menú de wallets
  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={className} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2">Conectando...</span>
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                <span className="ml-2">Conectar Wallet</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Selecciona tu Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={connectWallet}>
            <Wallet className="h-4 w-4 mr-2" />
            SubWallet / Talisman
          </DropdownMenuItem>
          <DropdownMenuItem onClick={connectWallet}>
            <Wallet className="h-4 w-4 mr-2" />
            MetaMask
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Si está conectado pero en red incorrecta
  if (isConnected && !isCorrectNetwork) {
    return (
      <Button
        variant="destructive"
        size={size}
        className={className}
        onClick={switchNetwork}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2">Cambiando...</span>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4" />
            <span className="ml-2">Red Incorrecta</span>
          </>
        )}
      </Button>
    )
  }

  // Formatear dirección de cuenta
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Si está conectado y en la red correcta, mostrar menú desplegable
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("justify-between", className)}
        >
          <div className="flex items-center">
            <Wallet className="h-4 w-4" />
            {showAccount && account && (
              <span className="ml-2 font-mono text-sm">
                {formatAddress(account)}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Wallet Conectada</DropdownMenuLabel>

        <DropdownMenuItem className="flex flex-col items-start space-y-1">
          <span className="text-sm font-medium">Cuenta:</span>
          <span className="text-xs font-mono text-muted-foreground break-all">
            {account}
          </span>
        </DropdownMenuItem>

        {showNetwork && network && (
          <DropdownMenuItem className="flex flex-col items-start space-y-1">
            <span className="text-sm font-medium">Red:</span>
            <div className="flex items-center space-x-2">
              <Badge variant={isCorrectNetwork ? "default" : "destructive"}>
                {network.name || 'Desconocida'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {network.chainId}
              </span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {!isCorrectNetwork && (
          <DropdownMenuItem onClick={switchNetwork} disabled={loading}>
            <AlertCircle className="h-4 w-4 mr-2" />
            Cambiar a Red Correcta
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}