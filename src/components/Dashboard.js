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
      expiresAt: query.get("expires_at"),
    };
  };

  useEffect(() => {
    const { accessToken, refreshToken, expiresAt } = getTokensFromURL();
    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("expires_at", expiresAt);
      // Remove the token from URL for security reasons
      window.history.pushState({}, document.title, "/dashboard");
    }
    const storedAccessToken = localStorage.getItem("access_token");
    console.log({ storedAccessToken });

    if (!storedAccessToken) {
      console.log("No access token found");
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    // console.log(now);

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/micros-telemetry", {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
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

  const getTotalPowerAndElapsedTime = (data) => {
    let totalPower = 0;
    let startTime = Infinity;
    let endTime = -Infinity;

    if (data && data.intervals) {
      data.intervals.forEach((interval) => {
        totalPower += interval.enwh || 0;
        startTime = Math.min(startTime, interval.end_at || Infinity);
        endTime = Math.max(endTime, interval.end_at || -Infinity);
      });
    }

    const timeElapsedInSeconds =
      startTime !== Infinity && endTime !== -Infinity ? endTime - startTime : 0;
    const timeElapsedInHours = timeElapsedInSeconds / 3600;

    const kWh = Math.floor(totalPower / 1000);
    return {
      kWh,
      timeElapsedInHours,
    };
  };

  const { kWh, timeElapsedInHours } = getTotalPowerAndElapsedTime(data);
  console.log("Total kWh", kWh);
  console.log("Time Elapsed:", timeElapsedInHours, "hours");

  const getStatusMessage = () => {
    if (data && data.meta && data.meta.status) {
      return data.meta.status === "normal"
        ? "Normal"
        : `Alert: ${data.meta.status}`;
    }
    return "Status Unavailable";
  };
  let content;

  if (data === null) {
    content = <p>Loading...</p>;
  } else if (data.intervals && data.intervals.length > 0) {
    console.log(data);

    content = (
      <div>
        <div className="flex-grid">
          <div className="col-4">
            <div className="statusCol">
              <img
                className="ico"
                src={ico}
                style={{ color: getStatusColor() }}
                alt="Status Icon Normal"
              />
              <p>Status: {getStatusMessage()}</p>
            </div>
            <div className="kWhCol">
              <div id="box">
                <h5>Production Today</h5>
                <h1 id="num">{kWh} kWh</h1>
              </div>
            </div>

            <div className="hippie">
              How many trees you saved cause you a hippie
            </div>
          </div>
          <div className="col-8">{data && <PowerChart data={data} />}</div>
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
