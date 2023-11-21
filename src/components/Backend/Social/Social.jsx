import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import Sidebar from "../Sidebar/Sidebar";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { UilLine } from "@iconscout/react-unicons";
import { Button, TextField, Typography } from "@mui/material";
import "./social.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const Social = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(error);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const courseCollectionRef = collection(db, "social");

  const [facebook, setFacebook] = useState("");
  const [line, setLine] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tempUuid, setTempUuid] = useState("");
  const [update, setUpdate] = useState(false);

  const handleChangeSubmit = async () => {
    const newDoc = doc(db, "social", tempUuid);
    const newFields = {
      facebook: facebook,
      instagram: instagram,
      line: line,
      twitter: twitter,
      youtube: youtube,
    };
    await updateDoc(newDoc, newFields);
    alert("Document Updated");
    window.location.reload(false);
  };

  useEffect(() => {
    const getSocial = async () => {
      const data = await getDocs(courseCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSocial();
  }, []);

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
                <Typography>Link must include https:// </Typography>
        <Typography>ex: https://www.google.com</Typography>
        {data.map((data) => {
          return (
            <div key={data.id} className="social-container">
              <div className="social-box">
                <FacebookIcon />
                <TextField
                  type="text"
                  label="Facebook Link"
                  variant="filled"
                  defaultValue={data.facebook}
                  onChange={(e) => {
                    setFacebook(e.target.value);
                  }}
                  disabled={update !== true}
                />
              </div>
              <div className="social-box">
                <UilLine />
                <TextField
                  type="text"
                  variant="filled"
                  label="Line Link"
                  defaultValue={data.line}
                  onChange={(e) => {
                    setLine(e.target.value);
                  }}
                  disabled={update !== true}
                />
              </div>
              <div className="social-box">
                <YouTubeIcon />
                <TextField
                  type="text"
                  variant="filled"
                  label="Youtube Channel Link"
                  defaultValue={data.youtube}
                  onChange={(e) => {
                    setYoutube(e.target.value);
                  }}
                  disabled={update !== true}
                />
              </div>
              <div className="social-box">
                <TwitterIcon />
                <TextField
                  type="text"
                  variant="filled"
                  label="Twitter Link"
                  defaultValue={data.twitter}
                  onChange={(e) => {
                    setTwitter(e.target.value);
                  }}
                  disabled={update !== true}
                />
              </div>
              <div className="social-box">
                <InstagramIcon />
                <TextField
                  type="text"
                  variant="filled"
                  label="Instagram Link"
                  defaultValue={data.instagram}
                  onChange={(e) => {
                    setInstagram(e.target.value);
                  }}
                  disabled={update !== true}
                />
              </div>
              <div className="button-container">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setFacebook(data.facebook);
                    setLine(data.line);
                    setYoutube(data.youtube);
                    setTwitter(data.twitter);
                    setInstagram(data.instagram);
                    setTempUuid(data.id);
                    setUpdate(true);
                  }}
                  disabled={update !== false}
                >
                  Enable Update
                </Button>
                <Button
                  onClick={handleChangeSubmit}
                  disabled={update !== true}
                  variant="contained"
                >
                  Update Submit
                </Button>
              </div>
            </div>
          );
        })}
                </div>
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

export default Social;
