import React from "react";
import moment from "moment";
import styles from "./PublishDateFormatter.module.css";

function PublishDateFormatter({ publishDate }) {
  return (
    <>
      <p className={styles.dateFont}>{moment(publishDate).fromNow()}</p>
    </>
  );
}

export default PublishDateFormatter;
