// Hardhat config with dotenv support
require('dotenv').config();
module.exports = { solidity: '0.8.20', networks: { polygon: { url: process.env.POLYGON_RPC_URL, accounts: [process.env.PRIVATE_KEY] } } };