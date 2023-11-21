import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { getDocs, orderBy, collection, query } from "firebase/firestore";
import { db } from "../../../firebase";
import "./banner.scss";

const Banner = () => {
  const [slide, setSlide] = useState([]);
  const slideCollectionRef = collection(db, "slide");

  useEffect(() => {
    const q = query(slideCollectionRef, orderBy("timestamp", "desc"));

    const getSlide = async () => {
      const data = await getDocs(q, slideCollectionRef);
      setSlide(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getSlide();
  }, []);

  return (
    <>
      <Carousel className="carousel">
        {slide.map((slide, index) => {
          return (
            <div className="carousel-image">
              <img key={index} src={slide.img} />
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default Banner;
