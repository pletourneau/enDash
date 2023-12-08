// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorizationCode = localStorage.getItem("access_token");
        const response = await axios.get(
          `http://localhost:3001/api/system-summary?code=${authorizationCode}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {data ? (
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
