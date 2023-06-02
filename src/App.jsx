import { CircularProgress, useTheme } from "@mui/material";
import addNotification from "react-push-notification";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Newscard from "./components/Newscard/Newscard";
import NewsContentHeader from "./components/NewsContentHeader/NewsContentHeader";
import WindowEventService from "news_app/PubSub";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import socketIOClient from "socket.io-client";
import { Notifications } from "react-push-notification";

import "./index.css";
import { imageMapping } from "./utils/imageMapping";

const App = () => {
  const [filter, setFilter] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const filterHandler = (event) => {
    setFilter(event.detail);
    setLoader(true);
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

  const fetchMoreData = async () => {
    setPage(page + 1);
    fetch(`http://news-delivery.localhost/api/v1/news-feed`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter,
        page,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.length === 0) {
          setHasMore(false);
        } else {
          setNewsData([...newsData, ...result.data]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setPage(1);
    setLoader(true);

    //fetch news by default or by preference
    fetch(`http://news-delivery.localhost/api/v1/news-feed`, {
    // fetch(`http://localhost:8082/api/v1/news-feed`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter,
        page,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        console.log(result.data[0].agencyId);
        setNewsData(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [filter]);

  useEffect(() => {
    const socket = socketIOClient("http://news-delivery.localhost");

    socket.on("news_updated", (data) => {
      addNotification({
        title: "News Update",
        subtitle: "News Info",
        message: "This is a very long message",
        native: true,
      });
    });

    WindowEventService.subscribe("agency-category-filter", filterHandler);
    WindowEventService.subscribe("updateFeed", updateFeedHandler);
    WindowEventService.subscribe("isAuthenticated", handleAuthentication);

    return () => {
      WindowEventService.unsubscribe("agency-category-filter", filterHandler);
      WindowEventService.unsubscribe("updateFeed", updateFeedHandler);
      WindowEventService.unsubscribe("isAuthenticated", handleAuthentication);
    };
  }, []);

  return (
    <>
      <Notifications />
      <Box
        sx={{
          maxWidth: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "6rem",
          marginLeft: "4rem",
          [theme.breakpoints.down(630)]: {
            width: "100%",
          },
        }}
      >
        <NewsContentHeader />
        <InfiniteScroll
          className="infinityScroll"
          dataLength={newsData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4 className="loader">
              <CircularProgress />
            </h4>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Hooray you read all the news !!</b>
            </p>
          }
        >
          {loader && (
            <div className="loader">
              <CircularProgress />
            </div>
          )}
          {newsData?.map((item, index) => (
            <Newscard
              key={index}
              showCategory={filter.length > 1}
              imageUrl={item.image ? item.image : imageMapping["none"]}
              title={item.title}
              publishDate={item.publishedAt}
              url={item.url}
              agencyImage={item?.agencyId?.logo}
              category={item.categoryId.title}
              news_id={item._id}
              clickCount={item.clickCount}
            />
          ))}
        </InfiniteScroll>
      </Box>
    </>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
