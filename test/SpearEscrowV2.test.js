import { expect } from "chai";
import { ethers } from "hardhat";

describe("SpearEscrowV2", function () {
  let spearEscrow;
  let owner;
  let client;
  let developer;
  let admin;

  beforeEach(async function () {
    [owner, client, developer, admin] = await ethers.getSigners();

    const SpearEscrowV2 = await ethers.getContractFactory("SpearEscrowV2");
    spearEscrow = await SpearEscrowV2.deploy();
    await spearEscrow.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await spearEscrow.owner()).to.equal(owner.address);
    });

    it("Should set owner as admin", async function () {
      expect(await spearEscrow.admins(owner.address)).to.equal(true);
    });

    it("Should have correct constants", async function () {
      expect(await spearEscrow.MIN_PROJECT_AMOUNT()).to.equal(10 * 10 ** 6);
      expect(await spearEscrow.PREMIUM_THRESHOLD()).to.equal(15000 * 10 ** 6);
      expect(await spearEscrow.RISK_FUND_PERCENTAGE()).to.equal(30);
      expect(await spearEscrow.PREMIUM_FEE_PERCENTAGE()).to.equal(50);
    });
  });

  describe("Project Creation", function () {
    it("Should create a basic project correctly", async function () {
      const milestoneAmounts = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
      const totalAmount = ethers.parseEther("0.3");
      const riskFund = totalAmount * BigInt(30) / BigInt(100); // 30%
      const totalRequired = totalAmount + riskFund;

      await expect(
        spearEscrow.connect(client).createProject(
          "Test Project",
          milestoneAmounts,
          { value: totalRequired }
        )
      ).to.emit(spearEscrow, "ProjectCreated");

      const project = await spearEscrow.projects(1);
      expect(project.client).to.equal(client.address);
      expect(project.totalAmount).to.equal(totalAmount);
      expect(project.riskFund).to.equal(riskFund);
      expect(project.status).to.equal(0); // Open
    });

    it("Should create a premium project for large amounts", async function () {
      const milestoneAmounts = [ethers.parseEther("20000")]; // > 15k threshold
      const totalAmount = ethers.parseEther("20000");
      const riskFund = totalAmount * BigInt(30) / BigInt(100); // 30%
      const premiumFee = totalAmount * BigInt(50) / BigInt(10000); // 0.5%
      const totalRequired = totalAmount + riskFund + premiumFee;

      await expect(
        spearEscrow.connect(client).createProject(
          "Premium Project",
          milestoneAmounts,
          { value: totalRequired }
        )
      ).to.emit(spearEscrow, "ProjectCreated")
        .and.to.emit(spearEscrow, "PremiumFeeCharged");

      const project = await spearEscrow.projects(1);
      expect(project.protection).to.equal(1); // Premium
      expect(project.premiumFee).to.equal(premiumFee);
    });
  });

  describe("Project Application and Approval", function () {
    beforeEach(async function () {
      const milestoneAmounts = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
      const totalAmount = ethers.parseEther("0.3");
      const riskFund = totalAmount * BigInt(30) / BigInt(100);
      const totalRequired = totalAmount + riskFund;

      await spearEscrow.connect(client).createProject(
        "Test Project",
        milestoneAmounts,
        { value: totalRequired }
      );
    });

    it("Should allow developer to apply", async function () {
      await expect(
        spearEscrow.connect(developer).applyToProject(1)
      ).to.emit(spearEscrow, "DeveloperApplied");

      const applicants = await spearEscrow.getProjectApplicants(1);
      expect(applicants[0]).to.equal(developer.address);
    });

    it("Should allow client to approve developer", async function () {
      await spearEscrow.connect(developer).applyToProject(1);

      await expect(
        spearEscrow.connect(client).approveDeveloper(1, developer.address)
      ).to.emit(spearEscrow, "DeveloperApproved");

      const project = await spearEscrow.projects(1);
      expect(project.developer).to.equal(developer.address);
      expect(project.status).to.equal(1); // Pending
    });
  });

  describe("Project Start Confirmation", function () {
    beforeEach(async function () {
      const milestoneAmounts = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
      const totalAmount = ethers.parseEther("0.3");
      const riskFund = totalAmount * BigInt(30) / BigInt(100);
      const totalRequired = totalAmount + riskFund;

      await spearEscrow.connect(client).createProject(
        "Test Project",
        milestoneAmounts,
        { value: totalRequired }
      );
      await spearEscrow.connect(developer).applyToProject(1);
      await spearEscrow.connect(client).approveDeveloper(1, developer.address);
    });

    it("Should require both parties to confirm start", async function () {
      // Client confirms
      await expect(
        spearEscrow.connect(client).confirmProjectStart(1)
      ).to.emit(spearEscrow, "ProjectStartConfirmed");

      let project = await spearEscrow.projects(1);
      expect(project.clientConfirmedStart).to.equal(true);
      expect(project.status).to.equal(1); // Still Pending

      // Developer confirms
      await expect(
        spearEscrow.connect(developer).confirmProjectStart(1)
      ).to.emit(spearEscrow, "ProjectStartConfirmed")
        .and.to.emit(spearEscrow, "ProjectStarted");

      project = await spearEscrow.projects(1);
      expect(project.developerConfirmedStart).to.equal(true);
      expect(project.status).to.equal(2); // InProgress
    });
  });

  describe("Milestone Management", function () {
    beforeEach(async function () {
      const milestoneAmounts = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
      const totalAmount = ethers.parseEther("0.3");
      const riskFund = totalAmount * BigInt(30) / BigInt(100);
      const totalRequired = totalAmount + riskFund;

      await spearEscrow.connect(client).createProject(
        "Test Project",
        milestoneAmounts,
        { value: totalRequired }
      );
      await spearEscrow.connect(developer).applyToProject(1);
      await spearEscrow.connect(client).approveDeveloper(1, developer.address);
      await spearEscrow.connect(client).confirmProjectStart(1);
      await spearEscrow.connect(developer).confirmProjectStart(1);
    });

    it("Should allow milestone completion and dual approval", async function () {
      // Developer marks milestone as completed
      await expect(
        spearEscrow.connect(developer).markMilestoneCompleted(1, 0)
      ).to.emit(spearEscrow, "MilestoneCompleted");

      // Client approves milestone
      await expect(
        spearEscrow.connect(client).approveMilestone(1, 0)
      ).to.emit(spearEscrow, "MilestoneApproved");

      // Developer approves milestone (should trigger fund release)
      const initialBalance = await ethers.provider.getBalance(developer.address);

      await expect(
        spearEscrow.connect(developer).approveMilestone(1, 0)
      ).to.emit(spearEscrow, "MilestoneApproved");

      const finalBalance = await ethers.provider.getBalance(developer.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });
  });

  describe("Project Cancellation with Risk Fund", function () {
    beforeEach(async function () {
      const milestoneAmounts = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
      const totalAmount = ethers.parseEther("0.3");
      const riskFund = totalAmount * BigInt(30) / BigInt(100);
      const totalRequired = totalAmount + riskFund;

      await spearEscrow.connect(client).createProject(
        "Test Project",
        milestoneAmounts,
        { value: totalRequired }
      );
      await spearEscrow.connect(developer).applyToProject(1);
      await spearEscrow.connect(client).approveDeveloper(1, developer.address);
    });

    it("Should transfer risk fund to developer when client cancels", async function () {
      const initialDeveloperBalance = await ethers.provider.getBalance(developer.address);

      await expect(
        spearEscrow.connect(client).cancelProject(1, "Client changed mind")
      ).to.emit(spearEscrow, "ProjectCancelled")
        .and.to.emit(spearEscrow, "RiskFundReleased");

      const finalDeveloperBalance = await ethers.provider.getBalance(developer.address);
      const project = await spearEscrow.projects(1);

      expect(finalDeveloperBalance).to.equal(initialDeveloperBalance + project.riskFund);
      expect(project.status).to.equal(4); // Cancelled
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to add/remove admins", async function () {
      await expect(
        spearEscrow.connect(owner).addAdmin(admin.address)
      ).to.emit(spearEscrow, "AdminAdded");

      expect(await spearEscrow.admins(admin.address)).to.equal(true);

      await expect(
        spearEscrow.connect(owner).removeAdmin(admin.address)
      ).to.emit(spearEscrow, "AdminRemoved");

      expect(await spearEscrow.admins(admin.address)).to.equal(false);
    });

    it("Should allow admins to release funds", async function () {
      await spearEscrow.connect(owner).addAdmin(admin.address);

      const milestoneAmounts = [ethers.parseEther("0.1")];
      const totalAmount = ethers.parseEther("0.1");
      const riskFund = totalAmount * BigInt(30) / BigInt(100);
      const totalRequired = totalAmount + riskFund;

      await spearEscrow.connect(client).createProject(
        "Test Project",
        milestoneAmounts,
        { value: totalRequired }
      );

      await expect(
        spearEscrow.connect(admin).adminReleaseFunds(
          1,
          developer.address,
          ethers.parseEther("0.05"),
          "Admin intervention"
        )
      ).to.emit(spearEscrow, "AdminFundsReleased");
    });
  });
});