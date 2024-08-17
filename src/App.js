// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useState } from 'react';
import WalletConnection from './WalletConnection';
import { WalletContext } from './WalletContext';
import WatchList from './components/WatchList';
import HistoricalData from './components/HistoricalData'; // Ensure the path is correct
import TokenAllowance from './components/TokenAllowance'; // Import the TokenAllowance component
import { Button } from 'react-bootstrap';

function App() {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  const [selectedToken, setSelectedToken] = useState(null); // State to hold the selected token ID

  return (
    <div >
      <div className="connectadd" >
        {!walletAddress ? (
          <div>
            <h1>Connect to Wallet</h1>
            <WalletConnection setWalletAddress={setWalletAddress} />
          </div>
        ) : (
          <div>
            <h2 className="connect-wallet">Connected Wallet Address:</h2>
            <p className="text-gray-700 mb-4">{walletAddress}</p>

            <div className="mb-4">
              <WatchList onSelectToken={setSelectedToken} />
            </div>
          </div>
        )}
      </div>
    </div>
  );

    // return (
  //   <div className="App">
  //     <h1>Crypto Portfolio App</h1>

  //     {/* Wallet Connection Component */}
  //     <WalletConnection setWalletAddress={setWalletAddress} />

  //     {walletAddress ? (
  //       <div>
  //         <h2>Connected Wallet Address:</h2>
  //         <p>{walletAddress}</p>

  //         {/* Render WatchList Component */}
  //         <WatchList onSelectToken={setSelectedToken} />

  //         {/* Render HistoricalData Component */}
  //         {selectedToken && (
  //           <div>
  //             <h2>Historical Data for {selectedToken}</h2>
  //             <HistoricalData tokenId={selectedToken} />
  //           </div>
  //         )}

  //         {/* Render TokenAllowance Component */}
  //         <div>
  //           {/* <h2>Check Token Allowance</h2> */}
  //           <TokenAllowance />
  //         </div>
  //       </div>
  //     ) : (
  //       <p>Please connect your wallet to view your token watch list.</p>
  //     )}
  //   </div>
  // );
}

export default App;
