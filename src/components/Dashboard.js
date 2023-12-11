// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        // const key = process.env.REACT_APP_API_KEY;
        // const sysId = process.env.REACT_APP_SYSTEMID; remnants of when i tried to make API reqs on client side
        const response = await axios.get(
          `http://localhost:3001/api/system-summary`,

          {
            params: {
              code: accessToken,
            },
          }
        );

        console.log("Enphase API Response Status:", response.status);
        console.log("Enphase API Response Headers:", response.headers);
        console.log("Enphase API Response Data:", response.data);

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