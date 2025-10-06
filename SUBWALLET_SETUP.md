# 🔧 Configuración de SubWallet para Spear

## 📋 Pasos para Configurar SubWallet

### 1. Instalar SubWallet
- Descargar desde: https://subwallet.app/
- Instalar extensión en Chrome/Firefox
- Crear o importar wallet

### 2. Agregar Polkadot Hub TestNet
```javascript
// Configuración de red
{
  chainId: "0x1911f0a6", // 420420422
  chainName: "Polkadot Hub TestNet",
  nativeCurrency: {
    name: "PAS",
    symbol: "PAS", 
    decimals: 18
  },
  rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
  blockExplorerUrls: ["https://blockscout-passet-hub.parity-testnet.parity.io"]
}
```

### 3. Obtener Tokens de Prueba
- Ir a: https://faucet.polkadot.io/?parachain=1111
- Conectar wallet y solicitar tokens PAS

### 4. Verificar Conexión
- Abrir DevTools (F12)
- Verificar que aparezca: "🦊 Usando wallet detectada: SubWallet"
- Si no funciona, recargar la página

## 🔍 Troubleshooting

### Error: "Could not establish connection"
- Recargar la página
- Verificar que SubWallet esté desbloqueado
- Cambiar a la red correcta en SubWallet

### Error: "Receiving end does not exist"
- Cerrar y abrir SubWallet
- Recargar la aplicación
- Verificar permisos de la extensión

### Wallet no conecta
- Usar MetaMask como alternativa
- Verificar que la red esté agregada
- Comprobar que hay fondos PAS

## ✅ Verificación Final
1. SubWallet instalado y configurado ✅
2. Red Polkadot Hub TestNet agregada ✅  
3. Tokens PAS en la wallet ✅
4. Aplicación conectada correctamente ✅

## 🚀 Usar la Aplicación
```bash
npm run dev
# Ir a http://localhost:3000/test
# Conectar SubWallet
# Probar funcionalidad de escrow
```