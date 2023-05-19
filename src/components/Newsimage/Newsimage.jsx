import React from "react";
import styles from "./Newsimage.module.css";

function Newsimage({ imageUrl }) {
  return (
    <div>
      <img className={styles.newsImage} src={imageUrl} alt="Feed Images" />
    </div>
  );
}

export default Newsimage;
