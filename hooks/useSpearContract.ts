'use client'

import { useState, useCallback } from 'react'
import { useWeb3 } from './useWeb3'
import {
  type ProjectDetails,
  type CreateProjectParams,
  ProtectionType,
  ProjectStatus,
  formatProjectStatus,
  formatProtectionType
} from '@/lib/web3/config'

interface UseSpearContractReturn {
  // Funciones del contrato
  createProject: (params: CreateProjectParams) => Promise<void>
  applyToProject: (projectId: number) => Promise<void>
  approveDeveloper: (projectId: number, developer: string) => Promise<void>
  completeMilestone: (projectId: number, milestone: number) => Promise<void>
  cancelProject: (projectId: number, reason: string) => Promise<void>

  // Funciones de consulta
  getProjectDetails: (projectId: number) => Promise<ProjectDetails | null>
  getProjectApplicants: (projectId: number) => Promise<string[]>
  getProjectCounter: () => Promise<number>
  getDeveloperActiveProjects: (developer: string) => Promise<number>
  getPlatformBalance: () => Promise<string>

  // Estado
  loading: boolean
  error: string | null
  clearError: () => void
}

export function useSpearContract(): UseSpearContractReturn {
  const { contract, account, isConnected, isCorrectNetwork } = useWeb3()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const validateConnection = useCallback(() => {
    if (!isConnected) {
      throw new Error('Wallet no conectado')
    }
    if (!isCorrectNetwork) {
      throw new Error('Red incorrecta. Cambia a Sepolia Testnet.')
    }
    if (!contract) {
      throw new Error('Contrato no disponible')
    }
    if (!account) {
      throw new Error('Cuenta no disponible')
    }
  }, [isConnected, isCorrectNetwork, contract, account])

  const createProject = useCallback(async (params: CreateProjectParams) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      //@ts-ignore
      const web3 = (await import('web3')).Web3
      const w3 = new web3()
      const milestoneAmountsWei = params.milestoneAmounts.map(amount => w3.utils.toWei(amount, 'ether'))
      const riskFundWei = w3.utils.toWei(params.riskFund, 'ether')
      const totalValue = milestoneAmountsWei.reduce((acc, amount) => BigInt(acc) + BigInt(amount), BigInt(0)) + BigInt(riskFundWei)

      await contract!.methods.createProject(
        params.description,
        milestoneAmountsWei,
        riskFundWei
      ).send({ from: account, value: totalValue.toString() })

    } catch (err: any) {
      console.error('Error creando proyecto:', err)
      setError(err.message || 'Error creando proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const applyToProject = useCallback(async (projectId: number) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.applyToProject(projectId)
      await tx.wait()
    } catch (err: any) {
      console.error('Error aplicando al proyecto:', err)
      setError(err.reason || err.message || 'Error aplicando al proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, validateConnection])

  const approveDeveloper = useCallback(async (projectId: number, developer: string) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.approveDeveloper(projectId, developer)
      await tx.wait()
    } catch (err: any) {
      console.error('Error aprobando developer:', err)
      setError(err.reason || err.message || 'Error aprobando developer')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, validateConnection])

  const completeMilestone = useCallback(async (projectId: number, milestone: number) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.completeMilestone(projectId, milestone)
      await tx.wait()
    } catch (err: any) {
      console.error('Error completando milestone:', err)
      setError(err.reason || err.message || 'Error completando milestone')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, validateConnection])

  const cancelProject = useCallback(async (projectId: number, reason: string) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.cancelProject(projectId, reason)
      await tx.wait()
    } catch (err: any) {
      console.error('Error cancelando proyecto:', err)
      setError(err.reason || err.message || 'Error cancelando proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, validateConnection])

  const getProjectDetails = useCallback(async (projectId: number): Promise<ProjectDetails | null> => {
    try {
      if (!contract) return null

      const details = await contract.getProjectDetails(projectId)

      return {
        client: details[0],
        developer: details[1],
        totalAmount: details[2],
        riskFund: details[3],
        milestoneAmounts: details[4],
        milestoneCompleted: details[5],
        protection: details[6],
        status: details[7],
        createdAt: details[8],
        expiresAt: details[9],
        description: details[10],
      }
    } catch (err: any) {
      console.error('Error obteniendo detalles del proyecto:', err)
      return null
    }
  }, [contract])

  const getProjectApplicants = useCallback(async (projectId: number): Promise<string[]> => {
    try {
      if (!contract) return []
      return await contract.getProjectApplicants(projectId)
    } catch (err: any) {
      console.error('Error obteniendo aplicantes:', err)
      return []
    }
  }, [contract])

  const getProjectCounter = useCallback(async (): Promise<number> => {
    try {
      if (!contract) return 0
      const counter = await contract.projectCounter()
      return Number(counter)
    } catch (err: any) {
      console.error('Error obteniendo contador de proyectos:', err)
      return 0
    }
  }, [contract])

  const getDeveloperActiveProjects = useCallback(async (developer: string): Promise<number> => {
    try {
      if (!contract) return 0
      const count = await contract.developerActiveProjects(developer)
      return Number(count)
    } catch (err: any) {
      console.error('Error obteniendo proyectos activos del developer:', err)
      return 0
    }
  }, [contract])

  const getPlatformBalance = useCallback(async (): Promise<string> => {
    try {
      if (!contract) return '0'
      const balance = await contract.platformBalance()
      return formatEther(balance)
    } catch (err: any) {
      console.error('Error obteniendo balance de la plataforma:', err)
      return '0'
    }
  }, [contract])

  return {
    createProject,
    applyToProject,
    approveDeveloper,
    completeMilestone,
    cancelProject,
    getProjectDetails,
    getProjectApplicants,
    getProjectCounter,
    getDeveloperActiveProjects,
    getPlatformBalance,
    loading,
    error,
    clearError,
  }
}