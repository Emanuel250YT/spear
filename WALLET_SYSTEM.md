# Spear - Sistema de Vinculación de Billetera y Login

## 🔗 Sistema de Wallet Integrado

Esta aplicación incluye un sistema completo de autenticación Web3 con soporte tanto para wallets como credenciales tradicionales.

### 🚀 Características Principales

#### **Sistema de Wallet**

- **Conexión automática**: Reconecta la wallet si estaba previamente conectada
- **Detección de red**: Verifica que estés en la red correcta
- **Manejo de errores**: Mensajes claros para errores comunes
- **Persistencia**: Mantiene la conexión entre sesiones
- **Múltiples métodos**: Soporte para MetaMask y wallets compatibles

#### **Componente WalletButton**

- **Estados dinámicos**:
  - 🔄 Cargando (mientras inicializa)
  - 🔗 Conectar Wallet (cuando no está conectada)
  - ⚠️ Red Incorrecta (cuando necesita cambiar de red)
  - ✅ Conectada (con menú desplegable completo)
- **Información completa**: Muestra dirección, red y estado de conexión
- **Acciones rápidas**: Cambiar red, desconectar, ver detalles

#### **Login Administrativo Dual**

- **Tab 1 - Credenciales**: Login tradicional con email/contraseña
- **Tab 2 - Wallet**: Autenticación mediante wallet autorizada
- **Auto-login**: Acceso automático cuando conectas wallet autorizada
- **Seguridad**: Lista de direcciones autorizadas configurable

### 🛠️ Configuración Técnica

#### **Hook useWeb3 Mejorado**

```typescript
const {
  isConnected, // Estado de conexión
  account, // Dirección de la wallet
  chainId, // ID de la red actual
  network, // Información de la red
  isCorrectNetwork, // Verificación de red correcta
  provider, // Provider de ethers.js
  contract, // Instancia del contrato
  connectWallet, // Función para conectar
  disconnectWallet, // Función para desconectar
  switchNetwork, // Función para cambiar red
  loading, // Estado de carga
  error, // Errores actuales
  clearError, // Limpiar errores
  isInitialized, // Estado de inicialización
} = useWeb3();
```

#### **Credenciales de Admin**

```bash
# Credenciales de desarrollo
Email: admin@spear.dev
Password: admin123

# Credenciales legacy
Email: admin@theskitbit.com
Password: 1234
```

#### **Direcciones Autorizadas**

Para agregar wallets administrativas, edita el array en `app/admin/login/page.tsx`:

```typescript
const authorizedAddresses = [
  "0x1234567890123456789012345678901234567890", // Tu wallet
  "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", // Otra wallet
];
```

### 🎯 Uso del Sistema

#### **En Navegación**

El header incluye automáticamente el `WalletButton` que:

- En desktop: Muestra dirección cuando está conectada
- En móvil: Solo muestra ícono de wallet
- Ambos: Menú completo con todas las opciones

#### **En Login Admin**

1. **Método Credenciales**: Usa email/contraseña tradicional
2. **Método Wallet**:
   - Conecta tu wallet
   - Verifica que esté en la red correcta
   - Accede automáticamente si está autorizada

#### **En Desarrollo**

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Compilar contratos
npx hardhat compile
```

### 📁 Archivos del Sistema

```
hooks/
  useWeb3.ts                 # Hook principal de Web3
components/
  ui/
    wallet-button.tsx        # Componente de wallet reutilizable
  site-header.tsx           # Navegación con wallet integrada
app/
  admin/
    login/
      page.tsx              # Login dual (credenciales + wallet)
lib/
  web3/
    config.ts              # Configuración de redes y contratos
    abi.ts                 # ABIs de contratos
```

### 🔒 Seguridad

- **Validación de red**: Solo permite redes configuradas
- **Direcciones autorizadas**: Lista blanca para administradores
- **Persistencia segura**: Tokens de sesión con expiración
- **Manejo de errores**: Sin exposición de información sensible

### 🌐 Redes Soportadas

El sistema está configurado para trabajar con:

- **Hardhat Local** (Chain ID: 31337)
- **Sepolia Testnet** (Chain ID: 11155111)
- **Ethereum Mainnet** (Chain ID: 1)

### 📝 .gitignore Mejorado

El archivo `.gitignore` incluye:

- Archivos de Hardhat (cache, artifacts, deployments)
- Configuraciones de IDE
- Archivos temporales y logs
- Keys privadas y seeds
- Configuraciones locales

### 🚀 Próximos Pasos

1. **Configurar wallets autorizadas** en producción
2. **Implementar backend** para validación de direcciones
3. **Agregar más redes** según necesidades
4. **Mejorar UI/UX** con animaciones adicionales
5. **Implementar roles** de administrador más granulares

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev                # Servidor de desarrollo
npm run build             # Build de producción
npm run start             # Servidor de producción

# Smart Contracts
npx hardhat compile       # Compilar contratos
npx hardhat test          # Ejecutar tests
npx hardhat node          # Red local de desarrollo

# Debugging
npm run lint             # Linter
npm run type-check       # Verificación de tipos
```

¡El sistema está completamente integrado y listo para usar! 🎉
