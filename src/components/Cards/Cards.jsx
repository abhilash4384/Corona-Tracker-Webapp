import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import { Spring, config } from "react-spring/renderprops";

import styles from "./Cards.module.css";

const gridData = [
  {
    title: "INFECTED",
    description: "No of active cases of COVID-19",
    className: "infected",
    key: "confirmed",
  },
  {
    title: "RECOVERED",
    description: "No of recoveries of COVID-19",
    className: "recovered",
    key: "recovered",
  },
  {
    title: "DEATHS",
    description: "No of deaths caused by COVID-19",
    className: "deaths",
    key: "deaths",
  },
];

const Cards = ({ data }) => {
  if (!data || !data.confirmed) {
    return "Loading....";
  }
  const date = new Date(data.lastUpdate).toDateString();
  return (
    <div className={styles.container}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        alignContent="center"
        justify="center"
      >
        {gridData.map((rowData) => (
          <>
            <Grid
              key={rowData.key}
              item
              xs={12}
              md={3}
              component={Card}
              className={cx(styles.card, styles[rowData.className])}
            >
              <CardContent style={{ paddingTop: "15%" }}>
                <Typography
                  align="center"
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                >
                  {rowData.title}
                </Typography>
                <Typography align="center" variant="h5">
                  <CountUp
                    start={0}
                    end={data[rowData.key]?.value}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
                <Typography align="center" gutterBottom>
                  {date}
                </Typography>
              </CardContent>
              <Spring from={{ value: 0 }} to={{ value: 100 }}>
                {(props) => (
                  <CircularProgress
                    size={200}
                    value={props.value}
                    variant="static"
                    className={styles.fabProgress}
                  />
                )}
              </Spring>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
