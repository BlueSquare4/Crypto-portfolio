import React, { useState } from 'react';
import './InteractiveSVG.css'; // Import CSS for styling

const InteractiveSVG = () => {
  const [description, setDescription] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState({ display: 'none' });
  const [rotated, setRotated] = useState(false);

  // Array of cryptocurrency descriptions
  const descriptions = [
    "Bitcoin (BTC) is a decentralized digital currency without a central bank or single administrator.",
    "Ethereum (ETH) is a decentralized platform that enables smart contracts and decentralized applications.",
    "Litecoin (LTC) is a peer-to-peer cryptocurrency created as a 'lighter' version of Bitcoin.",
    "Ripple (XRP) is a digital payment protocol and cryptocurrency used for real-time gross settlement."
  ];

  // Function to handle click and cycle through descriptions
  const handleClick = (event) => {
    // Cycle to the next description
    const currentIndex = descriptions.indexOf(description);
    const nextIndex = (currentIndex + 1) % descriptions.length;
    setDescription(descriptions[nextIndex]);

    // Set dropdown style to be on the right side of the page
    setDropdownStyle({
      display: 'block',
      position: 'fixed', // Position fixed to stay on the right side
      top: '20px', // Adjust as needed
      right: '20px', // Position it from the right
      width: '250px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '8px', // Rounded corners
      boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
      color: '#333',
      zIndex: 1000,
      transform: rotated ? 'rotateX(360deg)' : 'rotateX(0deg)', // Rotation
      transition: 'transform 0.5s ease' // Smooth transition for rotation
    });

    // Toggle rotation
    setRotated(!rotated);
  };

  return (
    <div>
      <svg width="250" height="100" viewBox="0 0 250 100" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="10"
          y="10"
          width="230"
          height="80"
          fill="#f4a261"
          stroke="#e76f51"
          strokeWidth="2"
          onClick={handleClick}
        />
        <text x="125" y="55" fontSize="20" textAnchor="middle" fill="#fff">Famous Cryptocurrency</text>
      </svg>
      <div style={dropdownStyle} className="dropdown-box">{description}</div>
    </div>
  );
};

export default InteractiveSVG;
