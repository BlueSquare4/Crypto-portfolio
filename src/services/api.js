// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3'; // Example URL for CoinGecko

export const fetchHistoricalData = async (tokenId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${tokenId}/market_chart/range`, {
      params: {
        vs_currency: 'usd',
        from: Math.floor(new Date(startDate).getTime() / 1000),
        to: Math.floor(new Date(endDate).getTime() / 1000),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};
