// src/components/CryptoGuide.js
import React from 'react';
import './CryptoGuide.css'; // Import the CSS file for styling

const CryptoGuide = () => {
  return (
    <div className="crypto-guide">
      <h2>How to Use This Website</h2>
      <ol>
        <li><strong>Connect Your Wallet:</strong> Click on the wallet icon to connect your cryptocurrency wallet and view your wallet address.</li>
        <li><strong>Explore Cryptocurrencies:</strong> Browse through the dashboard to view different cryptocurrencies, including their real-time prices and other key details.</li>
        <li><strong>Add to Watchlist:</strong> Select your favorite cryptocurrencies and add them to your watchlist for easy tracking.</li>
        <li><strong>Track Your Portfolio:</strong> Monitor your portfolio’s performance with detailed analytics and historical data visualizations.</li>
        <li><strong>Token Transfer:</strong> Use the transfer form to send tokens to other addresses securely.</li>
        <li><strong>Interactive SVG Animations:</strong> Enjoy the dynamic SVG animations that provide a visually engaging experience on the site.</li>
        <li><strong>Read the Guides:</strong> Access our resources to deepen your understanding of cryptocurrencies, trading, and blockchain technology.</li>
      </ol>
    </div>
  );
};

export default CryptoGuide;
