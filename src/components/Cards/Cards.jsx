import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

const gridData = [
  {
    title: "Infected",
    description: "No of active cases of COVID-19",
    className: "infected",
    key: "confirmed",
  },
  {
    title: "Recovered",
    description: "No of recoveries of COVID-19",
    className: "recovered",
    key: "recovered",
  },
  {
    title: "Deaths",
    description: "No of deaths caused by COVID-19",
    className: "deaths",
    key: "deaths",
  },
];

const Cards = ({ data }) => {
  if (!data || !data.confirmed) {
    return "Loading....";
  }
  // const date = new Date(data.lastUpdate).toDateString();
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {gridData.map((rowData) => (
          <Grid
            key={rowData.key}
            item
            xs={12}
            md={3}
            component={Card}
            className={cx(styles.card, styles[rowData.className])}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {rowData.title}
              </Typography>
              <Typography variant="h5">
                <CountUp
                  start={0}
                  end={data[rowData.key]?.value}
                  duration={2.5}
                  separator=","
                />
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
