import {
  getDocs,
  orderBy,
  collection,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../../firebase";
import { ref, deleteObject } from "firebase/storage";
import { Button } from "@mui/material";

const About3Data = () => {
  const [slide, setSlide] = useState([]);
  const slideCollectionRef = collection(db, "aboutus3");

  useEffect(() => {
    const q = query(slideCollectionRef, orderBy("timestamp", "desc"));

    const getSlide = async () => {
      const data = await getDocs(q, slideCollectionRef);
      setSlide(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getSlide();
  }, []);

  const handleDelete = async (id, fileUrl) => {
    let pictureRef = ref(storage, fileUrl);
    deleteObject(pictureRef)
      .then(() => {
        alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });

    const newsDoc = doc(db, "aboutus3", id);
    await deleteDoc(newsDoc);
    window.location.reload(false);
  };
  
  return (
    <div className="banner-card-preview aboutus3-card">
      {slide.map((slide) => {
        return (
          <div className="card" key={slide.id}>
            <img src={slide.img} className="img-fluid" />
            <Button
              className="delete"
              onClick={() => {
                if (window.confirm("Are you sure to delete this record?")) {
                  handleDelete(slide.id, slide.img);
                }
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  )
}

export default About3Data