// src/components/WatchList.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider,Web3Provider, Contract } from 'ethers';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const WatchList = ({ onSelectToken }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the watchlist from Firestore on component mount
  useEffect(() => {
    const fetchWatchList = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'tokens'));
        const tokens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWatchList(tokens);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchList();
  }, []);

  // Function to fetch token balance
  const getTokenBalance = async (address) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const tokenContract = new Contract(address, [
        'function balanceOf(address owner) view returns (uint256)'
      ], provider);

      const signer = provider.getSigner();
      const balance = await tokenContract.balanceOf(await signer.getAddress());
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw new Error('Unable to fetch token balance');
    }
  };

  // Function to add a token to the watchlist
  const addToken = async () => {
    if (!ethers.isAddress(tokenAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }
  
    if (watchList.some(token => token.address === tokenAddress)) {
      alert('Token is already in your watchlist');
      return;
    }
  
    setLoading(true);
    try {
      const balance = await getTokenBalance(tokenAddress);
      const newToken = { address: tokenAddress, balance };
  
      const docRef = await addDoc(collection(db, 'tokens'), newToken);
      setWatchList([...watchList, { id: docRef.id, ...newToken }]);
      setTokenAddress('');
    } catch (error) {
      console.error('Error adding token:', error);
      alert('There was an error adding the token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a token from the watchlist
  const removeToken = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'tokens', id));
      setWatchList(watchList.filter(token => token.id !== id));
    } catch (error) {
      console.error('Error removing token:', error);
      alert('There was an error removing the token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle token selection
  const handleSelectToken = (address) => {
    onSelectToken(address);
  };

  return (
    <div>
      <h2>Token Watch List</h2>
      <input 
        type="text" 
        placeholder="Token Contract Address" 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
        disabled={loading}
      />
      <button onClick={addToken} disabled={loading}>
        {loading ? 'Adding...' : 'Add Token'}
      </button>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {watchList.map(token => (
            <li key={token.id}>
              <span>{token.address} - Balance: {token.balance} ETH</span>
              <button onClick={() => handleSelectToken(token.address)} disabled={loading}>
                View Historical Data
              </button>
              <button onClick={() => removeToken(token.id)} disabled={loading}>
                {loading ? 'Removing...' : 'Remove'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchList;
