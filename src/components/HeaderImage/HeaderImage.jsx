import React, { memo } from "react";
import coronaImg from "../../images/image.png";
import styles from "./HeaderImage.module.css";
import { Box } from "@material-ui/core";
const HeaderImage = () => {
  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <img className={styles.image} alt="COVID-19" src={coronaImg} />
    </Box>
  );
};

export default memo(HeaderImage);
