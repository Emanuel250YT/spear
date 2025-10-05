import { Web3 } from 'web3';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RPC_URL = 'https://testnet-passet-hub-eth-rpc.polkadot.io';
const PRIVATE_KEY = '4ace1d904d766b93e513e67de170f76997ae1b03efcf33cce0a812fe9a719b79';
const EXPLORER_URL = 'https://blockscout-passet-hub.parity-testnet.parity.io';

async function main() {
  console.log('🚀 Deploying SpearEscrowSimple to Polkadot Hub TestNet...\n');

  const web3 = new Web3(RPC_URL);
  const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);
  
  console.log('📝 Deploying from:', account.address);
  
  const balance = await web3.eth.getBalance(account.address);
  console.log('💰 Balance:', web3.utils.fromWei(balance, 'ether'), 'PAS\n');

  if (balance === 0n) {
    console.log('❌ Insufficient balance');
    process.exit(1);
  }

  const artifactPath = join(__dirname, '../artifacts/contracts/SpearEscrowSimple.sol/SpearEscrowSimple.json');
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  
  console.log('🚀 Deploying contract...');
  
  const contract = new web3.eth.Contract(artifact.abi);
  const deployTx = contract.deploy({ data: artifact.bytecode });

  const gas = await deployTx.estimateGas({ from: account.address });
  console.log('⛽ Estimated gas:', gas.toString());

  const deployedContract = await deployTx.send({
    from: account.address,
    gas: gas.toString(),
    gasPrice: await web3.eth.getGasPrice()
  });

  const contractAddress = deployedContract.options.address;
  
  console.log('\n✅ SpearEscrowSimple deployed!');
  console.log('📍 Contract Address:', contractAddress);
  console.log('🔗 Explorer:', `${EXPLORER_URL}/address/${contractAddress}\n`);

  // Update test page
  const testPagePath = join(__dirname, '../app/test/page.tsx');
  let content = fs.readFileSync(testPagePath, 'utf8');
  
  content = content.replace(/0xeda2FdE00141C5453fBaf3c6856222A289ba3BE6/g, contractAddress);
  content = content.replace(/Sepolia Testnet/g, 'Polkadot Hub TestNet');
  content = content.replace(/sepolia\.etherscan\.io/g, 'blockscout-passet-hub.parity-testnet.parity.io');
  
  fs.writeFileSync(testPagePath, content);
  console.log('✅ Test page updated');
  
  return contractAddress;
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exitCode = 1;
});
