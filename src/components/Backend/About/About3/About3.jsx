import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { storage, db } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Input } from "@mui/material";
import { v4 } from "uuid";
import About3Data from "./About3Data";

const initialState = {
  HD: "Slideshow indicator",
};

const About3 = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const slideCollectionRef = collection(db, "aboutus3");
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `AboutUs3Image/${file.name + v4()}`);
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

    await addDoc(slideCollectionRef, {
      ...data,
      timestamp: serverTimestamp(),
    });
    window.location.reload(false);
  };

  return (
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
            <About3Data />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About3;
