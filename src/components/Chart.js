import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PowerChart = ({ data }) => {
  // Filter out intervals where powr is 0
  const filteredIntervals = data.intervals.filter(
    (interval) => interval.enwh !== 0
  );

  // Transform the filtered data into a format suitable for Chart.js
  const chartData = {
    labels: filteredIntervals.map((interval) => {
      const date = new Date(interval.end_at * 1000);
      return `${
        date.getMonth() + 1
      }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }),
    datasets: [
      {
        label: "Watt Hours",
        data: filteredIntervals.map((interval) => interval.enwh),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default PowerChart;
