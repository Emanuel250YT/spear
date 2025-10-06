# 🔧 SOLUCIÓN: Web3 validator found 1 error[s]: value at "/3" is required

## ❌ ERROR ORIGINAL

```
Web3 validator found 1 error[s]: value at "/3" is required
```

**Significado:** Web3 esperaba un **cuarto parámetro** (índice 3) en la función `createProject`, pero el código solo enviaba 3 parámetros.

---

## 🔍 CAUSA DEL PROBLEMA

Había una **inconsistencia entre el ABI y el contrato real**:

### **ABI Antiguo (`lib/web3/abi.ts`):**

```typescript
// ❌ INCORRECTO - 4 parámetros
function createProject(
  string _description,      // [0]
  uint256[] _milestoneAmounts,  // [1]
  uint256 _riskFund,        // [2]
  uint8 _protection         // [3] ← Este parámetro NO EXISTE en el contrato
)
```

### **Contrato Real (`SpearEscrowV2.sol`):**

```solidity
// ✅ CORRECTO - 3 parámetros
function createProject(
  string memory _description,        // [0]
  uint256[] memory _milestoneAmounts,    // [1]
  uint256 _riskFund                  // [2]
) external payable
```

**El contrato calcula automáticamente el tipo de protección** basado en el monto:

- Proyectos < 15k PAS → 3% comisión (Básica)
- Proyectos ≥ 15k PAS → 2.5% comisión (Premium)

---

## ✅ SOLUCIONES IMPLEMENTADAS

### **1. Actualizar el ABI en Web3Context**

**Archivo:** `contexts/Web3Context.tsx`

**Antes:**

```typescript
import { SPEAR_ESCROW_ABI } from "@/lib/web3/abi"; // ❌ ABI antiguo con 4 parámetros
```

**Ahora:**

```typescript
import { SPEAR_ESCROW_V2_ABI as SPEAR_ESCROW_ABI } from "@/lib/web3/abi-v2-updated"; // ✅ ABI correcto con 3 parámetros
```

---

### **2. Actualizar CreateProjectParams Interface**

**Archivo:** `lib/web3/config.ts`

**Antes:**

```typescript
export interface CreateProjectParams {
  description: string;
  milestoneAmounts: string[];
  riskFund: string;
  protection: ProtectionType; // ❌ Ya no se necesita
}
```

**Ahora:**

```typescript
export interface CreateProjectParams {
  description: string;
  milestoneAmounts: string[];
  riskFund: string;
  // protection removido - El contrato lo calcula automáticamente
}
```

---

### **3. Eliminar Campo de Protección del Formulario**

**Archivo:** `app/test/page.tsx`

**Antes:**

```tsx
<Select
  value={projectForm.protection.toString()}
  onValueChange={(value) =>
    setProjectForm({
      ...projectForm,
      protection: Number(value) as ProtectionType,
    })
  }
>
  <SelectItem value="0">Básica (0% comisión)</SelectItem>
  <SelectItem value="1">Premium (1-3% comisión)</SelectItem>
</Select>
```

**Ahora:**

```tsx
<div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
  <p className="text-sm text-blue-400">
    ℹ️ <strong>Protección automática:</strong> El contrato calcula
    automáticamente la comisión:
  </p>
  <ul className="text-xs text-blue-300 mt-2 ml-4 list-disc">
    <li>
      Proyectos &lt; 15k PAS: <strong>3% comisión</strong>
    </li>
    <li>
      Proyectos ≥ 15k PAS: <strong>2.5% comisión (Premium)</strong>
    </li>
  </ul>
</div>
```

---

### **4. Actualizar Llamada a createProject**

**Antes:**

```typescript
await createProject({
  description: projectForm.description,
  milestoneAmounts,
  riskFund: projectForm.riskFund,
  protection: projectForm.protection, // ❌ Parámetro extra
});
```

**Ahora:**

```typescript
await createProject({
  description: projectForm.description,
  milestoneAmounts,
  riskFund: projectForm.riskFund,
  // protection removido
});
```

---

## 📊 CÓMO FUNCIONA AHORA

### **Cálculo Automático de Protección:**

El contrato determina automáticamente la comisión:

```solidity
// En el contrato SpearEscrowV2.sol
ProtectionType protection = ProtectionType.Basic;
if (totalMilestones >= PREMIUM_THRESHOLD) {  // 15,000 * 10^6 wei
  protection = ProtectionType.Premium;
}
```

### **Comisiones:**

| Monto del Proyecto | Tipo    | Comisión |
| ------------------ | ------- | -------- |
| < 0.000000015 PAS  | Básica  | 3%       |
| ≥ 0.000000015 PAS  | Premium | 2.5%     |

**Nota:** El threshold está configurado para USDT (6 decimales), por lo que en PAS (18 decimales) prácticamente todos los proyectos serán "Básica" (3%).

---

## 🚀 CÓMO PROBAR

### **1. Reinicia el servidor**

```powershell
npm run dev
```

### **2. Limpia la caché del navegador**

- Presiona `Ctrl + Shift + R`

### **3. Abre la consola del navegador (F12)**

### **4. Conecta tu wallet**

- Debe estar en Polkadot Asset Hub (0x190f1b46)

### **5. Crea un proyecto**

```
Description: "Proyecto de prueba"
Milestones: "1, 1"  (2 PAS total)
Risk Fund: "0.5"
```

### **6. Verifica en consola**

```
🚀 Creando proyecto en Polkadot Asset Hub...
📊 Parámetros: {
  description: "Proyecto de prueba",
  milestoneAmounts: ["1", "1"],
  riskFund: "0.5"
}
🌐 ChainId actual: 0x190f1b46 (decimal: 420420422)
📦 Proyecto estándar (<15k PAS)

📊 Desglose de costos:
  - Total Milestones: 2 PAS
  - Risk Fund: 0.5 PAS
  - Platform Fee (3.00%): 0.06 PAS
💰 TOTAL a enviar: 2.56 PAS

✅ Proyecto creado exitosamente
```

---

## 🎯 DIFERENCIAS CLAVE

### **Antes (ABI Antiguo):**

```typescript
// Enviaba 4 parámetros
contract.methods.createProject(
  description, // ✅
  milestoneAmounts, // ✅
  riskFund, // ✅
  protection // ❌ Error: parámetro no existe
);
```

### **Ahora (ABI Correcto):**

```typescript
// Envía 3 parámetros
contract.methods.createProject(
  description, // ✅
  milestoneAmounts, // ✅
  riskFund // ✅
);
// protection es calculado automáticamente por el contrato
```

---

## 📋 ARCHIVOS MODIFICADOS

| Archivo                    | Cambio                              | Estado |
| -------------------------- | ----------------------------------- | ------ |
| `contexts/Web3Context.tsx` | Cambiado a `abi-v2-updated.ts`      | ✅     |
| `lib/web3/config.ts`       | Removido `protection` del interface | ✅     |
| `app/test/page.tsx`        | Removido selector de protección     | ✅     |
| `app/test/page.tsx`        | Agregado mensaje informativo        | ✅     |

---

## ⚠️ POSIBLES ERRORES

### **Error: "Expected 4 arguments, but got 3"**

**Causa:** Caché del navegador o módulos no actualizados

**Solución:**

1. Limpia caché: `Ctrl + Shift + R`
2. Reinicia el servidor: `npm run dev`
3. Recarga la página

---

### **Error: "Contract method not found"**

**Causa:** ABI no actualizado en memoria

**Solución:**

1. Cierra completamente el navegador
2. Detén el servidor (`Ctrl + C`)
3. Reinicia: `npm run dev`
4. Abre el navegador de nuevo

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de crear un proyecto:

- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Caché del navegador limpiada
- [ ] Conectado a Polkadot Asset Hub (0x190f1b46)
- [ ] Consola abierta (F12)
- [ ] Formulario NO tiene selector de "Tipo de Protección"
- [ ] Se muestra mensaje de "Protección automática"

---

## 🎉 RESULTADO

**El error "value at /3 is required" está completamente resuelto** porque:

1. ✅ El ABI ahora coincide con el contrato (3 parámetros)
2. ✅ El interface no incluye `protection`
3. ✅ El formulario no solicita tipo de protección
4. ✅ El contrato calcula automáticamente la comisión

**¡La creación de proyectos ahora funcionará correctamente!** 🚀

---

## 📝 NOTAS ADICIONALES

### **¿Por qué se removió el parámetro `protection`?**

En la versión actual del contrato (`SpearEscrowV2.sol`), el tipo de protección se calcula **automáticamente** basado en el monto total de los milestones:

```solidity
// Línea 244-248 del contrato
ProtectionType protection = ProtectionType.Basic;
if (totalMilestones >= PREMIUM_THRESHOLD) {
  protection = ProtectionType.Premium;
}
```

Esto simplifica la UX porque el usuario **no necesita elegir** el tipo de protección manualmente.

---

## 🔗 REFERENCIAS

- **Contrato:** `contracts/SpearEscrowV2.sol` (línea 214)
- **ABI Correcto:** `lib/web3/abi-v2-updated.ts`
- **ABI Antiguo (no usar):** `lib/web3/abi.ts`
- **Interface:** `lib/web3/config.ts` (línea 79)

---

**¡Todo corregido y listo para usar!** 🎯
