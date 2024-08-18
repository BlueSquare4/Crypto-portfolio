// src/components/CryptoGuide.js
import React from 'react';
import './CryptoGuide.css'; // Import the CSS file for styling

const CryptoGuide = () => {
  return (
    <div className="crypto-guide">
      <h2>How to Use This Website</h2>
      <ol>
        <li><strong>Connect Your Wallet:</strong> Click on the wallet icon to connect your cryptocurrency wallet.</li>
        <li><strong>Explore Cryptocurrencies:</strong> Browse through different cryptocurrencies displayed on the dashboard.</li>
        <li><strong>Add to Watchlist:</strong> Select your favorite cryptocurrencies and add them to your watchlist.</li>
        <li><strong>Track Your Portfolio:</strong> Monitor your portfolio’s performance and see real-time updates.</li>
        <li><strong>Read the Guides:</strong> Check out our guides and resources to learn more about cryptocurrencies and trading.</li>
      </ol>
    </div>
  );
};

export default CryptoGuide;
