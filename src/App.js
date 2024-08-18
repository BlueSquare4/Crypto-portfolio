import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useState } from 'react';
import WalletConnection from './WalletConnection';
import { WalletContext } from './WalletContext';
import WatchList from './components/WatchList';
import CryptoDashboard from './components/CryptoDashboard';
import { ReactComponent as WalletIcon } from './wallet.svg';
import CryptoGuide from './components/CryptoGuide';
import InteractiveSVG from './components/InteractiveSVG'; // Import InteractiveSVG
import TokenTransfer from './components/TokenTransfer'; // Import TokenTransfer component

function App() {
  const { walletAddress, setWalletAddress, contract } = useContext(WalletContext);
  const [selectedToken, setSelectedToken] = useState(null);

  return (
    <div className="App">
      <header>
        <h1 className="app-heading">Welcome to MyCrypto Wallet 🪙</h1>
      </header>

      {/* <BlockchainIcon id="blockchain-svg" /> Blockchain SVG animation */}
      <InteractiveSVG /> {/* Include InteractiveSVG component */}
      <CryptoGuide />
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
            <div className="mb-4">
              <TokenTransfer contract={contract} /> {/* Add the TokenTransfer component */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
