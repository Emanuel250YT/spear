# Spear - Sistema de Escrow para Freelancers en Polkadot Asset Hub

## 🌐 Red de Blockchain

El sistema está desplegado en **Polkadot Asset Hub TestNet**:

- **Chain ID:** 420420422 (0x1911f0a6)
- **Moneda:** PAS (Polkadot Asset Symbol)
- **RPC URL:** https://testnet-passet-hub-eth-rpc.polkadot.io
- **Block Explorer:** https://blockscout-passet-hub.parity-testnet.parity.io/
- **Dirección del Contrato:** `0xf90f46345E09Bd8C6c265EdEbFa30269891EC259`

## 🚀 Características del Contrato SpearEscrowV2

### Estados del Proyecto

- **Open (0):** Proyecto abierto para aplicaciones
- **Pending (1):** Developer asignado, esperando confirmación de inicio
- **InProgress (2):** Proyecto en progreso (ambas partes confirmaron)
- **Completed (3):** Proyecto completado exitosamente
- **Cancelled (4):** Proyecto cancelado
- **Expired (5):** Proyecto expirado sin asignación
- **Disputed (6):** En disputa, requiere intervención admin

### Tipos de Protección

- **Basic (0):** Sin comisión de plataforma, solo costos de gas
- **Premium (1):** Comisión de 1-3% según el monto del proyecto (para proyectos de 15k+ USDT)

### Funciones Principales

#### Para Clientes

1. **Crear Proyecto**: Define milestones, fondo de riesgo y tipo de protección
2. **Aprobar Developer**: Selecciona al freelancer para el proyecto
3. **Confirmar Inicio**: Confirma el inicio del proyecto (requerido de ambas partes)
4. **Aprobar Milestones**: Aprueba el trabajo completado
5. **Cancelar Proyecto**: Cancela el proyecto con razón justificada

#### Para Developers

1. **Aplicar a Proyecto**: Postúlate para trabajar en proyectos abiertos
2. **Confirmar Inicio**: Confirma que estás listo para comenzar
3. **Completar Milestone**: Marca un milestone como completado
4. **Aprobar Milestone**: Aprueba tu propio trabajo completado

## 🛠️ Configuración del Proyecto

### Requisitos Previos

- Node.js 18+
- pnpm (recomendado) o npm
- MetaMask, SubWallet u otra wallet compatible con EVM

### Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env y agrega tu PRIVATE_KEY para deployment
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# El servidor estará disponible en http://localhost:3000
```

### Testing del Contrato

Visita `/test` en tu navegador para acceder a la interfaz completa de testing:

```
http://localhost:3000/test
```

## 📝 Uso de la Interfaz de Testing

### 1. Conectar Wallet

- Haz clic en "Conectar Wallet"
- Asegúrate de estar en la red Polkadot Asset Hub TestNet
- Si no está configurada, haz clic en "Cambiar a Polkadot Asset Hub"

### 2. Crear un Proyecto

- Ve a la pestaña "Crear Proyecto"
- Completa:
  - Descripción del proyecto
  - Milestones separados por comas (ej: 0.1,0.2,0.3)
  - Fondo de riesgo opcional
  - Tipo de protección (Basic o Premium)
- Haz clic en "Crear Proyecto"
- Confirma la transacción en tu wallet

### 3. Aplicar a un Proyecto (Como Developer)

- Ve a "Acciones Developer"
- Ingresa el ID del proyecto
- Haz clic en "Aplicar al Proyecto"

### 4. Aprobar Developer (Como Cliente)

- Ve a "Gestionar Proyecto"
- Carga el proyecto por ID
- Ingresa la dirección del developer
- Haz clic en "Aprobar Developer"

### 5. Confirmar Inicio

- Tanto el cliente como el developer deben confirmar
- Haz clic en "Confirmar Inicio del Proyecto"

### 6. Completar y Aprobar Milestones

- El developer marca el milestone como completado
- Ambas partes deben aprobar el milestone
- Los fondos se liberan automáticamente

## 🔧 Deployment del Contrato

### Compilar el Contrato

```bash
npx hardhat compile
```

### Desplegar a Polkadot Asset Hub TestNet

```bash
npx hardhat run scripts/deploy.cjs --network polkadotAssetHub
```

O usa el script específico para Polkadot:

```bash
node scripts/web3-deploy-polkadot.js
```

## 🌐 Configuración de la Red en Hardhat

El archivo `hardhat.config.js` incluye la configuración de Polkadot Asset Hub:

```javascript
networks: {
  polkadotAssetHub: {
    url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
    chainId: 420420422,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  },
}
```

## 📚 Estructura del Código

### Hooks Principales

#### `useWeb3.ts`

- Gestiona la conexión de la wallet
- Detecta cambios de red y cuenta
- Inicializa el contrato Web3.js
- Valida que estés en la red correcta

#### `useSpearContract.ts`

- Proporciona funciones para interactuar con el contrato
- Maneja transacciones y queries
- Gestiona estados de loading y errores

### Configuración

#### `lib/web3/config.ts`

- Define la red de Polkadot Asset Hub
- Contiene la dirección del contrato
- Define enums para estados y tipos
- Funciones helper para formateo

#### `lib/web3/abi.ts`

- ABI completo del contrato SpearEscrowV2
- Define todos los métodos y eventos

## 🔍 Verificación del Contrato

Puedes verificar el contrato en el block explorer:

```
https://blockscout-passet-hub.parity-testnet.parity.io/address/0xf90f46345E09Bd8C6c265EdEbFa30269891EC259
```

## 💡 Tips y Mejores Prácticas

1. **Siempre confirma la red**: Verifica que estés en Polkadot Asset Hub antes de transaccionar
2. **Gas**: Asegúrate de tener suficiente PAS para las transacciones
3. **Testing**: Usa la interfaz `/test` para probar todas las funcionalidades
4. **Fondo de Riesgo**: Define un fondo de riesgo apropiado para proteger a ambas partes
5. **Milestones**: Divide el trabajo en milestones manejables

## 🐛 Solución de Problemas

### Error: "Red incorrecta"

- Haz clic en "Cambiar a Polkadot Asset Hub"
- La red se agregará automáticamente a tu wallet

### Error: "Contrato no disponible"

- Verifica que estés conectado a la wallet
- Asegúrate de estar en la red correcta

### Transacción fallida

- Verifica que tengas suficiente PAS para gas
- Revisa que cumplas con los requisitos (ej: ser el cliente del proyecto)
- Consulta los logs en la consola del navegador

## 📞 Soporte

Para más información sobre Polkadot Asset Hub:

- [Documentación de Polkadot](https://wiki.polkadot.network/)
- [Block Explorer](https://blockscout-passet-hub.parity-testnet.parity.io/)

## 📄 Licencia

MIT
