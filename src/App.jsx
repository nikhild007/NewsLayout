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

import "./index.css";
import { imageMapping } from "./utils/imageMapping";

const App = () => {
  const [filter, setFilter] = useState([]);
  const [newsData, setNewsData] = useState([
    {
      _id: "647483895ef04331ac6a232a",
      title:
        "ONGC Videsh has less than $100 million stuck in Russia, says official",
      description:
        "Indian state oil firms have invested $5.46 billion in buying stakes in four different assets in Russia",
      url: "https://www.thehindu.com/business/ongc-videsh-has-less-than-100-million-stuck-in-russia-says-official/article66907471.ece",
      publishedAt: "2023-05-29T10:48:02.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/kbdeh6/article66907568.ece/alternates/LANDSCAPE_1200/2018-12-19T102515Z_1854511038_RC1469118390_RTRMADP_3_ONGC-ONGCVIDESH-LISTING.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a22c6",
      title:
        "ONGC Videsh has less than $100 million stuck in Russia, says official",
      description:
        "Indian state oil firms have invested $5.46 billion in buying stakes in four different assets in Russia",
      url: "https://www.thehindu.com/business/ongc-videsh-has-less-than-100-million-stuck-in-russia-says-official/article66907471.ece",
      publishedAt: "2023-05-29T10:48:02.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/kbdeh6/article66907568.ece/alternates/LANDSCAPE_1200/2018-12-19T102515Z_1854511038_RC1469118390_RTRMADP_3_ONGC-ONGCVIDESH-LISTING.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c8",
        title: "Business",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a232b",
      title:
        "What lies behind India’s missing wombs problem? | In Focus podcast",
      description:
        "Dr. Narendra Gupta speaks to us about the Supreme Court’s direction to States on the curbing of unnecessary hysterectomies, delving into why and on whom these procedures are being performed.",
      url: "https://www.thehindu.com/podcast/what-lies-behind-indias-missing-wombs-problemin-focus-podcast/article66907655.ece",
      publishedAt: "2023-05-29T10:47:22.000Z",
      image:
        "https://th-i.thgim.com/public/todays-paper/tp-features/tp-metroplus/m5kcio/article29848249.ece/alternates/LANDSCAPE_1200/01tvm-LiveARTGQM6L4KRC3jpgjpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a232c",
      title:
        "Delhi services Ordinance row | Congress leaders from Delhi, Punjab meet Kharge, Rahul; sources say party may not support AAP ",
      description:
        "Sources said the meeting comes in the wake of Mr. Kejriwal requesting a meeting with Mr. Kharge and Mr. Gandhi to seek their support against the Ordinance",
      url: "https://www.thehindu.com/news/cities/Delhi/delhi-services-ordinance-row-congress-leaders-from-delhi-punjab-meet-kharge-rahul-sources-say-party-may-not-support-aap/article66907562.ece",
      publishedAt: "2023-05-29T10:45:24.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/t0duwy/article66907647.ece/alternates/LANDSCAPE_1200/Jai%20Bharat%20Satyagraha%20Yatra_64.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a232d",
      title:
        "An out-of-the box, play-based, experiential learning approach for  toddlers ",
      description:
        "Blooming Buds Play School holds pride of place in the Air Force Families Welfare Association- AFFWA (Local) initiatives at AFAC",
      url: "https://www.thehindu.com/life-and-style/an-out-of-the-box-play-based-experiential-learning-approach-for-toddlers/article66895752.ece",
      publishedAt: "2023-05-29T10:41:59.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/rmizqc/article66907591.ece/alternates/LANDSCAPE_1200/CB23_Hema_Bindu_4.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a232e",
      title: "‘Power Book II: Ghost S3’ gets a streaming date",
      description:
        "Created by Courtney A. Kemp, the series also stars Shane Johnson, Gianni Paolo, Melanie Liburd and Lovell Adams-Gray",
      url: "https://www.thehindu.com/entertainment/movies/power-book-ii-ghost-s3-gets-a-streaming-date/article66907641.ece",
      publishedAt: "2023-05-29T10:41:18.000Z",
      image:
        "https://th-i.thgim.com/public/entertainment/movies/cj0x9h/article66907631.ece/alternates/LANDSCAPE_1200/Power%20Book.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a22c7",
      title:
        "Stock markets rally for third day amid firm U.S. equities, foreign fund inflows",
      description:
        "During the day, the 30-share BSE Sensex jumped 524.31 points or 0.83% to 63,026",
      url: "https://www.thehindu.com/business/markets/stock-markets-rally-for-third-day-amid-firm-us-equities-foreign-fund-inflows/article66907617.ece",
      publishedAt: "2023-05-29T10:38:55.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/ehjx9k/article66907636.ece/alternates/LANDSCAPE_1200/IMG_sensex_2_1_7CB915LE.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c8",
        title: "Business",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a232f",
      title:
        "Stock markets rally for third day amid firm U.S. equities, foreign fund inflows",
      description:
        "During the day, the 30-share BSE Sensex jumped 524.31 points or 0.83% to 63,026",
      url: "https://www.thehindu.com/business/markets/stock-markets-rally-for-third-day-amid-firm-us-equities-foreign-fund-inflows/article66907617.ece",
      publishedAt: "2023-05-29T10:38:55.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/ehjx9k/article66907636.ece/alternates/LANDSCAPE_1200/IMG_sensex_2_1_7CB915LE.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2330",
      title:
        "Power supply disconnected at 75 textile processing units in Erode in 1.5 years: T.N. Pollution Control Board ",
      description:
        "The TNPCB, in its reply to an email complaining about the discharge of effluents into drains and canals in Erode, said it was continually monitoring textile processing units in the district; it also said water samples from the region were frequently tested",
      url: "https://www.thehindu.com/news/cities/Coimbatore/power-supply-disconnected-at-75-textile-processing-units-in-erode-in-15-years-tn-pollution-control-board/article66907400.ece",
      publishedAt: "2023-05-29T10:37:34.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/mes3s4/article66907613.ece/alternates/LANDSCAPE_1200/9870_29_5_2023_12_18_50_3_ER30EFFLUENT%283%29.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2331",
      title: "Rupee falls 4 paise to close at 82.64 against U.S. dollar",
      description:
        "Global oil benchmark Brent crude futures declined 0.40% to $76.64 per barrel",
      url: "https://www.thehindu.com/business/markets/rupee-falls-4-paise-to-close-at-8264-against-us-dollar/article66907609.ece",
      publishedAt: "2023-05-29T10:36:09.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/eg8zzl/article66907628.ece/alternates/LANDSCAPE_1200/2023-05-23T104303Z_1037630262_RC2941AL9NXD_RTRMADP_3_INDIA-ECONOMY-CURRENCY-EXCHANGE.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a22c8",
      title: "Rupee falls 4 paise to close at 82.64 against U.S. dollar",
      description:
        "Global oil benchmark Brent crude futures declined 0.40% to $76.64 per barrel",
      url: "https://www.thehindu.com/business/markets/rupee-falls-4-paise-to-close-at-8264-against-us-dollar/article66907609.ece",
      publishedAt: "2023-05-29T10:36:09.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/eg8zzl/article66907628.ece/alternates/LANDSCAPE_1200/2023-05-23T104303Z_1037630262_RC2941AL9NXD_RTRMADP_3_INDIA-ECONOMY-CURRENCY-EXCHANGE.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c8",
        title: "Business",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2332",
      title: "Growth mindset: Black-winged stilts offer life lessons",
      description: "",
      url: "https://www.thehindu.com/sci-tech/energy-and-environment/growth-mindset-black-winged-stilts-offer-life-lessons/article66907574.ece",
      publishedAt: "2023-05-29T10:31:27.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/br5wmm/article66907600.ece/alternates/LANDSCAPE_1200/28dc%20BWSPic1.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483885ef04331ac6a21e6",
      title: "ICC leaders in Pakistan to secure ODI World Cup participation",
      description:
        "Senior International Cricket Council (ICC) officials have travelled to Pakistan to secure the country's participation in this year's 50-overs World Cup in India which has been in doubt for political reasons.",
      url: "https://timesofindia.indiatimes.com/sports/cricket/news/icc-leaders-in-pakistan-to-secure-odi-world-cup-participation/articleshow/100592208.cms",
      publishedAt: "2023-05-29T10:26:29.000Z",
      image: "https://static.toiimg.com/photo/msid-100592062,imgsize-19022.cms",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c6",
        title: "Sports",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21cc",
        logo: "https://static.toiimg.com/photo/msid-98638255.cms",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2237",
      title:
        "'It's a massive hole': Tennis legend ignores Djokovic in staggering French Open remark on Nadal's absence",
      description:
        'The absence led to a tennis legend stating that even Novak Djokovic cannot fill the "massive hole" left at Roland Garros by Nadal.',
      url: "https://www.hindustantimes.com/sports/tennis/massive-hole-tennis-legend-martina-navratilova-ignores-novak-djokovic-staggering-french-open-remark-rafael-nadal-absence-101685355225063.html",
      publishedAt: "2023-05-29T10:25:06.000Z",
      image:
        "https://www.hindustantimes.com/ht-img/img/2023/05/29/1600x900/nadal_djokovic_fav_1685275201226_1685355444860.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c6",
        title: "Sports",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21cd",
        logo: "https://www.hindustantimes.com/images/app-images/ht2020/desktop.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2333",
      title:
        "Spurious liquor deaths | AIADMK cadre stage demonstration in Erode",
      description:
        "The demonstration was led by former Minister K.V. Ramalingam and former MLA K.S. Thennarasu; party members said the DMK had failed to prevent the sale of spurious liquor in the State and alleged that such tragedies took place every time the DMK was in power",
      url: "https://www.thehindu.com/news/cities/Coimbatore/spurious-liquor-deaths-aiadmk-cadre-stage-demonstration-in-erode/article66907406.ece",
      publishedAt: "2023-05-29T10:23:09.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/9a7soj/article66907517.ece/alternates/LANDSCAPE_1200/9870_29_5_2023_12_25_35_2_ER30AIADMK%282%29.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2261",
      title: "NASA to spice up astronaut menu with deep space food production",
      description:
        "A New York company that makes carbon-negative aviation fuel is taking the menu for interplanetary cuisine in a very different direction.",
      url: "https://www.hindustantimes.com/science/nasa-astronaut-menu-deep-space-food-production-new-york-firm-101685354623476.html",
      publishedAt: "2023-05-29T10:16:30.000Z",
      image:
        "https://www.hindustantimes.com/ht-img/img/2023/05/29/1600x900/SPACE-EXPLORATION-FOOD-0_1685355087586_1685355119396.JPG",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c7",
        title: "Science",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21cd",
        logo: "https://www.hindustantimes.com/images/app-images/ht2020/desktop.png",
      },
      __v: 0,
    },
    {
      _id: "647483885ef04331ac6a21e5",
      title:
        "WTC Final: ICC expecting full crowds for at least first four days",
      description:
        "The International Cricket Council is expecting a sell-out crowd for at least the first four days of the World Test Championship final between India and Australia at The Oval in London from June 7.",
      url: "https://timesofindia.indiatimes.com/sports/cricket/icc-world-test-championship/wtc-final-icc-expecting-full-crowds-for-at-least-first-four-days/articleshow/100591753.cms",
      publishedAt: "2023-05-29T10:16:23.000Z",
      image: "https://static.toiimg.com/photo/msid-100591655,imgsize-17464.cms",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c6",
        title: "Sports",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21cc",
        logo: "https://static.toiimg.com/photo/msid-98638255.cms",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2334",
      title:
        "Malaysia detains Chinese barge on suspicion of looting WWII British warship wrecks",
      description:
        "Malaysia’s maritime agency says it has detained a Chinese-registered vessel on suspicion of looting two British warship wrecks in the South China Sea",
      url: "https://www.thehindu.com/news/international/malaysia-detains-chinese-barge-on-suspicion-of-looting-wwii-british-warship-wrecks/article66907470.ece",
      publishedAt: "2023-05-29T10:16:04.000Z",
      image:
        "https://th-i.thgim.com/public/incoming/9slhv5/article66907498.ece/alternates/LANDSCAPE_1200/Malaysia_British_Shipwrecks_20923.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c9",
        title: "Top Stories",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21ce",
        logo: "https://www.thehindu.com/theme/images/th-online/logo.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2257",
      title:
        "Closing bell: Sensex advances 345 points to 62,846, Nifty at 18,600",
      description:
        "Closing bell: Sensex advances 345 points to 62,846, Nifty at 18,600.",
      url: "https://www.hindustantimes.com/business/sensex-nifty-bse-nse-markets-closing-101685354706513.html",
      publishedAt: "2023-05-29T10:14:27.000Z",
      image:
        "https://www.hindustantimes.com/ht-img/img/2023/05/29/1600x900/20210201199L_1615796916809_1685355246035.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c8",
        title: "Business",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21cd",
        logo: "https://www.hindustantimes.com/images/app-images/ht2020/desktop.png",
      },
      __v: 0,
    },
    {
      _id: "647483895ef04331ac6a2238",
      title:
        "Rafael Nadal's uncle responds to point-blank question on Spaniard's French Open return in 2024",
      description:
        "Amid concern among over Rafa's health, his uncle, Toni Nadal, gives a clear response on whether the Spaniard will make a return to Roland Garros next year.",
      url: "https://www.hindustantimes.com/sports/tennis/rafael-nadals-uncle-responds-to-point-blank-question-on-spaniards-french-open-return-in-2024-101685354850502.html",
      publishedAt: "2023-05-29T10:14:09.000Z",
      image:
        "https://www.hindustantimes.com/ht-img/img/2023/05/29/1600x900/nadal_toni_1685355133133_1685355141496.jpg",
      clickCount: 0,
      categoryId: {
        _id: "647483885ef04331ac6a21c6",
        title: "Sports",
      },
      agencyId: {
        _id: "647483885ef04331ac6a21cd",
        logo: "https://www.hindustantimes.com/images/app-images/ht2020/desktop.png",
      },
      __v: 0,
    },
  ]);
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
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
