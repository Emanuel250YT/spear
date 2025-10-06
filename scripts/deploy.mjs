import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  console.log("🚀 Deploying SpearEscrowV2...");

  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const SpearEscrowV2 = await ethers.getContractFactory("SpearEscrowV2");
  const spearEscrow = await SpearEscrowV2.deploy();

  await spearEscrow.waitForDeployment();

  const contractAddress = await spearEscrow.getAddress();
  console.log("✅ SpearEscrowV2 deployed to:", contractAddress);

  // Verificar algunas constantes del contrato
  const minAmount = await spearEscrow.MIN_PROJECT_AMOUNT();
  const premiumThreshold = await spearEscrow.PREMIUM_THRESHOLD();
  const baseFeePercentage = await spearEscrow.BASE_FEE_PERCENTAGE();
  const premiumDiscount = await spearEscrow.PREMIUM_DISCOUNT();

  console.log("\n📊 Contract Constants:");
  console.log("- Min Project Amount:", ethers.formatUnits(minAmount, 6), "USDT");
  console.log("- Premium Threshold:", ethers.formatUnits(premiumThreshold, 6), "USDT");
  console.log("- Base Fee Percentage:", (Number(baseFeePercentage) / 100).toFixed(2) + "%");
  console.log("- Premium Discount:", (Number(premiumDiscount) / 100).toFixed(2) + "%");

  console.log("\n🎯 New Features Implemented:");
  console.log("✅ OPTIONAL Protection - Basic = 0% fee, Premium = 2.5-3% fee");
  console.log("✅ Custom Risk Fund defined by client");
  console.log("✅ 2.5% Premium fee for projects 15k+ (3% - 0.5% discount)");
  console.log("✅ 3% Base fee for regular projects");
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