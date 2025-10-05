'use client'

import { useState, useEffect, useCallback } from 'react'
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
  isConnected: boolean
  account: string | null
  chainId: string | null
  network: any
  isCorrectNetwork: boolean
  provider: any
  contract: any
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: () => Promise<void>
  loading: boolean
  error: string | null
  clearError: () => void
  isInitialized: boolean
}

export function useWeb3(): UseWeb3Return {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [network, setNetwork] = useState<any>(null)
  const [provider, setProvider] = useState<any>(null)
  const [contract, setContract] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const isCorrectNetwork = true // Aceptar cualquier red

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
    if (typeof window === 'undefined') return

    try {
      setLoading(true)
      setError(null)

      let provider = null
      if ((window as any).SubWallet) {
        provider = (window as any).SubWallet
      } else if (window.ethereum) {
        provider = window.ethereum
      }

      if (!provider) {
        setError('Instala SubWallet o MetaMask')
        return
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      if (!accounts?.length) throw new Error('No hay cuentas')

      //@ts-ignore
      const Web3 = (await import('web3')).Web3
      const web3 = new Web3(provider)
      const chainId = await web3.eth.getChainId()
      const chainIdHex = `0x${Number(chainId).toString(16)}`
      console.log('Chain ID detectado:', chainIdHex, 'Esperado: 0x1911f0a6')

      setProvider(web3)
      setAccount(accounts[0])
      setChainId(chainIdHex)
      setNetwork(getNetworkByChainId(chainIdHex))
      setIsConnected(true)

      const contractAddress = getContractAddressByChainId(chainIdHex)
      if (contractAddress) {
        const contractInstance = new web3.eth.Contract(SPEAR_ESCROW_ABI, contractAddress)
        setContract(contractInstance)
      }

      localStorage.setItem('walletConnected', 'true')
    } catch (err: any) {
      setError(err.message || 'Error conectando')
      disconnectWallet()
    } finally {
      setLoading(false)
    }
  }, [disconnectWallet])

  const switchNetwork = useCallback(async () => {
    if (!window.ethereum) return

    try {
      setLoading(true)
      setError(null)

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1911f0a6' }],
      })
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x1911f0a6',
            chainName: 'Polkadot Hub TestNet',
            nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
            rpcUrls: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
            blockExplorerUrls: ['https://blockscout-passet-hub.parity-testnet.parity.io']
          }],
        })
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

  useEffect(() => {
    setIsInitialized(true)
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