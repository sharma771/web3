import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage';
import SocialNetwork from "../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json";
import ERC20Token from "../../artifacts/contracts/ERC20Token.sol/ERC20Token.json";
import DAOContract from "../../artifacts/contracts/DAOContract.sol/DAOContract.json";
import { socialNetworkAddress, tokenAddress, daoAddress } from "./config";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [token, setToken] = useState(null);
  const [dao, setDAO] = useState(null);
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [tipAmount, setTipAmount] = useState("0.1");

  useEffect(() => {
    async function init() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const acc = await signer.getAddress();
      setAccount(acc);

      const social = new ethers.Contract(socialNetworkAddress, SocialNetwork.abi, signer);
      const tok = new ethers.Contract(tokenAddress, ERC20Token.abi, signer);
      const dao = new ethers.Contract(daoAddress, DAOContract.abi, signer);
      setContract(social);
      setToken(tok);
      setDAO(dao);

      const count = await social.getPostCount();
      const loadedPosts = [];
      for (let i = 1; i <= count; i++) {
        const p = await social.posts(i);
        loadedPosts.push(p);
      }
      setPosts(loadedPosts.reverse());
    }
    init();
  }, []);

  const handlePost = async () => {
    if (!post) return;
    const client = new Web3Storage({ token: import.meta.env.VITE_WEB3_STORAGE_TOKEN });
    const blob = new Blob([post], { type: 'text/plain' });
    const cid = await client.put([new File([blob], 'post.txt')]);
    const url = `https://${cid}.ipfs.w3s.link/post.txt`;
    const tx = await contract.createPost(url);
    await tx.wait();
    setPost("");
    window.location.reload();
  };

  const handleTip = async (author) => {
    const amount = ethers.utils.parseUnits(tipAmount, 18);
    const tx = await token.transfer(author, amount);
    await tx.wait();
    alert("Tipped successfully!");
  };

  const handleVote = async () => {
    const tx = await dao.voteOnProposal(0, true);
    await tx.wait();
    alert("Voted successfully!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Secure Web3 Social Network</h1>
      <p className="mb-2">Connected as: {account}</p>
      <textarea
        className="w-full border p-2 mb-2"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handlePost} className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>

      <div className="mt-6">
        {posts.map((p, idx) => (
          <div key={idx} className="border-b py-2">
            <a href={p.content} target="_blank" rel="noopener noreferrer" className="text-sm underline">View Post</a>
            <p className="text-xs text-gray-500">by {p.author} {p.verified && <span className="text-green-500 ml-1">✔️</span>}</p>
            <input
              type="text"
              className="border px-2 py-1 text-sm mr-2"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
            />
            <button onClick={() => handleTip(p.author)} className="text-white bg-green-600 px-3 py-1 rounded text-sm">Tip</button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">DAO Voting</h2>
        <button onClick={handleVote} className="bg-purple-600 text-white px-4 py-2 rounded">Vote on Proposal #0</button>
      </div>
    </div>
  );
}

export default App;
