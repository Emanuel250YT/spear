'use client'

import { useWeb3 } from '@/hooks/useWeb3'
import { useRouter } from 'next/navigation'
import { ReactNode, CSSProperties } from 'react'

interface SmartLoginButtonProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  style?: CSSProperties
}

/**
 * Botón inteligente que redirige automáticamente basado en el estado de la wallet:
 * - Si wallet está conectada → /proyectos (crear proyecto)
 * - Si wallet NO está conectada → /login
 */
export function SmartLoginButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  style
}: SmartLoginButtonProps) {
  const { isConnected } = useWeb3()
  const router = useRouter()

  const handleClick = () => {
    if (isConnected) {
      router.push('/proyectos')
    } else {
      router.push('/login')
    }
  }

  return (
    <button
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}
