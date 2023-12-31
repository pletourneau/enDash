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

      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    }),
    datasets: [
      {
        label: "Watt Hours Produced",
        data: filteredIntervals.map((interval) => interval.enwh),

        backgroundColor: "#f37220",

        borderColor: "#5f6062",
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
