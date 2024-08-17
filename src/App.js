// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useState } from 'react';
import WalletConnection from './WalletConnection';
import { WalletContext } from './WalletContext';
import WatchList from './components/WatchList';
import CryptoDashboard from './components/CryptoDashboard';
import { ReactComponent as WalletIcon } from './wallet.svg';
import { ReactComponent as BlockchainIcon } from './blockchain.svg';

function App() {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  const [selectedToken, setSelectedToken] = useState(null);

  return (
    <div className="App">
      <BlockchainIcon id="blockchain-svg" /> {/* Blockchain SVG animation */}
      <div className="connectadd">
        {!walletAddress ? (
          <div className="d-flex align-items-center">
            <WalletIcon style={{ width: '70px', height: '65px', marginRight: '10px' }} />
            <div>
              <WalletConnection setWalletAddress={setWalletAddress} />
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center mb-4">
              <WalletIcon style={{ width: '70px', height: '65px', marginRight: '10px' }} />
              <div>
                <h2 className="me-2">Connected Wallet Address:</h2>
                <p className="text-gray-700 mb-0">{walletAddress}</p>
              </div>
            </div>
            <div className="mb-4">
              <WatchList onSelectToken={setSelectedToken} />
            </div>
            <CryptoDashboard selectedToken={selectedToken} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
