# Sistema de Estado Global de Wallet

## ✅ Problema Resuelto

**Error Original**: "Wallet no conectado" en todas las interacciones del contrato, a pesar de haber conectado la wallet.

**Causa**: El estado de la wallet se manejaba localmente en cada componente con `useState`, perdiendo la conexión entre renders y componentes.

## 🔧 Solución Implementada

Se implementó un **Context API de React** para mantener el estado de la wallet globalmente en toda la aplicación.

### Arquitectura

```
┌─────────────────────────────────────┐
│         app/layout.tsx              │
│  <Web3Provider>                     │
│    └── Toda la aplicación           │
│  </Web3Provider>                    │
└─────────────────────────────────────┘
            │
            ├── contexts/Web3Context.tsx
            │   └── Estado global:
            │       • web3 instance
            │       • account (wallet address)
            │       • contract instance
            │       • isConnected
            │       • isCorrectNetwork
            │       • chainId
            │
            ├── hooks/useWeb3.ts
            │   └── Hook que consume el contexto
            │
            └── hooks/useSpearContract.ts
                └── Usa useWeb3 para acceder al contrato
```

## 📁 Archivos Modificados

### 1. **Nuevo**: `contexts/Web3Context.tsx`

Contexto global que mantiene:

- ✅ Instancia de Web3
- ✅ Cuenta conectada (address)
- ✅ Contrato inicializado
- ✅ Estado de conexión persistente
- ✅ Validación de red
- ✅ Listeners para cambios de cuenta/red

**Características**:

- Auto-reconecta si la wallet ya estaba conectada
- Escucha cambios de cuenta y red automáticamente
- Inicializa el contrato cuando la wallet está conectada y en la red correcta
- Maneja errores de conexión
- Proporciona método para cambiar/agregar red

### 2. **Simplificado**: `hooks/useWeb3.ts`

Antes: 200+ líneas de lógica de estado local
Ahora: 8 líneas que consumen el contexto

```typescript
export const useWeb3 = () => {
  const context = useWeb3Context();
  return context;
};
```

### 3. **Sin cambios**: `hooks/useSpearContract.ts`

No requiere cambios porque ya usaba `useWeb3()`. Ahora automáticamente obtiene el estado global.

### 4. **Modificado**: `app/layout.tsx`

Envuelve toda la aplicación con `<Web3Provider>`:

```tsx
<Web3Provider>
  <div className="relative z-10">{children}</div>
</Web3Provider>
```

## 🎯 Beneficios

1. **Estado Único Global**:

   - Una sola instancia de Web3
   - Una sola conexión de wallet
   - Un solo contrato inicializado

2. **Persistencia Entre Componentes**:

   - La conexión se mantiene al navegar entre páginas
   - No se pierde el estado al re-renderizar

3. **Sincronización Automática**:

   - Cambios de cuenta detectados automáticamente
   - Cambios de red manejados globalmente
   - Todos los componentes se actualizan simultáneamente

4. **Mejor Performance**:

   - No se re-inicializa Web3 en cada componente
   - No se crean múltiples listeners
   - Menos llamadas RPC al blockchain

5. **Código más Limpio**:
   - useWeb3 ahora es trivial (8 líneas)
   - useSpearContract sin cambios
   - Fácil de mantener y debuggear

## 🚀 Uso

### En cualquier componente:

```tsx
"use client";
import { useWeb3 } from "@/hooks/useWeb3";

function MiComponente() {
  const {
    account,
    isConnected,
    connectWallet,
    isCorrectNetwork,
    switchNetwork,
  } = useWeb3();

  if (!isConnected) {
    return <button onClick={connectWallet}>Conectar Wallet</button>;
  }

  if (!isCorrectNetwork) {
    return <button onClick={switchNetwork}>Cambiar a Polkadot</button>;
  }

  return <div>Conectado: {account}</div>;
}
```

### Para interactuar con el contrato:

```tsx
"use client";
import { useSpearContract } from "@/hooks/useSpearContract";

function CrearProyecto() {
  const { createProject, loading, error } = useSpearContract();

  const handleCreate = async () => {
    await createProject({
      description: "Mi proyecto",
      milestoneAmounts: ["1.0", "2.0"],
      riskFund: "0.5",
      protection: ProtectionType.Basic,
    });
  };

  return (
    <button onClick={handleCreate} disabled={loading}>
      {loading ? "Creando..." : "Crear Proyecto"}
    </button>
  );
}
```

## 🔍 Debugging

El contexto incluye console.logs útiles:

- ✅ `Wallet conectada:` cuando se conecta exitosamente
- ✅ `Contrato inicializado:` cuando el contrato está listo
- ✅ `Cuenta cambiada:` cuando el usuario cambia de cuenta
- ✅ `Red cambiada:` cuando cambia la red
- ⚠️ `Red incorrecta detectada` cuando no está en Polkadot
- 👋 `Wallet desconectada` cuando se desconecta

## ⚡ Next Steps

1. ✅ Instalar dependencias si es necesario: `npm install`
2. ✅ Iniciar servidor: `npm run dev`
3. ✅ Ir a `/test` y conectar wallet
4. ✅ Verificar que la conexión persiste al navegar

## 🐛 Solución de Problemas

### "Cannot find module 'web3'"

```bash
npm install web3@^4.16.0
```

### La wallet no se conecta

- Verifica que MetaMask/SubWallet esté instalado
- Abre la consola del navegador para ver logs
- Asegúrate de estar en https://localhost:3000

### La red no cambia automáticamente

- Esto es intencional, el usuario debe aprobar el cambio
- Usa el botón "Cambiar a Polkadot Asset Hub" si aparece

## 📊 Estado del Contexto

El contexto expone estos valores:

```typescript
interface Web3ContextType {
  web3: Web3 | null; // Instancia de Web3
  account: string | null; // Address de la wallet
  contract: Contract | null; // Instancia del contrato
  isConnected: boolean; // Si la wallet está conectada
  isCorrectNetwork: boolean; // Si está en Polkadot
  chainId: string | null; // ID de la red actual
  connectWallet: () => Promise<void>; // Función para conectar
  disconnectWallet: () => void; // Función para desconectar
  switchNetwork: () => Promise<void>; // Función para cambiar red
  loading: boolean; // Si está procesando
  error: string | null; // Error si existe
}
```

## 🎉 Conclusión

Ahora tienes un sistema robusto de gestión de estado para Web3 que:

- ✅ Mantiene la conexión globalmente
- ✅ Se sincroniza automáticamente
- ✅ Es fácil de usar en cualquier componente
- ✅ Funciona en toda la aplicación sin duplicar lógica
