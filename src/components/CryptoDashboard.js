// src/components/CryptoDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedToken, setSelectedToken] = useState('bitcoin'); // Default to Bitcoin
  const [cryptoList, setCryptoList] = useState([]);

  // Fetch the list of cryptocurrencies once on component mount
  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        setCryptoList(response.data);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    fetchCryptoList();
  }, []);

  // Fetch the price data whenever the selected token changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedToken}/market_chart?vs_currency=usd&days=30`);
        const prices = response.data.prices;
        const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
        const values = prices.map(price => price[1]);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Price in USD',
              data: values,
              borderColor: 'rgba(0, 123, 255, 0.8)',
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              fill: true
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedToken) {
      fetchData();
    }
  }, [selectedToken]);

  const handleSelectChange = (event) => {
    const newToken = event.target.value;
    if (newToken !== selectedToken) {
      setSelectedToken(newToken);
    }
  };

  return (
    <div>
      <h3>Crypto Dashboard</h3>
      <div>
        <label htmlFor="crypto-select">Select Cryptocurrency:</label>
        <select id="crypto-select" value={selectedToken} onChange={handleSelectChange}>
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>
      </div>
      {data ? (
        <Line data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <p>Select a cryptocurrency to view the chart.</p>
      )}
    </div>
  );
};

export default CryptoDashboard;
