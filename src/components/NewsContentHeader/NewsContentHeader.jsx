import { Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./NewsContentHeader.module.css";

function NewsContentHeader() {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const formatDDMM = moment().format("dddd, MMMM DD");
    setTodayDate(formatDDMM);
  }, []);

  return (
    <div className={styles.headerStyle}>
      <Typography variant="h5">Your briefing</Typography>
      <Typography variant="p" color="gray" fontSize="13px">
        {todayDate}
      </Typography>
    </div>
  );
}

export default NewsContentHeader;
