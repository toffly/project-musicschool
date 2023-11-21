import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocs, orderBy, collection, query, limit } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import "./news.scss";
import NewsMore from "./NewsMore";

const News = () => {
  const [news, setNews] = useState([]);
  const newsCollectionRef = collection(db, "news");
  const [more, setMore] = useState(false);

  function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + "/" + dd + "/" + yyyy;
    return date;
  }

  useEffect(() => {
    const q = query(newsCollectionRef, orderBy("timestamp", "desc"), limit(4));

    const getNews = async () => {
      const data = await getDocs(q, newsCollectionRef);
      setNews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNews();
  }, []);

  const handleMore = () => {
    setMore(!more);
  };

  return (
    <Container
      className="news-container"
      maxWidth="xl"
      sx={{
        display: { md: "flex", sx: "inline" },
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Container
        className="news-container"
        maxWidth="xl"
        sx={{
          display: { md: "flex", sx: "inline" },
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        {news.map((news, index) => {
          return (
            <Card
              sx={{ width: "100%", maxWidth: 340, maxHeight: 360 }}
              key={index}
              className="news-card"
            >
              <CardMedia image={news.img} sx={{ height: 220 }} />
              <CardContent className="news-card-content">
                <Typography>{news.ShortDesc}</Typography>
                <Typography sx={{ paddingBottom: 1 }}>
                  <hr />
                  {convertTimestamp(news.timestamp)}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
      <Box style={{ textDecoration: "none" }}>
        <Button sx={{ height: "100%" }} onClick={handleMore}>
          {!more ? (
            <span className="logo">More</span>
          ) : (
            <span className="logo">Close</span>
          )}
        </Button>
      </Box>
      {more === true ? (
        <Container sx={{ display: "inline" }}>
          <NewsMore />
        </Container>
      ) : (
        <Container sx={{ display: "none" }}>
          <NewsMore />
        </Container>
      )}
    </Container>
  );
};

export default News;
