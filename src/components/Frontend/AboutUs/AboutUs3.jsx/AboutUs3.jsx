import { getDocs, orderBy, collection, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../..//firebase";
import { ImageList, ImageListItem  } from "@mui/material";

const AboutUs3 = () => {
  const [data, setData] = useState([]);
  const CollectionRef = collection(db, "aboutus3");

  useEffect(() => {
    const q = query(CollectionRef, orderBy("timestamp", "desc"));

    const getData = async () => {
      const data = await getDocs(q, CollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  return (
    <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
      {data.map((data, index) => (
        <ImageListItem key={index}>
          <img src={data.img} alt="imglist" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default AboutUs3;
