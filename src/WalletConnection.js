// src/WalletConnection.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ setWalletAddress }) => {
  const [inputAddress, setInputAddress] = useState('');

  // Function to connect MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User rejected the request or there's an error:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  // Function to handle manual address input
  const handleInputChange = (event) => {
    setInputAddress(event.target.value);
  };

  // Function to set the manually inputted address
  const handleManualInput = () => {
    setWalletAddress(inputAddress);
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask</button>
      <div>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={inputAddress}
          onChange={handleInputChange}
        />
        <button onClick={handleManualInput}>Set Address</button>
      </div>
    </div>
  );
};

export default WalletConnection;
