import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [timeframe, setTimeframe] = useState('daily');

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); 
      });
  }, []);

  const handleClick = (data, index) => {
    alert(`Clicked on: ${data.timestamp} - Value: ${data.value}`);
  };

  const handleExport = () => {
    htmlToImage.toPng(chartRef.current)
      .then((dataUrl) => {
        download(dataUrl, 'chart.png');
      });
  };

  const filterData = () => {
    switch (timeframe) {
      case 'daily':
        return data; 
      case 'weekly':
        return aggregateDataByWeek(data);
      case 'monthly':
        return aggregateDataByMonth(data);
      default:
        return data;
    }
  };

  const aggregateDataByWeek = (data) => {
    
    const aggregatedData = {};
    data.forEach((item) => {
      const week = getWeekNumber(new Date(item.timestamp));
      if (!aggregatedData[week]) {
        aggregatedData[week] = { timestamp: `Week ${week}`, value: 0 };
      }
      aggregatedData[week].value += item.value;
    });
    return Object.values(aggregatedData);
  };

  const aggregateDataByMonth = (data) => {
    
    const aggregatedData = {};
    data.forEach((item) => {
      const month = new Date(item.timestamp).toLocaleString('default', { month: 'long' });
      if (!aggregatedData[month]) {
        aggregatedData[month] = { timestamp: month, value: 0 };
      }
      aggregatedData[month].value += item.value;
    });
    return Object.values(aggregatedData);
  };

  const getWeekNumber = (date) => {
    
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  return (
    <div className="App">
      <h1 className='heading'>Chart Report</h1>
      <div>
        <button className='btn' onClick={() => setTimeframe('daily')}>Daily</button>
        <button className='btn' onClick={() => setTimeframe('weekly')}>Weekly</button>
        <button className='btn' onClick={() => setTimeframe('monthly')}>Monthly</button>
        <button className='btn' onClick={handleExport}>Export as PNG</button>
      </div>
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={filterData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={(e) => handleClick(e.activePayload[0].payload, e.activeTooltipIndex)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <p>Filtered Data Length: {filteredData.length}</p>
      </div>
    </div>
  );
};

export default App;
