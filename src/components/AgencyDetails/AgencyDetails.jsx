import React, { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import styles from "./AgencyDetails.module.css";
import { imageMapping } from "../../utils/imageMapping";

function AgencyDetails({ agencyImage, newsUrl }) {
  const [imageUrl, setImageUrl] = useState("");

  const imagehandler = (newsUrl) => {
    if (newsUrl.includes("hindustan")) {
      setImageUrl(imageMapping["ht"]);
    } else if (newsUrl.includes("thehindu")) {
      setImageUrl(imageMapping["th"]);
    } else {
      setImageUrl(imageMapping["toi"]);
    }
  };

  useEffect(() => {
    if (agencyImage.length === 0) {
      imagehandler(newsUrl);
    }
  }, []);
  return (
    <CardHeader
      avatar={
        <img
          className={styles.agencyImage}
          src={agencyImage ? agencyImage : imageUrl}
          alt="agency-image"
        />
      }
      style={{ padding: 0 }}
    />
  );
}

export default AgencyDetails;
