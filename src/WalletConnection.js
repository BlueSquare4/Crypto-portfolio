import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './WalletConnection.css'; // Import CSS for styling
import walletImage from './assets/images/bcw.jpg'; // Update with the path to your image

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
    <div className="wallet-connection-container">
      <div className="heading-container">
        <h1>Connect Wallet</h1>
        {/* <img src={walletImage} alt="Wallet" className="wallet-image" /> */}
      </div>
      <div className="connection-box">
        <Button variant="outline-danger" size="sm" onClick={connectWallet}>Connect MetaMask</Button>
        <div className="manual-input">
          <input
            type="text"
            placeholder="Enter wallet address"
            value={inputAddress}
            onChange={handleInputChange}
          />
          <Button variant="outline-info" size="sm" onClick={handleManualInput}>Set Address</Button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
