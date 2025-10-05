@echo off
echo Deploying SpearEscrowSimple to Polkadot Hub TestNet...
npx hardhat run scripts/deploy-simple.js --network passetHub
pause
