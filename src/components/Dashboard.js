import React, { useState, useEffect } from "react";
import axios from "axios";
import PowerChart from "./Chart";
import "../index.css";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        console.log({ accessToken });
        const now = Math.floor(Date.now() / 1000);
        console.log(now);
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

  let content;

  if (data === null) {
    // Data is still loading
    content = <p>Loading...</p>;
  } else if (data.intervals && data.intervals.length > 0) {
    // Data has loaded and contains intervals
    // const filteredIntervals = data.intervals.filter(
    //   (interval) => interval.powr !== 0
    // );
    console.log(data);
    // const transformedData = filteredIntervals.map((interval) => {
    //   const dateTime = new Date(interval.end_at * 1000);
    //   const mm = String(dateTime.getMonth() + 1).padStart(2, "0");
    //   const dd = String(dateTime.getDate()).padStart(2, "0");
    //   const hh = String(dateTime.getHours()).padStart(2, "0");
    //   const min = String(dateTime.getMinutes()).padStart(2, "0");
    //   const formattedDate = `${mm}/${dd} ${hh}:${min}`;
    //   return (
    //     <p key={interval.end_at}>
    //       {formattedDate}: {interval.powr}
    //     </p>
    //   );
    // });

    content = (
      <div>
        <div className="flex-grid">test</div>
        <div className="flex-grid">
          <div className="col-4">
            <div className="row-4">Status area</div>
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
    // Data has loaded but there are no valid intervals
    content = <p>No data available.</p>;
  }

  return content;
};

export default Dashboard;
