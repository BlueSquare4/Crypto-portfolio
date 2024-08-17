// src/components/TokenAllowance.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider, Contract } from "ethers";

const TokenAllowance = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [allowance, setAllowance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch token allowance
  const checkAllowance = async () => {
    if (!ethers.isAddress(tokenAddress) || !ethers.isAddress(spenderAddress)) {
      alert('Please enter valid Ethereum addresses');
      return;
    }

    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      // ABI: only include the allowance function
      const tokenContract = new Contract(tokenAddress, [
        'function allowance(address owner, address spender) view returns (uint256)'
      ], provider);

      const allowance = await tokenContract.allowance(userAddress, spenderAddress);
      setAllowance(ethers.formatEther(allowance));
    } catch (error) {
      console.error('Error fetching allowance:', error);
      alert('Unable to fetch allowance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Check Token Allowance</h2>
      <input 
        type="text" 
        placeholder="Enter Token Contract Address" 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
        disabled={loading}
      />
      <input 
        type="text" 
        placeholder="Enter Spender Address" 
        value={spenderAddress} 
        onChange={(e) => setSpenderAddress(e.target.value)} 
        disabled={loading}
      />
      <button onClick={checkAllowance} disabled={loading}>
        {loading ? 'Checking...' : 'Check Allowance'}
      </button>

      {allowance !== null && (
        <div>
          <h3>Allowance:</h3>
          <p>{allowance} ETH</p>
        </div>
      )}
    </div>
  );
};

export default TokenAllowance;
