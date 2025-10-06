'use client'

import { useState, useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { AppverseFooter } from '@/components/appverse-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useWeb3 } from '@/hooks/useWeb3'
import { useSpearContract } from '@/hooks/useSpearContract'
import { ProtectionType, formatProjectStatus, formatProtectionType, type ProjectDetails, DEFAULT_NETWORK } from '@/lib/web3/config'
import {
  Wallet,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  FileText,
  Zap,
  Shield,
  Network,
  Loader2
} from 'lucide-react'

export default function TestPage() {
  const {
    isConnected,
    account,
    chainId,
    isCorrectNetwork,
    connectWallet,
    switchNetwork,
    loading: web3Loading,
    error: web3Error,
    provider
  } = useWeb3()

  const {
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
    loading: contractLoading,
    error: contractError,
    clearError
  } = useSpearContract()

  // Helper function para convertir Wei a PAS
  const formatWeiToEther = (wei: bigint): string => {
    if (!provider) return '0'
    return provider.utils.fromWei(wei.toString(), 'ether')
  }

  // Estados para formularios
  const [projectForm, setProjectForm] = useState({
    description: '',
    milestones: '',
    riskFund: '0',
    protection: ProtectionType.Basic
  })

  const [projectId, setProjectId] = useState('')
  const [developerAddress, setDeveloperAddress] = useState('')
  const [milestoneIndex, setMilestoneIndex] = useState('')
  const [cancelReason, setCancelReason] = useState('')

  // Estados para datos
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null)
  const [projectApplicants, setProjectApplicants] = useState<string[]>([])
  const [projectCounter, setProjectCounter] = useState(0)
  const [developerActiveProjects, setDeveloperActiveProjects] = useState(0)
  const [platformBalance, setPlatformBalance] = useState('0')

  // Cargar datos iniciales
  useEffect(() => {
    if (isConnected && isCorrectNetwork) {
      loadInitialData()
    }
  }, [isConnected, isCorrectNetwork])

  const loadInitialData = async () => {
    try {
      const counter = await getProjectCounter()
      setProjectCounter(counter)

      const balance = await getPlatformBalance()
      setPlatformBalance(balance)

      if (account) {
        const activeProjects = await getDeveloperActiveProjects(account)
        setDeveloperActiveProjects(activeProjects)
      }
    } catch (error) {
      console.error('Error cargando datos iniciales:', error)
    }
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const milestoneAmounts = projectForm.milestones.split(',').map(m => m.trim())
      await createProject({
        description: projectForm.description,
        milestoneAmounts,
        riskFund: projectForm.riskFund,
        protection: projectForm.protection
      })

      // Limpiar formulario y recargar datos
      setProjectForm({
        description: '',
        milestones: '',
        riskFund: '0',
        protection: ProtectionType.Basic
      })
      await loadInitialData()
      alert('¡Proyecto creado exitosamente!')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleLoadProject = async () => {
    if (!projectId) return

    try {
      const details = await getProjectDetails(Number(projectId))
      setProjectDetails(details)

      const applicants = await getProjectApplicants(Number(projectId))
      setProjectApplicants(applicants)
    } catch (error) {
      console.error('Error cargando proyecto:', error)
    }
  }

  const handleApplyToProject = async () => {
    if (!projectId) return

    try {
      await applyToProject(Number(projectId))
      await handleLoadProject() // Recargar datos
      alert('¡Aplicación enviada exitosamente!')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleApproveDeveloper = async () => {
    if (!projectId || !developerAddress) return

    try {
      await approveDeveloper(Number(projectId), developerAddress)
      await handleLoadProject()
      alert('¡Developer aprobado exitosamente!')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCompleteMilestone = async () => {
    if (!projectId || !milestoneIndex) return

    try {
      await completeMilestone(Number(projectId), Number(milestoneIndex))
      await handleLoadProject()
      alert('¡Milestone completado exitosamente!')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCancelProject = async () => {
    if (!projectId || !cancelReason) return

    try {
      await cancelProject(Number(projectId), cancelReason)
      await handleLoadProject()
      alert('Proyecto cancelado')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const isLoading = web3Loading || contractLoading

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-blue-200">Spear Contract</span> Testing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interfaz completa para probar todas las funcionalidades del contrato inteligente de Spear
            </p>
          </div>

          {/* Estado de conexión */}
          <Card className="mb-8 bg-white/5 border-white/10 animate-fade-in-up animate-delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Network className="w-5 h-5" />
                Estado de Conexión
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <div className="text-center">
                  <Alert className="mb-4 border-orange-200/20 bg-orange-200/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-orange-200">
                      Conecta tu wallet para interactuar con el contrato
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={connectWallet}
                    disabled={isLoading}
                    className="bg-blue-200 hover:bg-blue-300 text-black"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {isLoading ? 'Conectando...' : 'Conectar Wallet'}
                  </Button>
                </div>
              ) : !isCorrectNetwork ? (
                <div className="text-center">
                  <Alert className="mb-4 border-red-200/20 bg-red-200/10">
                    <AlertCircle className="h-4 h-4" />
                    <AlertDescription className="text-red-200">
                      Red incorrecta. Necesitas estar en Polkadot Asset Hub TestNet.
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={switchNetwork}
                    disabled={isLoading}
                    className="bg-red-200 hover:bg-red-300 text-black"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Cambiar a Polkadot Asset Hub
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-400">Cuenta</p>
                    <p className="text-blue-200 font-mono text-sm">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Network className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-400">Red</p>
                    <p className="text-blue-200">{DEFAULT_NETWORK.chainName || 'Desconocida'}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm text-gray-400">Proyectos Totales</p>
                    <p className="text-blue-200 font-bold">{projectCounter}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-400">Balance Plataforma</p>
                    <p className="text-blue-200 font-bold">{platformBalance} PAS</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Errores */}
          {(web3Error || contractError) && (
            <Alert className="mb-8 border-red-200/20 bg-red-200/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-200">
                {web3Error || contractError}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="ml-2 text-red-200 hover:text-red-100"
                >
                  Cerrar
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Tabs principales */}
          {isConnected && isCorrectNetwork && (
            <Tabs defaultValue="create" className="animate-fade-in-up animate-delay-400">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
                <TabsTrigger value="create" className="data-[state=active]:bg-blue-200/20">
                  Crear Proyecto
                </TabsTrigger>
                <TabsTrigger value="manage" className="data-[state=active]:bg-blue-200/20">
                  Gestionar Proyecto
                </TabsTrigger>
                <TabsTrigger value="developer" className="data-[state=active]:bg-blue-200/20">
                  Acciones Developer
                </TabsTrigger>
                <TabsTrigger value="view" className="data-[state=active]:bg-blue-200/20">
                  Ver Datos
                </TabsTrigger>
              </TabsList>

              {/* Tab: Crear Proyecto */}
              <TabsContent value="create" className="mt-8">
                {/* Aviso sobre funcionalidad de escrow */}
                <Alert className="mb-6 border-blue-200/20 bg-blue-200/10">
                  <AlertCircle className="h-4 w-4 text-blue-200" />
                  <AlertDescription className="text-blue-200">
                    <strong>Escrow Simple:</strong> Usa el contrato Storage desplegado como sistema de escrow. Almacena datos del proyecto y envía fondos para crear un escrow funcional.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <FileText className="w-5 h-5" />
                        Crear Escrow Simple
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Usa el contrato Storage como sistema de escrow
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateProject} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            ID del Proyecto (número)
                          </label>
                          <Input
                            type="number"
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            placeholder="123"
                            required
                            className="bg-white/5 border-white/10 text-white"
                          />
                          <p className="text-sm text-gray-400 mt-1">
                            Se almacenará en el contrato Storage
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Monto del Escrow (PAS)
                          </label>
                          <Input
                            type="number"
                            step="0.001"
                            value={projectForm.riskFund}
                            onChange={(e) => setProjectForm({ ...projectForm, riskFund: e.target.value })}
                            placeholder="0.1"
                            required
                            className="bg-white/5 border-white/10 text-white"
                          />
                          <p className="text-sm text-gray-400 mt-1">
                            Fondos que se enviarán al contrato
                          </p>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-blue-200 hover:bg-blue-300 text-black"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Creando Escrow...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Crear Escrow
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5" />
                        Completar Escrow
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Marcar el escrow como completado (código 999)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={async () => {
                          try {
                            await createProject({
                              description: '999',
                              milestoneAmounts: ['0'],
                              riskFund: '0',
                              protection: ProtectionType.Basic
                            })
                            alert('✅ Escrow marcado como completado!')
                          } catch (error) {
                            console.error('Error:', error)
                          }
                        }}
                        disabled={isLoading}
                        className="w-full bg-green-200 hover:bg-green-300 text-black"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completar Escrow (999)
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tab: Gestionar Proyecto */}
              <TabsContent value="manage" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Cargar Proyecto</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={projectId}
                          onChange={(e) => setProjectId(e.target.value)}
                          placeholder="ID del proyecto"
                          className="bg-white/5 border-white/10 text-white"
                        />
                        <Button
                          onClick={handleLoadProject}
                          disabled={!projectId || isLoading}
                          className="bg-blue-200 hover:bg-blue-300 text-black"
                        >
                          Cargar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Aprobar Developer</CardTitle>
                      <CardDescription className="text-gray-400">
                        Solo el cliente puede aprobar a un developer
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        value={developerAddress}
                        onChange={(e) => setDeveloperAddress(e.target.value)}
                        placeholder="Dirección del developer"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <Button
                        onClick={handleApproveDeveloper}
                        disabled={!projectId || !developerAddress || isLoading}
                        className="w-full bg-green-200 hover:bg-green-300 text-black"
                      >
                        Aprobar Developer
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Confirmar Inicio</CardTitle>
                      <CardDescription className="text-gray-400">
                        Ambas partes deben confirmar para iniciar el proyecto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={async () => {
                          if (!projectId) return
                          try {
                            await confirmProjectStart(Number(projectId))
                            await handleLoadProject()
                            alert('¡Inicio confirmado!')
                          } catch (error) {
                            console.error('Error:', error)
                          }
                        }}
                        disabled={!projectId || isLoading}
                        className="w-full bg-blue-200 hover:bg-blue-300 text-black"
                      >
                        Confirmar Inicio del Proyecto
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Card destacada para ver contrato */}
                <Card className="mt-8 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-blue-400/50 shadow-2xl">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-blue-500/30 rounded-full">
                        <Shield className="w-12 h-12 text-blue-200" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">Contrato Inteligente Desplegado</CardTitle>
                    <CardDescription className="text-gray-300">Verificado en Polkadot Hub TestNet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-black/30 p-4 rounded-lg border border-blue-400/30">
                        <p className="text-sm text-gray-400 mb-2 text-center">Dirección del Contrato</p>
                        <p className="text-blue-200 font-mono text-center text-lg font-bold break-all">
                          0xd3D22146602588336B203B2232303Eb813d8befb
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <Button
                          onClick={() => window.open('https://blockscout-passet-hub.parity-testnet.parity.io/address/0xd3D22146602588336B203B2232303Eb813d8befb', '_blank')}
                          className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                          <Network className="w-6 h-6 mr-3" />
                          Abrir en Block Explorer
                        </Button>
                        
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText('0xd3D22146602588336B203B2232303Eb813d8befb')
                            alert('✅ Dirección copiada al portapapeles')
                          }}
                          variant="outline"
                          className="w-full h-12 border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 font-semibold"
                        >
                          📋 Copiar Dirección
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Detalles del proyecto */}
                {projectDetails && (
                  <Card className="mt-8 bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Detalles del Proyecto #{projectId}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-400">Estado</p>
                          <Badge variant="outline" className="border-blue-200/50 text-blue-200">
                            {formatProjectStatus(projectDetails.status)}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Protección</p>
                          <p className="text-white">{formatProtectionType(projectDetails.protection)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Monto Total</p>
                          <p className="text-white font-mono">{formatWeiToEther(projectDetails.totalAmount)} PAS</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Cliente</p>
                          <p className="text-blue-200 font-mono text-sm">
                            {projectDetails.client.slice(0, 6)}...{projectDetails.client.slice(-4)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Developer</p>
                          <p className="text-blue-200 font-mono text-sm">
                            {projectDetails.developer === '0x0000000000000000000000000000000000000000'
                              ? 'No asignado'
                              : `${projectDetails.developer.slice(0, 6)}...${projectDetails.developer.slice(-4)}`
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Fondo de Riesgo</p>
                          <p className="text-white font-mono">{formatWeiToEther(projectDetails.riskFund)} PAS</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-400 mb-2">Descripción</p>
                        <p className="text-white bg-white/5 p-3 rounded border border-white/10">
                          {projectDetails.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-400 mb-2">Milestones</p>
                        <div className="space-y-2">
                          {projectDetails.milestoneAmounts.map((amount, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/10"
                            >
                              <span className="text-white">Milestone {index + 1}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-mono">{formatWeiToEther(amount)} PAS</span>
                                {projectDetails.milestoneCompleted[index] ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Clock className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-2">Aplicantes ({projectApplicants.length})</p>
                        <div className="space-y-2">
                          {projectApplicants.map((applicant, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/10"
                            >
                              <span className="text-blue-200 font-mono text-sm">
                                {applicant.slice(0, 6)}...{applicant.slice(-4)}
                              </span>
                              {projectDetails.client.toLowerCase() === account?.toLowerCase() && (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setDeveloperAddress(applicant)
                                  }}
                                  className="bg-blue-200 hover:bg-blue-300 text-black"
                                >
                                  Seleccionar
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Tab: Acciones Developer */}
              <TabsContent value="developer" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Aplicar a Proyecto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={handleApplyToProject}
                        disabled={!projectId || isLoading}
                        className="w-full bg-blue-200 hover:bg-blue-300 text-black"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Aplicar al Proyecto #{projectId || 'N/A'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Completar Milestone</CardTitle>
                      <CardDescription className="text-gray-400">
                        El developer marca el milestone como completado
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        type="number"
                        value={milestoneIndex}
                        onChange={(e) => setMilestoneIndex(e.target.value)}
                        placeholder="Índice del milestone (0, 1, 2...)"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <Button
                        onClick={handleCompleteMilestone}
                        disabled={!projectId || !milestoneIndex || isLoading}
                        className="w-full bg-green-200 hover:bg-green-300 text-black"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completar Milestone
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Aprobar Milestone</CardTitle>
                      <CardDescription className="text-gray-400">
                        Cliente o Developer aprueban el milestone completado
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        type="number"
                        value={milestoneIndex}
                        onChange={(e) => setMilestoneIndex(e.target.value)}
                        placeholder="Índice del milestone (0, 1, 2...)"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={async () => {
                            if (!projectId || !milestoneIndex) return
                            try {
                              await approveMilestone(Number(projectId), Number(milestoneIndex), true)
                              await handleLoadProject()
                              alert('¡Milestone aprobado como cliente!')
                            } catch (error) {
                              console.error('Error:', error)
                            }
                          }}
                          disabled={!projectId || !milestoneIndex || isLoading}
                          className="bg-purple-200 hover:bg-purple-300 text-black"
                        >
                          Aprobar (Cliente)
                        </Button>
                        <Button
                          onClick={async () => {
                            if (!projectId || !milestoneIndex) return
                            try {
                              await approveMilestone(Number(projectId), Number(milestoneIndex), false)
                              await handleLoadProject()
                              alert('¡Milestone aprobado como developer!')
                            } catch (error) {
                              console.error('Error:', error)
                            }
                          }}
                          disabled={!projectId || !milestoneIndex || isLoading}
                          className="bg-cyan-200 hover:bg-cyan-300 text-black"
                        >
                          Aprobar (Developer)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-8 bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Cancelar Proyecto</CardTitle>
                    <CardDescription className="text-gray-400">
                      Solo disponible para el cliente del proyecto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Razón de la cancelación..."
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button
                      onClick={handleCancelProject}
                      disabled={!projectId || !cancelReason || isLoading}
                      className="bg-red-200 hover:bg-red-300 text-black"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Cancelar Proyecto
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab: Ver Datos */}
              <TabsContent value="view" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <FileText className="w-5 h-5" />
                        Estadísticas Generales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Total de Proyectos</p>
                        <p className="text-2xl font-bold text-blue-200">{projectCounter}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Balance de la Plataforma</p>
                        <p className="text-2xl font-bold text-green-400">{platformBalance} PAS</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Tus Proyectos Activos</p>
                        <p className="text-2xl font-bold text-purple-400">{developerActiveProjects}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Shield className="w-5 h-5" />
                        Información del Contrato
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Dirección del Contrato</p>
                        <p className="text-sm font-mono text-blue-200 break-all">
                          0xd3D22146602588336B203B2232303Eb813d8befb
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Red</p>
                        <p className="text-blue-200">Polkadot Asset Hub TestNet</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Versión</p>
                        <p className="text-blue-200">Storage (Escrow)</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <DollarSign className="w-5 h-5" />
                        Límites y Comisiones
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Mínimo por Proyecto</p>
                        <p className="text-blue-200">10 PAS</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Máx. Proyectos/Developer</p>
                        <p className="text-blue-200">5 proyectos</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Comisión Básica</p>
                        <p className="text-blue-200">0% (Solo gas)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Comisión Premium</p>
                        <p className="text-blue-200">1-3% (según monto)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Expiración</p>
                        <p className="text-blue-200">7 días</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-8 bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Acciones Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        onClick={loadInitialData}
                        disabled={isLoading}
                        className="bg-blue-200 hover:bg-blue-300 text-black"
                      >
                        <Loader2 className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Recargar Datos
                      </Button>
                      <Button
                        onClick={() => window.open('https://blockscout-passet-hub.parity-testnet.parity.io/address/0xd3D22146602588336B203B2232303Eb813d8befb', '_blank')}
                        variant="outline"
                        className="border-blue-200/50 text-blue-200 hover:bg-blue-200/10"
                      >
                        Ver en Block Explorer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <AppverseFooter />
    </div>
  )
}
