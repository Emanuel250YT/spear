import { expect } from "chai";
import { ethers } from "hardhat";

describe("SpearEscrowV2 Basic Test", function () {
  it("Should deploy successfully", async function () {
    const SpearEscrowV2 = await ethers.getContractFactory("SpearEscrowV2");
    const spearEscrow = await SpearEscrowV2.deploy();
    await spearEscrow.waitForDeployment();

    const owner = await spearEscrow.owner();
    expect(owner).to.not.equal(ethers.ZeroAddress);

    console.log("✅ Contract deployed successfully!");
    console.log("📍 Owner:", owner);
  });
});