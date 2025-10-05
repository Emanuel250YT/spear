# 🎯 Spear - Freelance Escrow Platform

Plataforma de escrow descentralizada para freelancers con protección dual y sistema de milestones. Desplegado en Polkadot Hub TestNet para LATIN HACK 2024.

## ✅ Cumple con las Reglas del Hackathon

- **Red**: Despliegue en testnet Paseo de Polkadot
- **Lenguaje**: Solidity ^0.8.28
- **Página /test**: Interfaz obligatoria para probar contratos
- **Integración completa**: Smart contracts como parte central de la solución

## 🚀 Características Principales

### 💼 Sistema de Escrow Avanzado
- **Milestones**: Pagos por hitos completados
- **Protección Dual**: Cliente y developer deben aprobar
- **Fondo de Riesgo**: Protección contra cancelaciones
- **Sistema de Aplicaciones**: Developers aplican a proyectos

### 🔗 Integración Polkadot
- **Testnet Paseo**: Despliegue en Polkadot Hub TestNet
- **Wallets soportadas**: MetaMask, Talisman, SubWallet
- **Explorer integrado**: Enlaces directos al block explorer

### 📱 Interfaz Moderna
- **Next.js 15**: Framework React de última generación
- **Tailwind CSS**: Diseño responsivo y moderno
- **Web3 Integration**: Conexión directa con blockchain

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **UI**: Tailwind CSS + Radix UI
- **Blockchain**: Web3.js + Ethers.js
- **Smart Contracts**: Solidity 0.8.28
- **Build**: Hardhat

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/leocagli/spear-final.git
cd spear-final

# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev
```

## 🌐 Configuración de Red

### Testnet Paseo (Polkadot Hub)
- **Nombre**: Polkadot Hub TestNet
- **Chain ID**: 420420422 (0x1911f0a6)
- **RPC URL**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io
- **Faucet**: https://faucet.polkadot.io/?parachain=1111

### Contratos Desplegados
- **Storage Contract (Spear)**: `0xf90f46345E09Bd8C6c265EdEbFa30269891EC259`
  - [Ver en Explorer](https://blockscout-passet-hub.parity-testnet.parity.io/address/0xf90f46345E09Bd8C6c265EdEbFa30269891EC259)
- **Storage Contract (Tralala)**: `0x5Fcc96e3f54Fa0775b870257Eeb43cD9eFA73f19`
  - [Ver en Explorer](https://blockscout-passet-hub.parity-testnet.parity.io/address/0x5Fcc96e3f54Fa0775b870257Eeb43cD9eFA73f19)

## 🎯 Uso

### 1. Conectar Wallet
- Configura MetaMask con Polkadot Hub TestNet
- Conecta tu cuenta
- Obtén tokens del faucet

### 2. Crear Proyecto
- Define milestones y montos
- Establece fondo de riesgo
- Publica el proyecto

### 3. Gestionar Proyecto
- Revisa aplicaciones de developers
- Aprueba developer
- Confirma inicio del proyecto

### 4. Completar Milestones
- Developer marca milestone como completado
- Ambas partes aprueban
- Fondos se liberan automáticamente

### 5. Probar (Página /test)
- Interfaz completa para testing
- Funciones de escritura y lectura
- Visualización de transacciones

## 🔧 Desarrollo

### Estructura del Proyecto
```
spear-final/
├── app/                    # Next.js app directory
│   ├── test/              # Página de pruebas obligatoria
│   └── ...
├── components/            # Componentes React
├── contracts/             # Smart contracts
│   ├── SpearEscrowV2.sol # Contrato principal (complejo)
│   └── Storage.sol        # Contrato desplegado (simple)
├── scripts/               # Scripts de deployment
│   └── deploy-storage.js  # Deployment con Web3.js
├── hooks/                 # React hooks
├── lib/                   # Utilidades y configuración
└── hardhat.config.js      # Configuración Hardhat
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

### Deployment de Contratos
```bash
# Compilar contratos
npx hardhat compile

# Desplegar en Polkadot Hub TestNet
node scripts/deploy-storage.js
```

## 📋 Contratos

### SpearEscrowV2 (Contrato Principal)
- Sistema completo de escrow
- Milestones con aprobación dual
- Fondo de riesgo personalizable
- Protección premium para empresas
- Sistema de administración

### Storage (Contrato Desplegado)
- Contrato simple para testing
- Funciones store() y retrieve()
- Eventos NumberChanged
- Compatible con Polkadot Hub TestNet

**Nota**: Debido a limitaciones de Polkadot Hub TestNet, se desplegó el contrato Storage simple. El contrato completo SpearEscrowV2 está disponible para deployment en otras redes EVM.

## 🎨 Características del Contrato Principal

### Sistema de Proyectos
- Estados: Open, Pending, InProgress, Completed, Cancelled, Disputed
- Protección: Basic (0%) y Premium (0.5% para 15k+)
- Expiración automática: 7 días
- Máximo 5 proyectos activos por developer

### Fondo de Riesgo
- Definido por el cliente al crear proyecto
- Se libera al developer si el cliente cancela
- Protección contra cancelaciones arbitrarias

### Sistema de Aprobación Dual
- Ambas partes deben confirmar inicio
- Ambas partes deben aprobar milestones
- Mayor seguridad para ambas partes

### Administración
- Múltiples administradores
- Liberación de fondos en disputas
- Gestión de balance de plataforma

## 🚀 Deploy en Producción

### Vercel (Recomendado)
```bash
npm run build
# Conectar con Vercel
```

### Variables de Entorno
```env
NEXT_PUBLIC_POLKADOT_RPC=https://testnet-passet-hub-eth-rpc.polkadot.io
NEXT_PUBLIC_CONTRACT_ADDRESS=0xf90f46345E09Bd8C6c265EdEbFa30269891EC259
```

## 📚 Documentación Adicional

- [Polkadot Documentation](https://docs.polkadot.network/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [Hardhat Documentation](https://hardhat.org/docs)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🏆 Hackathon LATIN HACK 2024

Desarrollado para el hackathon LATIN HACK 2024, cumpliendo con todos los requisitos:
- ✅ Smart contracts en testnet Paseo
- ✅ Solidity ^0.8.28
- ✅ Página /test obligatoria
- ✅ Integración completa con Polkadot
- ✅ Documentación completa
- ✅ Deployment real con Web3.js

---

**¡Escrow descentralizado para freelancers en Polkadot!** 🚀
