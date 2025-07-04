const hre = require("hardhat");

async function main() {
  // Deploy SocialNetwork
  const SocialNetwork = await hre.ethers.getContractFactory("SocialNetwork");
  const socialNetwork = await SocialNetwork.deploy();
  await socialNetwork.deployed();
  console.log("✅ SocialNetwork deployed to:", socialNetwork.address);

  // Deploy ERC20 Token
  const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
  const token = await ERC20Token.deploy();
  await token.deployed();
  console.log("✅ ERC20 Token deployed to:", token.address);

  // Deploy DAO
  const DAOContract = await hre.ethers.getContractFactory("DAOContract");
  const dao = await DAOContract.deploy();
  await dao.deployed();
  console.log("✅ DAO Contract deployed to:", dao.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
