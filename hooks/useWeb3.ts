'use client'

import { useState, useEffect, useCallback } from 'react'
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers'
import { SPEAR_ESCROW_ABI } from '@/lib/web3/abi'
import {
  DEFAULT_NETWORK,
  getContractAddressByChainId,
  getNetworkByChainId,
  type ProjectDetails,
  type CreateProjectParams,
  ProtectionType,
  ProjectStatus
} from '@/lib/web3/config'

interface UseWeb3Return {
  // Estado de la conexión
  isConnected: boolean
  account: string | null
  chainId: string | null
  network: any
  isCorrectNetwork: boolean

  // Providers y contrato
  provider: BrowserProvider | null
  contract: Contract | null

  // Funciones de conexión
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: () => Promise<void>

  // Estado de carga y errores
  loading: boolean
  error: string | null

  // Función para limpiar errores
  clearError: () => void

  // Estado de inicialización
  isInitialized: boolean
}

export function useWeb3(): UseWeb3Return {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [network, setNetwork] = useState<any>(null)
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const isCorrectNetwork = chainId === DEFAULT_NETWORK.chainId

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const disconnectWallet = useCallback(() => {
    setIsConnected(false)
    setAccount(null)
    setChainId(null)
    setNetwork(null)
    setProvider(null)
    setContract(null)
    setError(null)

    // Limpiar localStorage si se está usando para persistencia
    if (typeof window !== 'undefined') {
      localStorage.removeItem('walletConnected')
    }
  }, [])

  const connectWallet = useCallback(async () => {
    if (typeof window === 'undefined') {
      setError('Este navegador no soporta Web3')
      return
    }

    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask no está instalado. Por favor instala MetaMask para continuar.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Solicitar acceso a las cuentas
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      if (!accounts || accounts.length === 0) {
        throw new Error('No se pudo acceder a ninguna cuenta')
      }

      // Crear provider
      const newProvider = new BrowserProvider(window.ethereum)
      const signer = await newProvider.getSigner()
      const address = await signer.getAddress()
      const network = await newProvider.getNetwork()

      const chainIdHex = `0x${network.chainId.toString(16)}`

      setProvider(newProvider)
      setAccount(address)
      setChainId(chainIdHex)
      setNetwork(getNetworkByChainId(chainIdHex))
      setIsConnected(true)

      // Crear instancia del contrato
      const contractAddress = getContractAddressByChainId(chainIdHex)
      if (contractAddress) {
        const contractInstance = new Contract(contractAddress, SPEAR_ESCROW_ABI, signer)
        setContract(contractInstance)
      }

      // Guardar estado de conexión
      if (typeof window !== 'undefined') {
        localStorage.setItem('walletConnected', 'true')
      }

    } catch (err: any) {
      console.error('Error conectando wallet:', err)
      setError(err.message || 'Error conectando con MetaMask')
      disconnectWallet()
    } finally {
      setLoading(false)
    }
  }, [disconnectWallet])

  const switchNetwork = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask no está instalado.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Intentar cambiar a la red
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: DEFAULT_NETWORK.chainId }],
      })
    } catch (switchError: any) {
      // Si la red no está agregada, agregarla
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [DEFAULT_NETWORK],
          })
        } catch (addError: any) {
          setError('Error agregando la red: ' + addError.message)
        }
      } else {
        setError('Error cambiando de red: ' + switchError.message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Detectar cambios en las cuentas
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Usuario desconectó la wallet
          setIsConnected(false)
          setAccount(null)
          setContract(null)
        } else {
          setAccount(accounts[0])
        }
      }

      const handleChainChanged = (newChainId: string) => {
        // Recargar la página cuando cambie la red
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        //@ts-ignore
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        //@ts-ignore

        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  // Auto-conectar si ya estaba conectado previamente
  useEffect(() => {
    const initializeWallet = async () => {
      if (typeof window === 'undefined') {
        setIsInitialized(true)
        return
      }

      if (typeof window.ethereum === 'undefined') {
        setIsInitialized(true)
        return
      }

      try {
        // Verificar si había conexión previa
        const wasConnected = localStorage.getItem('walletConnected')
        if (!wasConnected) {
          setIsInitialized(true)
          return
        }

        // Verificar cuentas disponibles
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts && accounts.length > 0) {
          // Reconectar automáticamente
          const newProvider = new BrowserProvider(window.ethereum)
          const signer = await newProvider.getSigner()
          const address = await signer.getAddress()
          const network = await newProvider.getNetwork()

          const chainIdHex = `0x${network.chainId.toString(16)}`

          setProvider(newProvider)
          setAccount(address)
          setChainId(chainIdHex)
          setNetwork(getNetworkByChainId(chainIdHex))
          setIsConnected(true)

          // Crear instancia del contrato
          const contractAddress = getContractAddressByChainId(chainIdHex)
          if (contractAddress) {
            const contractInstance = new Contract(contractAddress, SPEAR_ESCROW_ABI, signer)
            setContract(contractInstance)
          }
        } else {
          // No hay cuentas disponibles, limpiar localStorage
          localStorage.removeItem('walletConnected')
        }
      } catch (err) {
        console.error('Error en inicialización automática:', err)
        localStorage.removeItem('walletConnected')
      } finally {
        setIsInitialized(true)
      }
    }

    initializeWallet()
  }, [])

  return {
    isConnected,
    account,
    chainId,
    network,
    isCorrectNetwork,
    provider,
    contract,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    loading,
    error,
    clearError,
    isInitialized,
  }
}