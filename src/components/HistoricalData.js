// src/components/HistoricalData.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchHistoricalData } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HistoricalData = ({ tokenId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        const result = await fetchHistoricalData(tokenId, startDate, endDate);
        const formattedData = result.prices.map(price => ({
          date: new Date(price[0]).toLocaleDateString(),
          value: price[1],
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    if (tokenId) {
      getHistoricalData();
    }
  }, [tokenId, startDate, endDate]);

  return (
    <div>
      <h2>Historical Data</h2>
      <div>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalData;
