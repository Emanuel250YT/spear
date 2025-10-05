import { Web3 } from 'web3';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Polkadot Hub TestNet configuration
const RPC_URL = 'https://testnet-passet-hub-eth-rpc.polkadot.io';
const PRIVATE_KEY = '4ace1d904d766b93e513e67de170f76997ae1b03efcf33cce0a812fe9a719b79';
const EXPLORER_URL = 'https://blockscout-passet-hub.parity-testnet.parity.io';

// Contract bytecode and ABI
const contractPath = join(__dirname, '../contracts/SpearEscrowV2.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

// Simplified bytecode extraction (you'll need to compile the contract first)
const BYTECODE = '0x608060405234801561000f575f5ffd5b50335f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001805f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055506200010f565b61000a806200011e5f395ff3fe608060405234801561000f575f5ffd5b50600436106100a6575f3560e01c8063715018a61161006e578063715018a6146101415780638da5cb5b1461014b578063a0712d6814610169578063a22cb46514610185578063e985e9c5146101a1576100a6565b806301ffc9a7146100aa57806306fdde03146100da578063081812fc146100f857806323b872dd1461012857806342842e0e14610144575b5f5ffd5b6100c460048036038101906100bf9190610a3e565b6101d1565b6040516100d19190610a83565b60405180910390f35b6100e26102b2565b6040516100ef9190610b26565b60405180910390f35b610112600480360381019061010d9190610b79565b610342565b60405161011f9190610be3565b60405180910390f35b610142600480360381019061013d9190610c26565b61037d565b005b61014c61047d565b005b610153610504565b6040516101609190610be3565b60405180910390f35b610183600480360381019061017e9190610b79565b61052b565b005b61019f600480360381019061019a9190610ca0565b6105a9565b005b6101bb60048036038101906101b69190610cde565b6105bf565b6040516101c89190610a83565b60405180910390f35b5f6301ffc9a760e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061022b57506380ac58cd60e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061025b5750635b5e139f60e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806102ab57507f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b6060600280546102c190610d49565b80601f01602080910402602001604051908101604052809291908181526020018280546102ed90610d49565b80156103385780601f1061030f57610100808354040283529160200191610338565b820191905f5260205f20905b81548152906001019060200180831161031b57829003601f168201915b5050505050905090565b5f61034c8261064d565b610382576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505f919050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036103ee576040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6103f8836106a7565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161461046f578373ffffffffffffffffffffffffffffffffffffffff1661044c84610342565b73ffffffffffffffffffffffffffffffffffffffff161461046e57610477565b5b5b50505050565b610485610761565b5f73ffffffffffffffffffffffffffffffffffffffff165f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35f5f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610533610761565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059890610dc9565b60405180910390fd5b5f5ffd5b6105b1610761565b6105bb82826107df565b5050565b5f60055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16905092915050565b5f5f73ffffffffffffffffffffffffffffffffffffffff1661066e836106a7565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b5f60045f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610731576040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61073b836106a7565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461075c5761075c565b5b505050565b610769610504565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d490610e31565b60405180910390fd5b565b8060055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516108c99190610a83565b60405180910390a3505050565b5f5ffd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61090d816108d9565b8114610917575f5ffd5b50565b5f8135905061092881610904565b92915050565b5f60208284031215610943576109426108d5565b5b5f6109508482850161091a565b91505092915050565b5f8115159050919050565b61096d81610959565b82525050565b5f6020820190506109865f830184610964565b92915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6109ce8261098c565b6109d88185610996565b93506109e88185602086016109a6565b6109f1816109b4565b840191505092915050565b5f6020820190508181035f830152610a1481846109c4565b905092915050565b5f819050919050565b610a2e81610a1c565b8114610a38575f5ffd5b50565b5f81359050610a4981610a25565b92915050565b5f60208284031215610a6457610a636108d5565b5b5f610a7184828501610a3b565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610aa382610a7a565b9050919050565b610ab381610a99565b82525050565b5f602082019050610acc5f830184610aaa565b92915050565b610adb81610a99565b8114610ae5575f5ffd5b50565b5f81359050610af681610ad2565b92915050565b5f5f60408385031215610b1257610b116108d5565b5b5f610b1f85828601610ae8565b9250506020610b3085828601610a3b565b9150509250929050565b5f5f5f60608486031215610b5157610b506108d5565b5b5f610b5e86828701610ae8565b9350506020610b6f86828701610ae8565b9250506040610b8086828701610a3b565b9150509250925092565b610b9381610959565b8114610b9d575f5ffd5b50565b5f81359050610bae81610b8a565b92915050565b5f5f60408385031215610bca57610bc96108d5565b5b5f610bd785828601610ae8565b9250506020610be885828601610ba0565b9150509250929050565b5f5f60408385031215610c0857610c076108d5565b5b5f610c1585828601610ae8565b9250506020610c2685828601610ae8565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610c7457607f821691505b602082108103610c8757610c86610c30565b5b50919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610cc582610a1c565b9150610cd083610a1c565b9250828201905080821115610ce857610ce7610c8d565b5b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f20615f8201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b5f610d48602683610996565b9150610d5382610cee565b604082019050919050565b5f6020820190508181035f830152610d7581610d3c565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65725f82015250565b5f610db0602083610996565b9150610dbb82610d7c565b602082019050919050565b5f6020820190508181035f830152610ddd81610da4565b905091905056fea264697066735822122089c8f3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e8e3e864736f6c63430008190033';

const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function main() {
  console.log('🚀 Deploying SpearEscrowV2 to Polkadot Hub TestNet...\n');

  const web3 = new Web3(RPC_URL);
  
  const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);
  
  console.log('📝 Deploying from:', account.address);
  
  const balance = await web3.eth.getBalance(account.address);
  console.log('💰 Balance:', web3.utils.fromWei(balance, 'ether'), 'PAS\n');

  if (balance === 0n) {
    console.log('❌ Insufficient balance. Get tokens from:');
    console.log('   https://faucet.polkadot.io/?parachain=1111\n');
    process.exit(1);
  }

  console.log('📦 Compiling contract...');
  
  // Read compiled contract (you need to compile first with hardhat)
  let contractBytecode;
  let contractABI;
  
  try {
    const artifactPath = join(__dirname, '../artifacts/contracts/SpearEscrowV2.sol/SpearEscrowV2.json');
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    contractBytecode = artifact.bytecode;
    contractABI = artifact.abi;
    console.log('✅ Contract compiled\n');
  } catch (error) {
    console.log('⚠️  Artifact not found, compiling with Hardhat...');
    const { execSync } = await import('child_process');
    execSync('npx hardhat compile', { stdio: 'inherit', cwd: join(__dirname, '..') });
    
    const artifactPath = join(__dirname, '../artifacts/contracts/SpearEscrowV2.sol/SpearEscrowV2.json');
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    contractBytecode = artifact.bytecode;
    contractABI = artifact.abi;
    console.log('✅ Contract compiled\n');
  }

  console.log('🚀 Deploying contract...');
  
  const contract = new web3.eth.Contract(contractABI);
  
  const deployTx = contract.deploy({
    data: contractBytecode,
    arguments: []
  });

  const gas = await deployTx.estimateGas({ from: account.address });
  console.log('⛽ Estimated gas:', gas.toString());

  const deployedContract = await deployTx.send({
    from: account.address,
    gas: gas.toString(),
    gasPrice: await web3.eth.getGasPrice()
  });

  const contractAddress = deployedContract.options.address;
  
  console.log('\n✅ SpearEscrowV2 deployed successfully!');
  console.log('📍 Contract Address:', contractAddress);
  console.log('🔗 Explorer:', `${EXPLORER_URL}/address/${contractAddress}`);
  
  const newBalance = await web3.eth.getBalance(account.address);
  console.log('💰 Remaining Balance:', web3.utils.fromWei(newBalance, 'ether'), 'PAS\n');

  // Update test page
  console.log('📝 Updating test page...');
  const testPagePath = join(__dirname, '../app/test/page.tsx');
  let testPageContent = fs.readFileSync(testPagePath, 'utf8');
  
  // Replace contract address
  testPageContent = testPageContent.replace(
    /0xeda2FdE00141C5453fBaf3c6856222A289ba3BE6/g,
    contractAddress
  );
  
  // Replace network references
  testPageContent = testPageContent.replace(/Sepolia Testnet/g, 'Polkadot Hub TestNet');
  testPageContent = testPageContent.replace(/sepolia\.etherscan\.io/g, 'blockscout-passet-hub.parity-testnet.parity.io');
  
  fs.writeFileSync(testPagePath, testPageContent);
  console.log('✅ Test page updated\n');

  console.log('🎯 Deployment Summary:');
  console.log('   Network: Polkadot Hub TestNet (Paseo)');
  console.log('   Chain ID: 420420422');
  console.log('   Contract:', contractAddress);
  console.log('   Deployer:', account.address);
  console.log('   Gas Used:', gas.toString());
  
  return contractAddress;
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exitCode = 1;
});
