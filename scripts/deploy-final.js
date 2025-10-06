async function main() {
  // Dynamic import para evitar problemas con top-level await
  const hre = await import("hardhat");

  console.log("🚀 Deploying SpearEscrowV2 to Polkadot Asset Hub TestNet...");
  console.log("⛓️  Network: Polkadot Asset Hub TestNet (ChainID: 420420422)");
  console.log("");

  const SpearEscrowV2 = await hre.ethers.getContractFactory("SpearEscrowV2");
  const contract = await SpearEscrowV2.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("✅ SpearEscrowV2 deployed to:", address);
  console.log("🔗 Explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${address}`);
  console.log("");

  // Verificar constantes del contrato
  const minAmount = await contract.MIN_PROJECT_AMOUNT();
  const premiumThreshold = await contract.PREMIUM_THRESHOLD();
  const baseFeePercentage = await contract.BASE_FEE_PERCENTAGE();
  const premiumDiscount = await contract.PREMIUM_DISCOUNT();

  console.log("📊 Contract Constants:");
  console.log("- Min Project Amount:", hre.ethers.formatEther(minAmount), "PAS");
  console.log("- Premium Threshold:", hre.ethers.formatEther(premiumThreshold), "PAS");
  console.log("- Base Fee Percentage:", (Number(baseFeePercentage) / 100).toFixed(2) + "%");
  console.log("- Premium Discount:", (Number(premiumDiscount) / 100).toFixed(2) + "%");
  console.log("");

  console.log("🎯 Features:");
  console.log("✅ OPTIONAL Protection");
  console.log("   - Básica: SIN comisión (0%)");
  console.log("   - Premium: Con comisión 2.5-3%");
  console.log("✅ Custom Risk Fund");
  console.log("✅ Milestone-based payments");
  console.log("✅ Dual approval system");
  console.log("✅ Admin intervention capabilities");
  console.log("");

  console.log("📝 Next Steps:");
  console.log("1. Update lib/web3/config.ts:");
  console.log(`   CONTRACT_ADDRESSES.POLKADOT_HUB = '${address}'`);
  console.log("");
  console.log("2. Test the contract at:");
  console.log("   http://localhost:3000/test");
  console.log("");

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
