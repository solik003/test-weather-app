
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  hourlyForecast: any[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyForecast }) => {
    if(!hourlyForecast) {
        return 'no data'
    }

  const chartData = {
    labels: hourlyForecast.map((forecast) => {
      const date = new Date(forecast.dt * 1000);
      return `${date.getHours()}:00`;
    }),
    datasets: [
      {
        label: 'Temperature',
        data: hourlyForecast.map((forecast) => Math.round(forecast.main.temp - 273.15)), 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };


  return <Line data={chartData} />;
};

