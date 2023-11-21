import { getDocs, orderBy, collection, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import "../aboutus.scss";
import Flickity from "react-flickity-component";

const flickityOptions = {
  initialIndex: 2,
  wrapAround: true,
  freeScroll: true,
  contain: true,
  // disable previous & next buttons and dots
  pageDots: false,
  autoPlay: true,
  draggable: false,
};

const AboutUs2 = () => {
  const [data, setData] = useState([]);
  const CollectionRef = collection(db, "aboutus2");

  const [focusHeader, setFocusHeader] = useState("");
  const [focusDesc, setFocusDesc] = useState("");
  const [focusImg, setFocusImg] = useState("");

  useEffect(() => {
    const q = query(CollectionRef, orderBy("timestamp", "desc"));

    const getData = async () => {
      const data = await getDocs(q, CollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  return (
    <div>
      <div className="reward-container">
        <Flickity
          className={"carousel-reward"} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
          {data.map((data) => {
            return (
              <img
                src={data.img}
                key={data.id}
                onClick={(e) => {
                  e.preventDefault();
                  setFocusHeader(data.Header);
                  setFocusDesc(data.Description);
                  setFocusImg(data.img);
                }}
              />
            );
          })}
        </Flickity>

        <div>
          {!focusHeader ? null : (
            <div className="container2-data">
              <img src={focusImg} />
              <div className="data2">
                <h1>{focusHeader}</h1>
                <p>{focusDesc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs2;
