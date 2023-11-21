import "../about.scss";
import Sidebar from "../../Sidebar/Sidebar";
import AboutImg1 from "./AboutImg1";
import AboutImg2 from "./AboutImg2";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

const About1 = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(error);

  const navigate = useNavigate();

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {user ? (
            <>
              <div className="admin-container">
                <Sidebar />
                <div className="admin-right">
                  <div className="section-container aboutus-container">
                    <AboutImg1 />
                    <AboutImg2 />
                  </div>
                </div>
                F
              </div>
            </>
          ) : (
            <button
              className="btn btn-primary btn-md login-form"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default About1;
