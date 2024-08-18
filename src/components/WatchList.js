import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider, Contract } from 'ethers';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const WatchList = ({ onSelectToken }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('');
  const [balanceInfo, setBalanceInfo] = useState('ETH - 0 tokens');

  // Function to get the network name
  const getNetworkName = useCallback(async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      return network.name;
    } catch (error) {
      console.error('Error fetching network:', error);
      return 'unknown';
    }
  }, []);

  // Function to fetch token balance
  const getTokenBalance = useCallback(async (address) => {
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
      return '0';
    }
  }, []);

  // Update balance information
  const updateBalanceInfo = useCallback(async (tokens) => {
    if (tokens.length === 0) {
      setBalanceInfo(`ETH - 0 tokens`);
      return;
    }
    
    const networkName = await getNetworkName();
    setNetwork(networkName);

    let totalBalance = 0;
    for (const token of tokens) {
      const balance = await getTokenBalance(token.address);
      totalBalance += parseFloat(balance);
    }

    setBalanceInfo(`${networkName.toUpperCase()} - ${totalBalance.toFixed(4)} tokens`);
  }, [getNetworkName, getTokenBalance]);

  // Fetch the watchlist from Firestore on component mount
  useEffect(() => {
    const fetchWatchList = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'tokens'));
        const tokens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWatchList(tokens);
        await updateBalanceInfo(tokens);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchList();
  }, [updateBalanceInfo]);

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
      const updatedTokens = [...watchList, { id: docRef.id, ...newToken }];
      setWatchList(updatedTokens);
      await updateBalanceInfo(updatedTokens);
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
      const updatedWatchList = watchList.filter(token => token.id !== id);
      setWatchList(updatedWatchList);
      await updateBalanceInfo(updatedWatchList);
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
      <div>
        <p>{balanceInfo}</p>
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
            {watchList.length === 0 ? (
              <p>No tokens available in your watchlist.</p>
            ) : (
              watchList.map(token => (
                <li key={token.id}>
                  <span>{token.address} - Balance: {token.balance} ETH</span>
                  <button onClick={() => handleSelectToken(token.address)} disabled={loading}>
                    View Historical Data
                  </button>
                  <button onClick={() => removeToken(token.id)} disabled={loading}>
                    {loading ? 'Removing...' : 'Remove'}
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WatchList;
