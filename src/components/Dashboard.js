import React, { useState, useEffect } from "react";
import axios from "axios";
import PowerChart from "./Chart";
import "../index.css";
import ico from "../img/favicon.ico";
import bob from "../img/BobR.png";

const Dashboard = () => {
  // const [data, setData] = useState(null);
  const [data, setData] = useState({ summary: null, telemetry: null });

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

      window.history.pushState({}, document.title, "/dashboard");
    }
    const storedAccessToken = localStorage.getItem("access_token");

    if (!storedAccessToken) {
      console.log("No access token found");
      return;
    }

    const now = Math.floor(Date.now() / 1000);

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

        // const summaryResponse = await axios.get("/api/system-detail", {
        //   headers: {
        //     Authorization: `Bearer ${storedAccessToken}`,
        //     key: process.env.REACT_APP_API_KEY,
        //   },
        //   params: {
        //     end_at: now,
        //   },
        // });

        setData({
          summary: response.data.summary,
          telemetry: response.data.telemetry,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = () => {
    return data.summary && data.summary.status === "normal"
      ? "green"
      : "darkred";
  };

  const getTotalPowerAndElapsedTime = (telemetryData) => {
    let totalPower = 0;
    let startTime = Infinity;
    let endTime = -Infinity;

    if (telemetryData && telemetryData.intervals) {
      telemetryData.intervals.forEach((interval) => {
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
  // const energyTodayTest = data.summary ? data.summary.energy_today / 1000 : 0;
  const energyLifetimeKWh = data.summary
    ? Math.floor(data.summary.energy_lifetime / 1000)
    : 0;

  const happyTrees = Math.floor(energyLifetimeKWh * 0.012);

  const { kWh, timeElapsedInHours } = getTotalPowerAndElapsedTime(
    data.telemetry
  );
  // console.log("Total kWh", kWh);
  // console.log("Time Elapsed:", timeElapsedInHours, "hours");

  const getStatusMessage = () => {
    if (data.summary && data.summary.status) {
      return data.summary.status === "normal"
        ? "Normal"
        : `Alert: ${data.summary.status}`;
    }
    return "Status Unavailable";
  };

  let content;

  if (data.summary === null && data.telemetry === null) {
    content = <p>Loading...</p>;
  } else if (
    data.telemetry &&
    data.telemetry.intervals &&
    data.telemetry.intervals.length > 0
  ) {
    // console.log(data);

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
              <div className="prod today">
                <h5>TODAY</h5>
                <h3 className="num">{kWh} kWh</h3>
              </div>
              <div className="prod lifetime">
                <h5>LIFETIME</h5>
                <h3 className="num">{energyLifetimeKWh} kWh</h3>
              </div>
            </div>

            <div className="hippie">
              <img src={bob} alt="Bob friggin Ross" />
              <h3>
                Your lifetime production is the equivalent of {happyTrees} happy
                little tree seedlings grown over 10 years
              </h3>
              <div id="refBut">
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div>Refer a Friend</div>
                </a>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div>{data.telemetry && <PowerChart data={data.telemetry} />}</div>
            <div>
              <a href="mailto:someone@example.com?subject=Mail from Our Site">
                <div className="email">
                  Click here to send an email to our service team
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    content = <p>No data available.</p>;
  }

  return content;
};

export default Dashboard;
