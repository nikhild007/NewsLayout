import { CircularProgress, useTheme } from "@mui/material";
import addNotification from "react-push-notification";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Newscard from "./components/Newscard/Newscard";
import NewsContentHeader from "./components/NewsContentHeader/NewsContentHeader";
import WindowEventService from "./events/globalEvent";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import socketIOClient from "socket.io-client";

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
    console.log("Fetch More", page + 1);
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
    addNotification({
      title: "Warning",
      native: true,
    });

    socket.on("HII", (res) => console.log(res));

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
    <Box
      sx={{
        maxWidth: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "2rem",
        marginLeft: "2rem",
        [theme.breakpoints.down(630)]: {
          maxWidth: "100%",
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
            category="Sports"
            news_id={item._id}
            clickCount={item.clickCount}
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
