import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { Box } from "@material-ui/core";

const Chart = ({ country, data: { confirmed, recovered, deaths } }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = () => {
    const labels = [];
    const infectedData = [];
    const deathsData = [];
    dailyData.forEach((data) => {
      labels.push(data.date);
      infectedData.push(data.confirmed);
      deathsData.push(data.deaths);
    });

    return (
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              data: infectedData,
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: deathsData,
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    );
  };

  const barChart = () => {
    return (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0,0,255, 0.5)",
                "rgba(0,255, 0, 0.5)",
                "rgba(255,0,0, 0.5)",
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legent: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    );
  };

  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      {dailyData.length && !country ? lineChart() : null}
      {dailyData.length && country ? barChart() : null}
    </Box>
  );
};

export default Chart;
