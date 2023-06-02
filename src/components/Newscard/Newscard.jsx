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
  const newsClickHandler = async (news_id) => {
    await increaseNewsReadCount(news_id);
  };

  async function increaseNewsReadCount(news_id) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: news_id }),
      };
      const apiUrl = "http://report-service.localhost/updateClickCount";
      const response = await fetch(apiUrl, requestOptions);
      await response.json();
    } catch (error) {
      console.log("OOPS!, error", error);
    }
  }

  return (
    <>
      <a
        href={url}
        target="_blank"
        className={styles.linkElement}
        onClick={() => newsClickHandler(news_id)}
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
