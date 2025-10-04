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
import { ProtectionType, formatProjectStatus, formatProtectionType, type ProjectDetails } from '@/lib/web3/config'
import { formatEther } from 'ethers'
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
    network,
    isCorrectNetwork,
    connectWallet,
    switchNetwork,
    loading: web3Loading,
    error: web3Error
  } = useWeb3()

  const {
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
    loading: contractLoading,
    error: contractError,
    clearError
  } = useSpearContract()

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
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-200">
                      Red incorrecta. Necesitas estar en Sepolia Testnet.
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={switchNetwork}
                    disabled={isLoading}
                    className="bg-red-200 hover:bg-red-300 text-black"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Cambiar a Sepolia
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
                    <p className="text-blue-200">{network?.chainName || 'Desconocida'}</p>
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
                    <p className="text-blue-200 font-bold">{platformBalance} ETH</p>
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
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <FileText className="w-5 h-5" />
                      Crear Nuevo Proyecto
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Crea un proyecto con milestones y fondo de riesgo opcional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateProject} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Descripción del Proyecto
                        </label>
                        <Textarea
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="Describe tu proyecto..."
                          required
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Milestones (ETH, separados por comas)
                        </label>
                        <Input
                          value={projectForm.milestones}
                          onChange={(e) => setProjectForm({ ...projectForm, milestones: e.target.value })}
                          placeholder="0.1,0.2,0.3"
                          required
                          className="bg-white/5 border-white/10 text-white"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          Ejemplo: 0.1,0.2,0.3 para tres milestones
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Fondo de Riesgo (ETH)
                        </label>
                        <Input
                          type="number"
                          step="0.001"
                          value={projectForm.riskFund}
                          onChange={(e) => setProjectForm({ ...projectForm, riskFund: e.target.value })}
                          placeholder="0.0"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Tipo de Protección
                        </label>
                        <Select
                          value={projectForm.protection.toString()}
                          onValueChange={(value) => setProjectForm({ ...projectForm, protection: Number(value) as ProtectionType })}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10">
                            <SelectItem value="0">Básica (0% comisión)</SelectItem>
                            <SelectItem value="1">Premium (1-3% comisión)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-200 hover:bg-blue-300 text-black"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creando...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Crear Proyecto
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
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
                </div>

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
                          <p className="text-white font-mono">{formatEther(projectDetails.totalAmount)} ETH</p>
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
                          <p className="text-white font-mono">{formatEther(projectDetails.riskFund)} ETH</p>
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
                                <span className="text-white font-mono">{formatEther(amount)} ETH</span>
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
                        <p className="text-2xl font-bold text-green-400">{platformBalance} ETH</p>
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
                          0xeda2FdE00141C5453fBaf3c6856222A289ba3BE6
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Red</p>
                        <p className="text-blue-200">Sepolia Testnet</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Versión</p>
                        <p className="text-blue-200">1.0.0</p>
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
                        <p className="text-blue-200">10 USDT</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Máx. Proyectos/Developer</p>
                        <p className="text-blue-200">5 proyectos</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Comisión Premium</p>
                        <p className="text-blue-200">1-3%</p>
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
                        onClick={() => window.open('https://sepolia.etherscan.io/address/0xeda2FdE00141C5453fBaf3c6856222A289ba3BE6', '_blank')}
                        variant="outline"
                        className="border-blue-200/50 text-blue-200 hover:bg-blue-200/10"
                      >
                        Ver en Etherscan
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