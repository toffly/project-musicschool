import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, IconButton, Typography, Tooltip } from "@mui/material";
import { getDocs, orderBy, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { UilLine } from "@iconscout/react-unicons";

const Footer = () => {
  const [data, setData] = useState([]);
  const CollectionRef = collection(db, "social");

  useEffect(() => {
    const getSocial = async () => {
      const data = await getDocs(CollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSocial();
  }, []);

  return (
    <div sx={{ bgcolor: "#2E3B55", marginBottom: "1.6rem" }}>
      <Container maxWidth="xl">
        <Typography>ติดต่อเรา</Typography>
        <Typography>
          Our Social Media
          {data.map((data,index) => {
            return (
              <div className="Contact-social" key={index}>
                <Tooltip title="Facebook">
                  <IconButton
                    onClick={() => window.open(`${data.facebook}`)}
                    size="large"
                    color="primary"
                  >
                    <FacebookIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Line">
                  <IconButton
                    onClick={() => window.open(`${data.line}`)}
                    size="large"
                    color="success"
                  >
                    <UilLine fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Instagram">
                  <IconButton
                    onClick={() => window.open(`${data.instagram}`)}
                    size="large"
                    color="primary"
                  >
                    <InstagramIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Youtube">
                  <IconButton
                    onClick={() => window.open(`${data.youtube}`)}
                    size="large"
                    color="error"
                  >
                    <YouTubeIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Twitter">
                  <IconButton
                    onClick={() => window.open(`${data.twitter}`)}
                    size="large"
                    color="primary"
                  >
                    <TwitterIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </div>
            );
          })}
          <Link to="/admin/home" style={{ textDecoration: "none" }}>
            <span className="logo">Administrator</span>
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default Footer;
