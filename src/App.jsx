import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Newscard from "./components/Newscard/Newscard";
import NewsContentHeader from "./components/NewsContentHeader/NewsContentHeader";
import { WindowEventService } from "news_layout/PubSub";

import "./index.css";

const App = () => {
  const [filter, setFilter] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loader, setLoader] = useState(true);

  const filterHandler = (event) => {
    setFilter(event);
  };

  const updateFeedHandler = (event) => {
    const { data } = event;
    setNewsData([...newsData, data]);
  };

  const handleAuthentication = (event) => {
    const { isAuthenticated, data } = event;
    if (isAuthenticated) {
      setFilter(null);
    } else {
      //grab user based filter from db
    }
  };

  useEffect(() => {
    //fetch news by default or by preference
    setNewsData([
      ...newsData,
      {
        image:
          "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
        agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
        title: "We lost our way in second half of the innings: Rohit Sharma",
        publishDate: "2023-05-17T11:12:50+05:30",
        url: "https://www.google.com",
      },
    ]);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [filter]);

  useEffect(() => {
    WindowEventService.subscribe("agency-category-filter", filterHandler);
    WindowEventService.subscribe("updateFeed", updateFeedHandler);
    WindowEventService.subscribe("isAuthenticated", handleAuthentication);

    return () => {
      WindowEventService.unsubscribe("agency-category-filter", filterHandler);
      WindowEventService.unsubscribe("updateFeed", updateFeedHandler);
      WindowEventService.subscribe("isAuthenticated", handleAuthentication);
    };
  }, []);

  return (
    <div className="container">
      <NewsContentHeader />
      {loader && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      {newsData?.map((item) => (
        <Newscard
          imageUrl={item.image}
          title={item.title}
          publishDate={item.publishDate}
          url={item.url}
          agencyImage={item.agencyImage}
        />
      ))}
    </div>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
