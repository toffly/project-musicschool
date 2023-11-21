import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Backend/Home.jsx";
import { Login } from "./components/Backend/Login.jsx";
import Banner from "./components/Backend/Banner/Banner.jsx";
import About1 from "./components/Backend/About/About1/About1.jsx";
import About2 from "./components/Backend/About/About2/About2.jsx";
import Course from "./components/Backend/Course/Coruse.jsx";
import News from "./components/Backend/News/News.jsx"
import Social from "./components/Backend/Social/Social.jsx"
import UserHome from "./components/Frontend/UserHome.jsx/UserHome.jsx";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserHome />} />
          <Route exact path="/admin/home" element={<Home />} />
          <Route exact path="/admin/banner" element={<Banner />} />
          <Route exact path="/admin/course" element={<Course />} />
          <Route exact path="/admin/news" element={<News />} />
          <Route exact path="/admin/social" element={<Social />} />
          <Route exact path="/admin/about1" element={<About1 />} />
          <Route exact path="/admin/about2" element={<About2 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
