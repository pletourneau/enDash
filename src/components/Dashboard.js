import React, { useState, useEffect } from "react";
import axios from "axios";
import PowerChart from "./Chart";
import "../index.css";
import ico from "../img/favicon.ico";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const getTokensFromURL = () => {
    const query = new URLSearchParams(window.location.search);
    return {
      accessToken: query.get("access_token"),
      refreshToken: query.get("refresh_token"),
    };
  };

  useEffect(() => {
    const { accessToken, refreshToken, expiresIn } = getTokensFromURL();
    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("expires_in", expiresIn);
      // Remove the token from URL for security reasons
      window.history.pushState({}, document.title, "/dashboard");
    }
    const storedAccessToken = localStorage.getItem("access_token");
    console.log({ storedAccessToken });
    const storedRefreshToken = localStorage.getItem("refresh_token");
    console.log({ storedRefreshToken });
    const expiresInStore = localStorage.getItem("expires_in");
    console.log({ expiresInStore });
    if (!storedAccessToken) {
      // Handle the absence of a token (e.g., redirect to login)
      console.log("No access token found");
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    console.log(now);

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/system-summary", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            key: process.env.REACT_APP_API_KEY,
          },
          params: {
            end_at: now,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = () => {
    return data && data.meta && data.meta.status === "normal"
      ? "green"
      : "darkred";
  };

  let content;

  if (data === null) {
    content = <p>Loading...</p>;
  } else if (data.intervals && data.intervals.length > 0) {
    console.log(data);

    content = (
      <div>
        <div className="flex-grid">Still need a header paul</div>
        <div className="flex-grid">
          <div className="col-4">
            <div className="row-4">
              <img src={ico} style={{ color: getStatusColor() }} />
            </div>
            <div className="row-8">
              How many trees you saved cause you a hippie
            </div>
          </div>
          <div className="col-8">
            <h2>Dashboard</h2>
            {data && <PowerChart data={data} />}
          </div>
        </div>
        <div className="flex-grid-thirds"></div>
      </div>
    );
  } else {
    content = <p>No data available.</p>;
  }

  return content;
};

export default Dashboard;
