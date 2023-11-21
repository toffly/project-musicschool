import React, { useRef, useState } from "react";
import "./userhome.scss";
import Banner from "../Banner/Banner";
import AboutUs from "../AboutUs/AboutUs";
import Course from "../Course/Course";
import News from "../News/News";
import Footer from "../Footer/Footer";
import ScrollButton from "../ScrollButton/ScrollButton";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PianoIcon from "@mui/icons-material/Piano";

const UserHome = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const scrollTo = (elementlRef) => {
      window.scrollTo({
        top: elementlRef.current.offsetTop,
        behavior: "smooth",
      });
    };

    return (
      <AppBar
        position="sticky"
        className="navbar-menu"
        sx={{ bgcolor: "#2E3B55", marginBottom: "1.6rem" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PianoIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Music School
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  key="1"
                  onClick={() => {
                    handleCloseNavMenu;
                    scrollTo(ref);
                  }}
                >
                  <Typography textAlign="center">เกี่ยวกับเรา</Typography>
                </MenuItem>
                <MenuItem
                  key="1"
                  onClick={() => {
                    handleCloseNavMenu;
                    scrollTo(ref2);
                  }}
                >
                  <Typography textAlign="center">วิชาเรียน</Typography>
                </MenuItem>
                <MenuItem
                  key="1"
                  onClick={() => {
                    handleCloseNavMenu;
                    scrollTo(ref3);
                  }}
                >
                  <Typography textAlign="center">ข่าวสาร</Typography>
                </MenuItem>
                <MenuItem
                  key="1"
                  onClick={() => {
                    handleCloseNavMenu;
                    scrollTo(ref4);
                  }}
                >
                  <Typography textAlign="center">ติดต่อเรา</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <PianoIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Music School
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={"1"}
                onClick={() => {
                  handleCloseNavMenu;
                  scrollTo(ref);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                เกี่ยวกับเรา
              </Button>
              <Button
                key={"2"}
                onClick={() => {
                  handleCloseNavMenu;
                  scrollTo(ref2);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                วิชาเรียน
              </Button>
              <Button
                key={"3"}
                onClick={() => {
                  handleCloseNavMenu;
                  scrollTo(ref3);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                ข่าวสาร
              </Button>
              <Button
                key={"4"}
                onClick={() => {
                  handleCloseNavMenu;
                  scrollTo(ref4);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                ติดต่อเรา
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  return (
    <div className="app">
      <Navbar />
      <Container className="banner-section" maxWidth="xl">
        <Banner />
      </Container>
      <div ref={ref}>
        <AboutUs />
      </div>
      <div className="course-section" ref={ref2}>
        <Course />
      </div>
      <div ref={ref3}>
        <News />
      </div>
      <div className="footer-section" ref={ref4}>
        <Footer />
      </div>
      <ScrollButton />
    </div>
  );
};

export default UserHome;
