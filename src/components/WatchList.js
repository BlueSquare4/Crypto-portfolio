// src/components/WatchList.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const WatchList = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [watchList, setWatchList] = useState([]);
  
  // Fetch the watchlist from Firestore on component mount
  useEffect(() => {
    const fetchWatchList = async () => {
      const querySnapshot = await getDocs(collection(db, 'tokens'));
      const tokens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWatchList(tokens);
    };
    fetchWatchList();
  }, []);

  // Function to fetch token balance
  const getTokenBalance = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(address, [
      // ABI: only include the balanceOf function
      'function balanceOf(address owner) view returns (uint256)'
    ], provider);

    const signer = provider.getSigner();
    const balance = await tokenContract.balanceOf(await signer.getAddress());
    return ethers.utils.formatEther(balance);
  };

  // Function to add a token to the watchlist
  const addToken = async () => {
    if (!ethers.utils.isAddress(tokenAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    try {
      const balance = await getTokenBalance(tokenAddress);
      const newToken = { address: tokenAddress, balance };
      
      // Add token to Firebase
      const docRef = await addDoc(collection(db, 'tokens'), newToken);
      setWatchList([...watchList, { id: docRef.id, ...newToken }]);
      setTokenAddress('');
    } catch (error) {
      console.error('Error adding token:', error);
    }
  };

  // Function to remove a token from the watchlist
  const removeToken = async (id) => {
    try {
      await deleteDoc(doc(db, 'tokens', id));
      setWatchList(watchList.filter(token => token.id !== id));
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <div>
      <h2>Token Watch List</h2>
      <input 
        type="text" 
        placeholder="Enter Token Contract Address" 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
      />
      <button onClick={addToken}>Add Token</button>
      
      <ul>
        {watchList.map(token => (
          <li key={token.id}>
            <span>{token.address} - Balance: {token.balance} ETH</span>
            <button onClick={() => removeToken(token.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
