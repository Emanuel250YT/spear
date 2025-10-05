# 🚀 Inicio Rápido - Spear en Polkadot Asset Hub

## ⚡ Quick Start

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar el servidor de desarrollo
pnpm dev

# 3. Abrir en el navegador
http://localhost:3000/test
```

## 🔧 Configurar Wallet

### Opción 1: MetaMask

1. Instala MetaMask: https://metamask.io/
2. Abre la aplicación en `/test`
3. Haz clic en "Conectar Wallet"
4. Haz clic en "Cambiar a Polkadot Asset Hub" (se agregará automáticamente)

### Opción 2: SubWallet

1. Instala SubWallet: https://www.subwallet.app/
2. Conecta normalmente
3. La red se configurará automáticamente

## 💰 Obtener PAS (Testnet Tokens)

**Faucet de Polkadot**:

- Visita https://polkadot.js.org/apps/?rpc=wss://polkadot-asset-hub-rpc.polkadot.io#/accounts
- Solicita tokens de testnet

Alternativamente, usa la cuenta de desarrollo:

```
Address: 0x...
Private Key: (ver en el código de desarrollo)
```

## 🎯 Primera Prueba: Crear un Proyecto

1. Ve a `/test` en tu navegador
2. Conecta tu wallet
3. Ve a la pestaña "Crear Proyecto"
4. Completa el formulario:
   ```
   Descripción: "Mi primer proyecto de prueba"
   Milestones: 0.01,0.01,0.01
   Fondo de Riesgo: 0.005
   Protección: Basic
   ```
5. Haz clic en "Crear Proyecto"
6. Confirma la transacción en tu wallet

## 📋 Workflow Completo de Testing

### Como Cliente:

1. ✅ Crear proyecto
2. ✅ Esperar aplicaciones
3. ✅ Aprobar developer
4. ✅ Confirmar inicio
5. ✅ Aprobar milestones
6. ✅ Proyecto completado

### Como Developer:

1. ✅ Aplicar a proyecto
2. ✅ Esperar aprobación
3. ✅ Confirmar inicio
4. ✅ Completar milestones
5. ✅ Aprobar milestones
6. ✅ Recibir pagos

## 🔗 Enlaces Útiles

- **Interfaz de Testing**: http://localhost:3000/test
- **Contrato**: 0xf90f46345E09Bd8C6c265EdEbFa30269891EC259
- **Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io/
- **Documentación Completa**: Ver POLKADOT_SETUP.md

## ⚠️ Troubleshooting

### Error: "Wallet no conectado"

```bash
# Solución:
1. Asegúrate de tener MetaMask o SubWallet instalado
2. Actualiza la página
3. Intenta conectar nuevamente
```

### Error: "Red incorrecta"

```bash
# Solución:
1. Haz clic en "Cambiar a Polkadot Asset Hub"
2. Acepta agregar la red en tu wallet
3. La red se configurará automáticamente
```

### Error: "Insufficient funds"

```bash
# Solución:
1. Necesitas tokens PAS de testnet
2. Usa el faucet o la cuenta de desarrollo
3. Asegúrate de tener al menos 0.1 PAS para testing
```

## 📚 Documentación Detallada

- **Setup Completo**: POLKADOT_SETUP.md
- **Resumen de Cambios**: MIGRATION_SUMMARY.md
- **Código del Contrato**: contracts/SpearEscrowV2.sol

## 🧪 Testing Checklist

- [ ] Conectar wallet
- [ ] Cambiar a red correcta
- [ ] Crear proyecto
- [ ] Aplicar a proyecto (desde otra cuenta)
- [ ] Aprobar developer
- [ ] Confirmar inicio (ambas partes)
- [ ] Completar milestone
- [ ] Aprobar milestone
- [ ] Verificar fondos recibidos

## 🎉 ¡Listo para Empezar!

Tu aplicación está completamente configurada para Polkadot Asset Hub TestNet. Visita `/test` y comienza a interactuar con el contrato.

**Contrato Desplegado**: `0xf90f46345E09Bd8C6c265EdEbFa30269891EC259`

---

¿Preguntas? Revisa POLKADOT_SETUP.md para documentación completa.
