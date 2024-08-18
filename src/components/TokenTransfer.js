// src/components/TokenTransfer.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useContext } from 'react';
import { WalletContext } from '../WalletContext';
import { Button, Form } from 'react-bootstrap';

const TokenTransfer = () => {
  const { contract } = useContext(WalletContext);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleTransfer = async () => {
    if (!contract) {
      setStatus('Contract is not loaded.');
      return;
    }

    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18)); // Adjust decimals as needed
      setStatus('Transaction sent: ' + tx.hash);
      await tx.wait();
      setStatus('Transaction confirmed');
    } catch (error) {
      setStatus('Transaction failed: ' + error.message);
    }
  };

  return (
    <div>
      <h3>Token Transfer</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Recipient Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter recipient address" 
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleTransfer}>
          Transfer
        </Button>
      </Form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default TokenTransfer;
