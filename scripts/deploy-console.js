// Deployment instructions for Hardhat Console
// Run: npx hardhat console --network polkadotAssetHub
// Then paste these commands:

const SpearEscrowV2 = await ethers.getContractFactory("SpearEscrowV2");
const contract = await SpearEscrowV2.deploy();
await contract.waitForDeployment();
const address = await contract.getAddress();
console.log("✅ Deployed to:", address);

// Get constants
const minAmount = await contract.MIN_PROJECT_AMOUNT();
const premiumThreshold = await contract.PREMIUM_THRESHOLD();
const baseFeePercentage = await contract.BASE_FEE_PERCENTAGE();
const premiumDiscount = await contract.PREMIUM_DISCOUNT();

console.log("📊 Constants:");
console.log("- Min:", ethers.formatEther(minAmount), "PAS");
console.log("- Premium Threshold:", ethers.formatEther(premiumThreshold), "PAS");
console.log("- Base Fee:", (Number(baseFeePercentage) / 100).toFixed(2) + "%");
console.log("- Premium Discount:", (Number(premiumDiscount) / 100).toFixed(2) + "%");
