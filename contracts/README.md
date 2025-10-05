# Spear Smart Contract Integration

## 🚀 Descripción General

Spear utiliza contratos inteligentes en Polkadot Asset Hub TestNet para crear un sistema de escrow descentralizado que protege tanto a clientes como a freelancers. El contrato maneja pagos por milestones, fondos de riesgo y comisiones de forma transparente y automática.

## 📋 Características del Contrato

### ✨ Funcionalidades Principales

- **Escrow Automático**: Los fondos se mantienen seguros hasta completar milestones
- **Pagos por Milestones**: Divide proyectos grandes en pagos progresivos
- **Fondos de Riesgo**: Protección adicional opcional para proyectos
- **Comisiones Flexibles**: Básica (0%) o Premium (1-3%)
- **Sistema de Aplicaciones**: Proceso transparente de selección de developers
- **Expiración Automática**: Proyectos sin asignar expiran en 7 días

### 🔧 Límites y Restricciones

- **Mínimo por proyecto**: 10 PAS
- **Máximo 5 proyectos activos** por developer
- **Máximo 10 milestones** por proyecto
- **Expiración**: 7 días para asignar developer

## 🌐 Configuración de Red

### Polkadot Asset Hub TestNet (Desarrollo y Producción)

- **Chain ID**: `0x190f1b46` (420420422 en decimal)
- **Contrato**: `0xf90f46345E09Bd8C6c265EdEbFa30269891EC259`
- **RPC**: `https://testnet-passet-hub-eth-rpc.polkadot.io`
- **Explorer**: [Blockscout Polkadot Asset Hub](https://blockscout-passet-hub.parity-testnet.parity.io/)
- **Currency**: PAS (18 decimals)

## 🛠️ Uso de la Interfaz de Prueba

### Acceso a `/test`

1. **Conectar Wallet**

   - Instala MetaMask o SubWallet
   - Conecta tu wallet
   - La app agregará automáticamente Polkadot Asset Hub TestNet

2. **Obtener PAS de Prueba**
   - Usa el [faucet de Polkadot](https://faucet.polkadot.io/)
   - Obtén PAS gratuito para pruebas

### 📝 Creando un Proyecto

1. Ve a la pestaña **"Crear Proyecto"**
2. Completa el formulario:
   ```
   Descripción: "Desarrollo de landing page"
   Milestones: "0.1,0.2,0.3" (en PAS)
   Fondo de Riesgo: "0.05" (opcional)
   Protección: Básica o Premium
   ```
3. Confirma la transacción en MetaMask
4. Espera la confirmación en blockchain

### 👨‍💻 Aplicando como Developer

1. Ve a la pestaña **"Acciones Developer"**
2. Ingresa el ID del proyecto
3. Haz clic en **"Aplicar al Proyecto"**
4. Confirma la transacción

### ✅ Aprobando un Developer (Solo Cliente)

1. Ve a la pestaña **"Gestionar Proyecto"**
2. Carga el proyecto con su ID
3. Selecciona un developer de la lista de aplicantes
4. Haz clic en **"Aprobar Developer"**

### 🎯 Completando Milestones (Solo Developer)

1. Ve a la pestaña **"Acciones Developer"**
2. Ingresa el índice del milestone (0, 1, 2...)
3. Haz clic en **"Completar Milestone"**
4. Los fondos se transfieren automáticamente

## 💡 Casos de Uso Comunes

### Proyecto Simple

```solidity
// Cliente crea proyecto de 1 PAS con 3 milestones
createProject("Landing page", [0.3, 0.3, 0.4], 0, Basic)

// Developer aplica
applyToProject(1)

// Cliente aprueba
approveDeveloper(1, "0x...")

// Developer completa milestones uno por uno
completeMilestone(1, 0) // 0.3 PAS liberado
completeMilestone(1, 1) // 0.3 PAS liberado
completeMilestone(1, 2) // 0.4 PAS liberado - Proyecto completado
```

### Proyecto con Fondo de Riesgo

```solidity
// Cliente agrega 0.1 PAS como fondo de riesgo
createProject("App móvil", [0.5, 0.5], 0.1, Premium)

// Si todo va bien, el fondo se devuelve al cliente
// Si hay problemas, puede usarse para compensación
```

## 🔒 Seguridad y Transparencia

### Protecciones Implementadas

- **Fondos en Escrow**: Nunca en manos de terceros
- **Validaciones Estrictas**: Verificación de todos los parámetros
- **Eventos Transparentes**: Todas las acciones se registran en blockchain
- **Límites de Actividad**: Previene spam y abuso

### Estados del Proyecto

- **Open (0)**: Abierto para aplicaciones
- **InProgress (1)**: Con developer asignado
- **Completed (2)**: Todos los milestones completados
- **Cancelled (3)**: Cancelado por el cliente
- **Expired (4)**: Expirado sin asignación

## 🧪 Testing y Desarrollo

### Comandos para Testing

```bash
# Compilar contrato
npx hardhat compile

# Ejecutar tests
npx hardhat test

# Desplegar en red local
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

# Verificar en Blockscout
# El contrato ya está deployado en:
# 0xf90f46345E09Bd8C6c265EdEbFa30269891EC259
```

### Archivos Importantes

```
contracts/
├── SpearEscrow.sol          # Contrato principal
lib/web3/
├── abi.ts                   # ABI del contrato
├── config.ts                # Configuración de redes
hooks/
├── useWeb3.ts               # Hook para conexión Web3
├── useSpearContract.ts      # Hook para interacciones del contrato
app/test/
└── page.tsx                 # Interfaz de prueba completa
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **"Insufficient funds"**

   - Asegúrate de tener suficiente PAS para gas + monto del proyecto

2. **"Project does not exist"**

   - Verifica que el ID del proyecto sea correcto

3. **"Only client can call this function"**

   - Solo el creador del proyecto puede aprobar developers

4. **"Maximum active projects reached"**

   - Un developer no puede tener más de 5 proyectos activos

5. **"Project has expired"**
   - Los proyectos expiran en 7 días si no se asigna developer

### Logs Útiles

```javascript
// Ver eventos del contrato
const filter = contract.filters.ProjectCreated()
const events = await contract.queryFilter(filter)
console.log(events)

// Verificar gas estimado
const gasEstimate = await contract.createProject.estimateGas(...)
console.log("Gas estimado:", gasEstimate.toString())
```

## 📞 Soporte

Para reportar bugs o solicitar funcionalidades:

1. Verifica en [Polkadot Asset Hub Blockscout](https://blockscout.passets.io/address/0xf90f46345E09Bd8C6c265EdEbFa30269891EC259)
2. Revisa los logs de transacciones fallidas
3. Contacta al equipo de desarrollo con detalles específicos

## 🚀 Próximas Características

- [ ] Soporte para múltiples tokens (USDC, USDT)
- [ ] Sistema de reputación on-chain
- [ ] Integración con oráculos de precios
- [ ] Governance token para votaciones
- [ ] Resolución de disputas descentralizada
