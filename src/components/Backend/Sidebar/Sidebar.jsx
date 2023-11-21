import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import InfoIcon from "@mui/icons-material/Info";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InterestsIcon from "@mui/icons-material/Interests";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("successfully logged out");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/home" style={{ textDecoration: "none" }}>
          <span className="logo">Music Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>User Page</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/banner" style={{ textDecoration: "none" }}>
            <li>
              <ViewCarouselIcon className="icon" />
              <span>Banner</span>
            </li>
          </Link>

          <Link to="/admin/course" style={{ textDecoration: "none" }}>
            <li>
              <GolfCourseIcon className="icon" />
              <span>Course</span>
            </li>
          </Link>
          <Link to="/admin/news" style={{ textDecoration: "none" }}>
            <li>
              <NewspaperIcon className="icon" />
              <span>News</span>
            </li>
          </Link>
          <Link to="/admin/social" style={{ textDecoration: "none" }}>
            <li>
              <InterestsIcon className="icon" />
              <span>Social</span>
            </li>
          </Link>
          <p className="title">ABOUT US</p>
          <Link to="/admin/about1" style={{ textDecoration: "none" }}>
            <li>
              <InfoIcon className="icon" />
              <span>About Us 1</span>
            </li>
          </Link>
          <Link to="/admin/about2" style={{ textDecoration: "none" }}>
            <li>
              <InfoIcon className="icon" />
              <span>About Us 2</span>
            </li>
          </Link>
        </ul>
        <div className="bottom">
          {!user ? (
            <div>Please wait...</div>
          ) : (
            <div className="bottom">
              <h3>Welcome</h3>
              <p>{user.email}</p>
              <button
                className="btn btn-secondary btn-md"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
