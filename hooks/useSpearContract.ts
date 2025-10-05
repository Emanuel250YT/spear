'use client'

import { useState, useCallback } from 'react'
import { useWeb3 } from './useWeb3'
import {
  type ProjectDetails,
  type CreateProjectParams,
  ProtectionType,
  ProjectStatus,
} from '@/lib/web3/config'

interface UseSpearContractReturn {
  createProject: (params: CreateProjectParams) => Promise<void>
  applyToProject: (projectId: number) => Promise<void>
  approveDeveloper: (projectId: number, developer: string) => Promise<void>
  confirmProjectStart: (projectId: number) => Promise<void>
  completeMilestone: (projectId: number, milestone: number) => Promise<void>
  approveMilestone: (projectId: number, milestone: number, isClient: boolean) => Promise<void>
  cancelProject: (projectId: number, reason: string) => Promise<void>
  getProjectDetails: (projectId: number) => Promise<ProjectDetails | null>
  getProjectApplicants: (projectId: number) => Promise<string[]>
  getProjectCounter: () => Promise<number>
  getDeveloperActiveProjects: (developer: string) => Promise<number>
  getPlatformBalance: () => Promise<string>
  loading: boolean
  error: string | null
  clearError: () => void
}

export function useSpearContract(): UseSpearContractReturn {
  const { contract, account, isConnected, isCorrectNetwork, provider } = useWeb3()
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
      throw new Error('Red incorrecta. Cambia a Polkadot Asset Hub TestNet.')
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

      if (!provider) throw new Error('Provider no disponible')

      const milestoneAmountsWei = params.milestoneAmounts.map(amount =>
        provider.utils.toWei(amount, 'ether')
      )
      const riskFundWei = provider.utils.toWei(params.riskFund, 'ether')

      const totalValue = milestoneAmountsWei.reduce((acc, amount) =>
        BigInt(acc) + BigInt(amount), BigInt(0)
      ) + BigInt(riskFundWei)

      const tx = await contract!.methods.createProject(
        params.description,
        milestoneAmountsWei,
        riskFundWei,
        params.protection
      ).send({
        from: account,
        value: totalValue.toString(),
        gas: 3000000
      })

      console.log('Proyecto creado:', tx)
    } catch (err: any) {
      console.error('Error creando proyecto:', err)
      setError(err.message || 'Error creando proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, provider, validateConnection])

  const applyToProject = useCallback(async (projectId: number) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.methods.applyToProject(projectId).send({
        from: account,
        gas: 300000
      })
      console.log('Aplicacion enviada:', tx)
    } catch (err: any) {
      console.error('Error aplicando al proyecto:', err)
      setError(err.message || 'Error aplicando al proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const approveDeveloper = useCallback(async (projectId: number, developer: string) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.methods.approveDeveloper(projectId, developer).send({
        from: account,
        gas: 500000
      })
      console.log('Developer aprobado:', tx)
    } catch (err: any) {
      console.error('Error aprobando developer:', err)
      setError(err.message || 'Error aprobando developer')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const confirmProjectStart = useCallback(async (projectId: number) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.methods.confirmProjectStart(projectId).send({
        from: account,
        gas: 300000
      })
      console.log('Inicio de proyecto confirmado:', tx)
    } catch (err: any) {
      console.error('Error confirmando inicio:', err)
      setError(err.message || 'Error confirmando inicio del proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const completeMilestone = useCallback(async (projectId: number, milestone: number) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.methods.completeMilestone(projectId, milestone).send({
        from: account,
        gas: 500000
      })
      console.log('Milestone completado:', tx)
    } catch (err: any) {
      console.error('Error completando milestone:', err)
      setError(err.message || 'Error completando milestone')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const approveMilestone = useCallback(async (projectId: number, milestone: number, isClient: boolean) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.methods.approveMilestone(projectId, milestone, isClient).send({
        from: account,
        gas: 500000
      })
      console.log('Milestone aprobado:', tx)
    } catch (err: any) {
      console.error('Error aprobando milestone:', err)
      setError(err.message || 'Error aprobando milestone')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const cancelProject = useCallback(async (projectId: number, reason: string) => {
    try {
      setLoading(true)
      setError(null)
      validateConnection()

      const tx = await contract!.methods.cancelProject(projectId, reason).send({
        from: account,
        gas: 500000
      })
      console.log('Proyecto cancelado:', tx)
    } catch (err: any) {
      console.error('Error cancelando proyecto:', err)
      setError(err.message || 'Error cancelando proyecto')
      throw err
    } finally {
      setLoading(false)
    }
  }, [contract, account, validateConnection])

  const getProjectDetails = useCallback(async (projectId: number): Promise<ProjectDetails | null> => {
    try {
      if (!contract) return null

      const project = await contract.methods.projects(projectId).call()

      return {
        client: project.client,
        developer: project.developer,
        totalAmount: BigInt(project.totalAmount),
        riskFund: BigInt(project.riskFund),
        milestoneAmounts: project.milestoneAmounts.map((amount: any) => BigInt(amount)),
        milestoneCompleted: project.milestoneCompleted,
        protection: Number(project.protection) as ProtectionType,
        status: Number(project.status) as ProjectStatus,
        createdAt: BigInt(project.createdAt),
        expiresAt: BigInt(project.expiresAt),
        description: project.description,
      }
    } catch (err: any) {
      console.error('Error obteniendo detalles del proyecto:', err)
      return null
    }
  }, [contract])

  const getProjectApplicants = useCallback(async (projectId: number): Promise<string[]> => {
    try {
      if (!contract) return []
      const applicants = await contract.methods.getProjectApplicants(projectId).call()
      return applicants
    } catch (err: any) {
      console.error('Error obteniendo aplicantes:', err)
      return []
    }
  }, [contract])

  const getProjectCounter = useCallback(async (): Promise<number> => {
    try {
      if (!contract) return 0
      const counter = await contract.methods.projectCounter().call()
      return Number(counter)
    } catch (err: any) {
      console.error('Error obteniendo contador de proyectos:', err)
      return 0
    }
  }, [contract])

  const getDeveloperActiveProjects = useCallback(async (developer: string): Promise<number> => {
    try {
      if (!contract) return 0
      const count = await contract.methods.developerActiveProjects(developer).call()
      return Number(count)
    } catch (err: any) {
      console.error('Error obteniendo proyectos activos del developer:', err)
      return 0
    }
  }, [contract])

  const getPlatformBalance = useCallback(async (): Promise<string> => {
    try {
      if (!contract || !provider) return '0'
      const balance = await contract.methods.platformBalance().call()
      return provider.utils.fromWei(balance, 'ether')
    } catch (err: any) {
      console.error('Error obteniendo balance de la plataforma:', err)
      return '0'
    }
  }, [contract, provider])

  return {
    createProject,
    applyToProject,
    approveDeveloper,
    confirmProjectStart,
    completeMilestone,
    approveMilestone,
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
