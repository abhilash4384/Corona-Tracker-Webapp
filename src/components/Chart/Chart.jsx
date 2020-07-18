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
        options={{
          responsive: true,
          title: { text: "Test Title" },
          scales: {
            gridLines: {
              color: "rgba(160, 160, 160,0.5)",
              zeroLineColor: "rgba(160, 160, 160, 1)",
            },
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Date",
                  fontColor: "rgb(197, 217, 241, 1)",
                  fontSize: 14,
                },
                gridLines: {
                  color: "rgba(160, 160, 160,0.5)",
                  zeroLineColor: "rgba(160, 160, 160, 1)",
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "rgb(197, 217, 241, 1)",
                },
              },
            ],
            yAxes: [
              {
                type: "linear",
                position: "left",
                scalePositionLeft: true,
                display: true,
                yAxesID: "y-axis-1",
                scaleLabel: {
                  display: true,
                  labelString: "Frequency of Occurence",
                  fontColor: "rgb(197, 217, 241, 1)",
                  fontSize: 14,
                },
                gridLines: {
                  color: "rgba(120, 120, 120,0.5)",
                  zeroLineColor: "rgba(160, 160, 160, 1)",
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "rgb(197, 217, 241, 1)",
                  stepSize: 5,
                  maxTicksLimit: 20,
                },
              },
              {
                type: "linear",
                position: "right",
                display: true,
                id: "y-axis-2",
                scaleLabel: {
                  display: true,
                  fontColor: "rgb(197, 217, 241, 1)",
                  fontSize: 14,
                },
                gridLines: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "rgb(197, 217, 241, 1)",
                  stepSize: 5,
                  maxTicksLimit: 20,
                },
              },
            ],
          },
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
