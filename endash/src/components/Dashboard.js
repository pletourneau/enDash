import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from the Enphase Energy API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.enphaseenergy.com/some-endpoint",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include the access token
            },
          }
        );

        // Set the data in the state
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors
      }
    };

    // Call the fetch data function
    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h2>Dashboard</h2>
      {data ? (
        <div>
          {/* Render your data here */}
          {/* Example: */}
          <p>{data.someProperty}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
