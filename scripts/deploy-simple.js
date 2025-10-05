const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying SpearEscrowSimple to Polkadot Hub TestNet...");

  const SpearEscrowSimple = await hre.ethers.getContractFactory("SpearEscrowSimple");
  const contract = await SpearEscrowSimple.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("✅ SpearEscrowSimple deployed to:", address);
  console.log("🔗 Explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${address}`);
  console.log("\n📝 Update lib/web3/config.ts with this address:");
  console.log(`CONTRACT_ADDRESSES.POLKADOT_HUB = '${address}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
