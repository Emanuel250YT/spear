'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import {
  NETWORKS,
  DEFAULT_NETWORK,
  CONTRACT_ADDRESSES
} from '@/lib/web3/config';
import { SPEAR_ESCROW_ABI } from '@/lib/web3/abi';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  contract: Contract<typeof SPEAR_ESCROW_ABI> | null;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  isInitialized: boolean;
  // Aliases para compatibilidad
  provider: Web3 | null;
  network: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract<typeof SPEAR_ESCROW_ABI> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [chainId, setChainId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const clearError = () => {
    setError(null);
  };

  // Initialize Web3 and Contract when account and network are correct
  useEffect(() => {
    const initializeContract = async () => {
      if (web3 && account && isCorrectNetwork) {
        try {
          const contractInstance = new web3.eth.Contract(
            SPEAR_ESCROW_ABI,
            CONTRACT_ADDRESSES.POLKADOT_HUB
          );
          setContract(contractInstance);
          console.log('✅ Contrato inicializado:', CONTRACT_ADDRESSES.POLKADOT_HUB);
        } catch (err) {
          console.error('Error inicializando contrato:', err);
          setError('Error al inicializar el contrato');
        }
      } else {
        setContract(null);
      }
    };

    initializeContract();
  }, [web3, account, isCorrectNetwork]);

  // Initialize without auto-connecting
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Listen to account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          console.log('🔄 Cuenta cambiada:', accounts[0]);
        }
      };

      const handleChainChanged = (newChainId: string) => {
        setChainId(newChainId);
        setIsCorrectNetwork(true); // Aceptar cualquier red
        console.log('🔄 Red cambiada:', newChainId);
        // Reload the page as recommended by MetaMask
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [account]);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      // Detectar provider disponible
      let provider = null;
      
      // Prioridad: SubWallet > Talisman > MetaMask
      if ((window as any).SubWallet) {
        provider = (window as any).SubWallet;
        console.log('🦊 Usando SubWallet');
      } else if ((window as any).talismanEth) {
        provider = (window as any).talismanEth;
        console.log('🌟 Usando Talisman');
      } else if (window.ethereum) {
        provider = window.ethereum;
        console.log('🦊 Usando wallet detectada');
      } else {
        throw new Error('Por favor instala una wallet (SubWallet, Talisman o MetaMask)');
      }

      const web3Instance = new Web3(provider);

      // Request account access
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      }) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('No se pudo obtener la cuenta');
      }

      // Get current chain ID
      const currentChainId = await web3Instance.eth.getChainId();
      const chainIdHex = '0x' + currentChainId.toString(16);

      setWeb3(web3Instance);
      setAccount(accounts[0]);
      setChainId(chainIdHex);
      setIsConnected(true);
      setIsCorrectNetwork(true); // Aceptar cualquier red

      console.log('✅ Wallet conectada:', accounts[0]);
      console.log('🌐 Chain ID:', chainIdHex);

    } catch (err: any) {
      console.error('Error conectando wallet:', err);
      setError(err.message || 'Error al conectar la wallet');
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setContract(null);
    setIsConnected(false);
    setIsCorrectNetwork(false);
    setChainId(null);
    setError(null);
    console.log('👋 Wallet desconectada');
  };

  const switchNetwork = async () => {
    if (!window.ethereum) {
      throw new Error('No se detectó ninguna wallet');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: DEFAULT_NETWORK.chainId }],
      });

      setIsCorrectNetwork(true);
      console.log('✅ Red cambiada exitosamente');

    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [DEFAULT_NETWORK],
          });

          setIsCorrectNetwork(true);
          console.log('✅ Red agregada y cambiada exitosamente');

        } catch (addError) {
          console.error('Error agregando la red:', addError);
          throw new Error('No se pudo agregar la red Polkadot Asset Hub');
        }
      } else {
        console.error('Error cambiando de red:', switchError);
        throw switchError;
      }
    }
  };

  const value: Web3ContextType = {
    web3,
    account,
    contract,
    isConnected,
    isCorrectNetwork,
    chainId,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    loading,
    error,
    clearError,
    isInitialized,
    // Aliases para compatibilidad
    provider: web3,
    network: chainId,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
