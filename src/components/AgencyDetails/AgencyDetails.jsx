import React from "react";
import CardHeader from "@mui/material/CardHeader";
import styles from "./AgencyDetails.module.css";

function AgencyDetails({ agencyImage, agencyTitle }) {
  return (
    <CardHeader
      avatar={
        <img
          className={styles.agencyImage}
          src={agencyImage}
          alt="agency-image"
        />
      }
      style={{ padding: 0 }}
      title={agencyTitle}
    />
  );
}

export default AgencyDetails;
