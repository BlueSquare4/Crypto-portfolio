// src/App.js
import React, { useContext } from 'react';
import WalletConnection from './WalletConnection';
import { WalletContext } from './WalletContext';

function App() {
  const { walletAddress } = useContext(WalletContext);

  return (
    <div className="App">
      <h1>Crypto Portfolio App</h1>
      <WalletConnection setWalletAddress={useContext(WalletContext).setWalletAddress} />
      {walletAddress && (
        <div>
          <h2>Connected Wallet Address:</h2>
          <p>{walletAddress}</p>
        </div>
      )}
    </div>
  );
}

export default App;
