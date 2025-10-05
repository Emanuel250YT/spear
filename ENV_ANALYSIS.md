# 📋 Análisis de Variables de Entorno - Spear

## ✅ Resumen Ejecutivo

Se han limpiado y unificado los archivos `.env` y `.env.example` eliminando variables obsoletas y dejando solo las que realmente se usan.

## 🔍 Análisis Realizado

### Variables Encontradas en el .env Anterior:

```env
DATABASE_URL="file:./dev.db"
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MAINNET_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=spear_secret_key_2024_super_secure_change_in_production_abc123xyz789
ETHERSCAN_API_KEY=your_etherscan_api_key_here
REPORT_GAS=true
NEXT_PUBLIC_INFURA_API_KEY=b7a627adbb0a41fdb40e053a6bfce882
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=853e9aeed824c6f7c413877159b46bf9
```

### Uso Real en el Código:

#### ✅ **USADAS:**

1. **`PRIVATE_KEY`**
   - **Archivo**: `hardhat.config.js`
   - **Uso**: Para deployar contratos inteligentes
   - **Necesario**: Solo si vas a deployar nuevos contratos
   - **Estado**: ✅ MANTENER

#### ❌ **NO USADAS:**

1. **`DATABASE_URL`**

   - **Razón**: Prisma no está instalado ni configurado
   - **Archivos buscados**: No hay `schema.prisma`
   - **Estado**: ❌ ELIMINAR

2. **`SEPOLIA_URL`**

   - **Razón**: Migrado de Sepolia a Polkadot Asset Hub
   - **Estado**: ❌ ELIMINAR

3. **`MAINNET_URL`**

   - **Razón**: No se usa Ethereum Mainnet
   - **Estado**: ❌ ELIMINAR

4. **`NEXTAUTH_URL` & `NEXTAUTH_SECRET`**

   - **Razón**: NextAuth no está instalado ni configurado
   - **Búsqueda**: No hay imports de `next-auth`
   - **Estado**: ❌ ELIMINAR

5. **`ETHERSCAN_API_KEY`**

   - **Razón**: Se usa Blockscout en Polkadot, no Etherscan
   - **Estado**: ❌ ELIMINAR

6. **`REPORT_GAS`**

   - **Razón**: Configuración opcional de Hardhat, no crítica
   - **Estado**: ❌ ELIMINAR (puede configurarse en hardhat.config.js)

7. **`NEXT_PUBLIC_INFURA_API_KEY`**

   - **Razón**: No se usa Infura, se usa RPC directo de Polkadot
   - **Búsqueda**: Las referencias encontradas son en archivos viejos (`config-v2.ts`)
   - **Estado**: ❌ ELIMINAR

8. **`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`**
   - **Razón**: No se usa WalletConnect v2
   - **Conexión**: Se hace directo con Web3.js y window.ethereum
   - **Estado**: ❌ ELIMINAR

#### ℹ️ **OPCIONALES AGREGADAS:**

1. **`NEXT_PUBLIC_APP_URL`**
   - **Uso**: URL base de la aplicación
   - **Default**: http://localhost:3000
   - **Estado**: ℹ️ OPCIONAL

## 📊 Configuración Actual

### Variables que SÍ están hardcodeadas en el código:

1. **Red de Blockchain**

   - **Archivo**: `lib/web3/config.ts`
   - **Valores**:
     ```typescript
     chainId: "0x190f1b46"; // 420420422
     chainName: "Polkadot Hub TestNet";
     rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"];
     blockExplorerUrls: [
       "https://blockscout-passet-hub.parity-testnet.parity.io",
     ];
     ```

2. **Dirección del Contrato**

   - **Archivo**: `lib/web3/config.ts`
   - **Valor**: `0xf90f46345E09Bd8C6c265EdEbFa30269891EC259`

3. **Configuración de Hardhat**
   - **Archivo**: `hardhat.config.js`
   - **Red**: Polkadot Asset Hub TestNet hardcodeada

## 🗂️ Archivos de Configuración Obsoletos

### Archivos que deberían eliminarse:

```
lib/web3/config-v2.ts          ❌ Versión antigua
lib/web3/config-v2-final.ts    ❌ Versión antigua
```

### Archivo activo:

```
lib/web3/config.ts             ✅ Versión actual (Polkadot)
```

## 📁 Nuevos Archivos Creados

### 1. `.env` (limpio)

```env
# Solo contiene:
PRIVATE_KEY=your_private_key_here_without_0x_prefix
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. `.env.example` (documentado)

- Plantilla completa con explicaciones
- Guía de inicio rápido
- Lista de variables obsoletas
- Referencias a documentación

### 3. `.env.backup`

- Copia del .env anterior por seguridad

## 🎯 Recomendaciones

### Inmediatas:

1. ✅ Usar el nuevo `.env` limpio
2. ✅ Eliminar archivos de config viejos:
   ```powershell
   Remove-Item "lib/web3/config-v2.ts"
   Remove-Item "lib/web3/config-v2-final.ts"
   ```

### Futuras (si se necesitan):

- **Database**: Si agregas Prisma → agregar `DATABASE_URL`
- **Auth**: Si agregas NextAuth → agregar `NEXTAUTH_*`
- **Analytics**: Si cambias de Vercel Analytics → agregar variables según el servicio

## 📝 Checklist de Migración

- [x] Analizar uso de variables de entorno
- [x] Identificar variables obsoletas
- [x] Crear .env limpio
- [x] Crear .env.example documentado
- [x] Hacer backup del .env anterior
- [x] Documentar archivos de config obsoletos
- [ ] Eliminar archivos config-v2\*.ts (opcional)
- [ ] Probar la aplicación con el nuevo .env

## 🚀 Para Empezar

```powershell
# 1. Verificar que tienes el .env correcto
cat .env

# 2. (Opcional) Agregar tu PRIVATE_KEY si vas a deployar
# Edita .env y cambia "your_private_key_here_without_0x_prefix"

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor
npm run dev

# 5. Ir a http://localhost:3000/test
```

## 📚 Documentación Relacionada

- `.env.example` - Plantilla con toda la info
- `POLKADOT_SETUP.md` - Setup de Polkadot
- `GLOBAL_WALLET_STATE.md` - Sistema de wallet
- `hardhat.config.js` - Config de deployment
- `lib/web3/config.ts` - Config de red y contrato

---

**Conclusión**: El proyecto ahora tiene un sistema de variables de entorno limpio y minimalista, con solo las variables que realmente se usan. Todo lo demás está hardcodeado en el código o no se necesita.
