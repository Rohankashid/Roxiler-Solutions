import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js'; // import Chart and registerables
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables); // register the controllers

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: data.map(item => item.range),
      datasets: [
        {
          label: 'Number of Items',
          data: data.map(item => item.count),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    chartRef.current = new ChartJS(document.getElementById('barChart'), {
      type: 'bar',
      data: chartData,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bar-chart">
      <h2>Price Range Distribution</h2>
      <canvas id="barChart"></canvas>
    </div>
  );
};

export default BarChart;