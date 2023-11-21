import { useState, useEffect } from "react";
import { storage, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./banner.scss";
import "../admin.scss"
import Sidebar from "../Sidebar/Sidebar";
import BannerData from "./BannerData";
import { Button, Input } from "@mui/material";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  HD: "Slideshow indicator",
};

const Banner = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(error);

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const slideCollectionRef = collection(db, "slide");
  const [data, setData] = useState(initialState);


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `SlideImage/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "pause":
              console.log("Upload is Pause");
              break;
            case "running":
              console.log("Upload is Running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    !file
      ? alert("No Picture Selected")
      : await addDoc(slideCollectionRef, {
          ...data,
          timestamp: serverTimestamp(),
        });
    window.location.reload(false);
  };

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
                <div className="section-container">
          <div className="Form-container">
            <form onSubmit={handleSubmit}>
              <h2>Add Slide Picture</h2>
              <label>
                Upload <p>ขนาดรูป 2560 x 1000 pixel</p> <br />
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <Button
                type="submit"
                variant="contained"
                disabled={progress !== null && progress < 100}
              >
                Submit
              </Button>
              {progress !== null && progress < 100 ? (
                <div className="loading-indicator">
                  กำลังโหลด กรุณารอสักครู่
                </div>
              ) : null}
            </form>
          </div>
          <div className="preview-container">
            <BannerData />
          </div>
        </div>
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

export default Banner;
