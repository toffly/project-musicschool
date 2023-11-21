import { useState, useEffect } from "react";
import { storage, db } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import "../about.scss";
import { Button, Input } from "@mui/material";
import { v4 } from "uuid";

const AboutImg2 = () => {
  const [img, setImg] = useState([]);
  const [data, setData] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const docRef = doc(db, "aboutus1", "pR1D1lYfLnU1ylzcU8vn");

  const handleChangeSubmit = async (e) => {
    e.preventDefault();

    {
      !file ? alert("No Picture Selected") : await updateDoc(docRef, data);
    }
    window.location.reload(false);
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, `AboutUs1Image/${file.name + v4()}`);
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
            setData(() => ({ img2: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const docSnap = async () => {
      const snap = await getDoc(docRef);
      setImg(snap.get("img2"));
    };
    docSnap();
  });

  return (
    <div className="aboutimg-card-preview">
      <div className="card">
        <img src={img} alt="img1" />
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button
          type="submit"
          variant="contained"
          onClick={handleChangeSubmit}
          disabled={progress !== null && progress < 100}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default AboutImg2;
