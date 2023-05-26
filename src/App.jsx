import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Newscard from "./components/Newscard/Newscard";
import NewsContentHeader from "./components/NewsContentHeader/NewsContentHeader";
import WindowEventService from "./events/globalEvent";
import InfiniteScroll from "react-infinite-scroll-component";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import "./index.css";

const App = () => {
  const [filter, setFilter] = useState([1, 2]);
  const [newsData, setNewsData] = useState([
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
    {
      image: "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
      agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
      title: "We lost our way in second half of the innings: Rohit Sharma",
      publishDate: "2023-05-17T11:12:50+05:30",
      url: "https://www.google.com",
    },
  ]);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

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
    //check for response
    // const feedsfromEach = 20 / filter.length;
    // if (feedsfromEach * filter.length > response.data) {
    //   setHasMore(false);
    // }

    if (page === 4) {
      setHasMore(false);
      return;
    }
    console.log("Fetch More", page + 1);
    setPage(page + 1);
    setTimeout(() => {
      setNewsData((prevData) => [
        ...prevData,

        {
          image:
            "https://static.toiimg.com/photo/msid-100294611,imgsize-23816.cms",
          agencyImage: "https://timesofindia.indiatimes.com/photo/507610.cms",
          title: "We lost our way in second half of the innings: Rohit Sharma",
          publishDate: "2023-05-17T11:12:50+05:30",
          url: "https://www.google.com",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    // make page start to 1
    setPage(1);

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
  }, [filter]);

  useEffect(() => {
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
      }}
    >
      <Toolbar />
      <NewsContentHeader />
      <InfiniteScroll
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
            showCategory={filter.length > 1 ? true : false}
            imageUrl={item.image}
            title={item.title}
            publishDate={item.publishDate}
            url={item.url}
            agencyImage={item.agencyImage}
            category="Sports"
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
