# 🌐 Web3 Social Network (Secure Version)

A fully functional Web3-based social media dApp built with:
- ✅ React + Vite
- ✅ Hardhat (Solidity Smart Contracts)
- ✅ IPFS (via Web3.Storage)
- ✅ ERC20 tipping system
- ✅ DAO Voting
- ✅ Creator verification
- 🔐 High-level security features

---

## 🚀 Features
- Connect Metamask wallet
- Create on-chain posts (stored via IPFS)
- Tip creators using ERC20 tokens
- DAO voting system
- Verified creator badges (via contract)
- Uses environment variables for sensitive keys

---

## 📦 Tech Stack
- Solidity (Smart Contracts)
- Hardhat
- React.js + Vite
- Ethers.js
- Tailwind CSS
- Web3.Storage
- Polygon Mumbai (Testnet)

---

## 🔧 Setup Instructions

### 1. Clone this Repo
```bash
git clone https://github.com/your-username/web3-social-network.git
cd web3-social-network
```

### 2. Install Dependencies
```bash
npm install
cd frontend
npm install
```

### 3. Set Environment Variables
Create `.env` in the root and in `/frontend/` with:

#### `.env` (Root)
```
PRIVATE_KEY=your_wallet_private_key
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
```

#### `frontend/.env`
```
VITE_SOCIAL_CONTRACT=your_contract_address
VITE_TOKEN_CONTRACT=your_token_address
VITE_DAO_CONTRACT=your_dao_address
VITE_WEB3_STORAGE_TOKEN=your_web3_storage_token
```

### 4. Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network polygon
```

### 5. Run Frontend
```bash
cd frontend
npm run dev
```

---

## 🔐 Security Features
- ✅ ReentrancyGuard for all token and post logic
- 🔒 Ownable contract for admin functions
- 🧼 Input sanitization + rate limit ready
- 🔑 Secrets stored via `.env`

---

## ✅ License
MIT — open-source, modify freely.