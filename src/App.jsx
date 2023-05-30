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
    setFilter(event);
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
    fetch(`https://3621-45-121-2-206.ngrok-free.app/api/v1/news-feed`, {
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
    // make page start to 1
    setPage(1);
    setLoader(true);

    //fetch news by default or by preference
    fetch(`https://3621-45-121-2-206.ngrok-free.app/api/v1/news-feed`, {
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
        setNewsData(result.data);
        // console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [filter]);

  useEffect(() => {
    const socket = socketIOClient("https://3621-45-121-2-206.ngrok-free.app");
    // addNotification({
    //   title: "News Update",
    //   subtitle: "News Info",
    //   message: "This is a very long message",
    //   native: true,
    // });

    socket.on("news_updated", (data) => console.log(data));

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
          width: "60%",
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
          {newsData?.map((item) => (
            <Newscard
              key={item._id}
              showCategory={filter.length > 1 ? true : false}
              imageUrl={item.image ? item.image : imageMapping["none"]}
              title={item.title}
              publishDate={item.publishedAt}
              url={item.url}
              agencyImage={item.agencyId.logo}
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
