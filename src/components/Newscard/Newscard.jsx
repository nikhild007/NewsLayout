import { Chip, Typography } from "@mui/material";
import React from "react";
import WindowEventService from "news_app/PubSub";
import AgencyDetails from "../AgencyDetails/AgencyDetails";
import Newsimage from "../Newsimage/Newsimage";
import PublishDateFormatter from "../PublishDateFormatter/PublishDateFormatter";
import styles from "./Newscard.module.css";

function Newscard({
  agencyImage,
  imageUrl,
  publishDate,
  url,
  title,
  showCategory,
  category,
  news_id,
}) {
  const newsClickHandler = (news_id) => {
    WindowEventService.fire("clickedNews", { news_id });
  };

  return (
    <>
      <a
        href={url}
        className={styles.linkElement}
        onClick={newsClickHandler(news_id)}
      >
        <div className={styles.newsCard}>
          <AgencyDetails agencyImage={agencyImage} newsUrl={url} />
          <div className={styles.newsCardContent}>
            <div className={styles.newsSubCard}>
              <Typography
                className={styles.newsHeading}
                variant="p"
                component="div"
              >
                {title}
              </Typography>
              <div className={styles.dateAndCategory}>
                <PublishDateFormatter publishDate={publishDate} />
              </div>

              {showCategory && (
                <div className={styles.chip}>
                  <Chip label={category} />
                </div>
              )}
            </div>
            <Newsimage imageUrl={imageUrl} />
          </div>
        </div>
      </a>
    </>
  );
}

export default Newscard;
