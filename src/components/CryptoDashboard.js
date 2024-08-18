// src/components/CryptoDashboard.js
import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dollarSvg from '../dollar.svg';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedToken, setSelectedToken] = useState('bitcoin'); // Default to Bitcoin
  const [cryptoList, setCryptoList] = useState([]);
  const [news, setNews] = useState([]); // State to store news articles
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page

  const NEWS_API_KEY = 'e3d16c6bfa0e48669805a920313d6d94'; // Replace with your actual NewsAPI key
  const NEWS_PER_PAGE = 10; // Number of news articles to show per page

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

  // Fetch the news data whenever the selected token changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${selectedToken}&apiKey=${NEWS_API_KEY}`);
        setNews(response.data.articles);
        setCurrentPage(1); // Reset to the first page when the selected token changes
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    if (selectedToken) {
      fetchNews();
    }
  }, [selectedToken]);

  const handleSelectChange = (event) => {
    const newToken = event.target.value;
    if (newToken !== selectedToken) {
      setSelectedToken(newToken);
    }
  };

  // Calculate the current news to display based on pagination
  const indexOfLastNews = currentPage * NEWS_PER_PAGE;
  const indexOfFirstNews = indexOfLastNews - NEWS_PER_PAGE;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(news.length / NEWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h3>Crypto Trend Dashboard</h3>
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


      <div className="crypto-header">
      <h4>Recent News Related to {selectedToken.toUpperCase()}</h4>
      <img src={dollarSvg} alt="Rotating Dollar Sign" className="rotating-svg" />
    </div>
      <div style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginTop: '5px',
        height: '300px',
        width: '700px', // Fixed height
        overflowY: 'auto' // Enable vertical scrolling
        // overflowX: 'hidden', // Disable horizontal scrolling
      }}>
      
        {currentNews.length > 0 ? (
          <ul>
            {currentNews.map((article, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                <p>{article.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available for the selected cryptocurrency.</p>
        )}
     
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    </div>
  );
};

export default CryptoDashboard;
