import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { storage, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import NewsData from "./NewsData";
import { Button, Input, TextField } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  Header: "",
  ShortDesc: "",
  LongDesc: "",
};

const News = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(error);

  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const { Header, ShortDesc, LongDesc } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const newsCollectionRef = collection(db, "news");

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `NewsImage/${file.name}`);
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    !data.Header || !data.ShortDesc || !data.LongDesc
      ? alert("Please fill all field")
      : !file 
      ? alert("No Picture Selected")
      : await addDoc(newsCollectionRef, {
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
            <h2>Add News</h2>
            <form onSubmit={handleSubmit} className="news-form-container">
              <TextField
                type="text"
                name="Header"
                label="Enter Header"
                multiline
                variant="filled"
                onChange={handleChange}
                value={Header}
              />
              <TextField
                type="text"
                name="ShortDesc"
                label="Enter Short Description"
                multiline
                rows={4}
                variant="filled"
                onChange={handleChange}
                value={ShortDesc}
              />
              <TextField
                type="text"
                name="LongDesc"
                label="Enter Long Description"
                multiline
                rows={10}
                variant="filled"
                onChange={handleChange}
                value={LongDesc}
              />
              <label>
                Upload <br />
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <Button
                variant="contained"
                type="submit"
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
          <div className="Preview-container">
            <NewsData />
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

export default News;
