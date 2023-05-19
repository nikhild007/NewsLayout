import { Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { WindowEventService } from "../../events/globalEvent";
import AgencyDetails from "../AgencyDetails/AgencyDetails";
import Newsimage from "../Newsimage/Newsimage";
import PublishDateFormatter from "../PublishDateFormatter/PublishDateFormatter";
import styles from "./Newscard.module.css";

function Newscard({ agencyImage, imageUrl, publishDate, url, title }) {
  const newsClickHandler = (news_id) => {
    WindowEventService.fire("clickedNews", { details: news_id });
  };

  return (
    <>
      <a
        href={url}
        className={styles.linkElement}
        onClick={newsClickHandler(1)}
      >
        <div className={styles.newsCard}>
          <AgencyDetails agencyImage={agencyImage} />
          <div className={styles.newsCardContent}>
            <div>
              <Typography
                className={styles.newsHeading}
                variant="p"
                component="div"
              >
                {title}
              </Typography>
              <PublishDateFormatter publishDate={publishDate} />
            </div>
            <Newsimage imageUrl={imageUrl} />
          </div>
        </div>
      </a>
    </>
  );
}

export default Newscard;
