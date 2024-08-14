// src/App.js
import React, { useContext } from 'react';
import WalletConnection from './WalletConnection';
import { WalletContext } from './WalletContext';
import WatchList from './components/WatchList';

function App() {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

  return (
    <div className="App">
      <h1>Crypto Portfolio App</h1>

      {/* Wallet Connection Component */}
      <WalletConnection setWalletAddress={setWalletAddress} />

      {walletAddress ? (
        <div>
          <h2>Connected Wallet Address:</h2>
          <p>{walletAddress}</p>

          {/* Render WatchList Component only if a wallet is connected */}
          <WatchList />
        </div>
      ) : (
        <p>Please connect your wallet to view your token watch list.</p>
      )}
    </div>
  );
}

export default App;
