const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying SpearEscrowV2...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const SpearEscrowV2 = await hre.ethers.getContractFactory("SpearEscrowV2");
  const spearEscrow = await SpearEscrowV2.deploy();

  await spearEscrow.waitForDeployment();

  const contractAddress = await spearEscrow.getAddress();
  console.log("✅ SpearEscrowV2 deployed to:", contractAddress);

  // Verificar algunas constantes del contrato
  const minAmount = await spearEscrow.MIN_PROJECT_AMOUNT();
  const premiumThreshold = await spearEscrow.PREMIUM_THRESHOLD();
  const riskPercentage = await spearEscrow.RISK_FUND_PERCENTAGE();
  const premiumFee = await spearEscrow.PREMIUM_FEE_PERCENTAGE();

  console.log("\n📊 Contract Constants:");
  console.log("- Min Project Amount:", hre.ethers.formatUnits(minAmount, 6), "USDT");
  console.log("- Premium Threshold:", hre.ethers.formatUnits(premiumThreshold, 6), "USDT");
  console.log("- Risk Fund Percentage:", riskPercentage.toString() + "%");
  console.log("- Premium Fee Percentage:", (Number(premiumFee) / 100).toFixed(2) + "%");

  console.log("\n🎯 New Features Implemented:");
  console.log("✅ 30% Risk Fund automatically calculated");
  console.log("✅ 0.5% Premium fee for projects 15k+");
  console.log("✅ Dual approval system (both parties must approve)");
  console.log("✅ Dual start confirmation (both parties must confirm start)");
  console.log("✅ Admin intervention capabilities");
  console.log("✅ Risk fund protection on cancellation");

  return contractAddress;
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});