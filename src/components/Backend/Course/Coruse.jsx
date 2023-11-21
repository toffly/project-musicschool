import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { storage, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import CourseData from "./CourseData";
import { Button, Input, TextField } from "@mui/material";
import "./course.scss";
import "../modal.scss";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  CourseName: "",
  Price: "",
  Description: "",
};

const Coruse = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(error);

  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const { CourseName, Price, Description } = data;
  const courseCollectionRef = collection(db, "course");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `CourseImgage/${file.name + v4()}`);
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

    !data.CourseName || !data.Price || !data.Description
      ? alert("Please fill all field")
      : !file
      ? alert("No Picture Selected")
      : await addDoc(courseCollectionRef, {
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
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit} className="course-form-container">
              <TextField
                type="text"
                name="CourseName"
                label="Enter Course Name"
                multiline
                variant="filled"
                onChange={handleChange}
                value={CourseName}
              />
              <TextField
                type="text"
                name="Price"
                label="Enter Price"
                variant="filled"
                onChange={handleChange}
                value={Price}
              />
              <TextField
                type="text"
                name="Description"
                label="Enter Descripion"
                multiline
                rows={4}
                variant="filled"
                onChange={handleChange}
                value={Description}
              />
              <label>
                Upload <br />
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
          <div className="Preview-container">
            <CourseData />
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

export default Coruse;
