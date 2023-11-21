import { useState, useEffect } from "react";
import React from "react";
import {
  UilHeadSide,
  UilCell,
  UilSmileBeam,
  UilCommentMedical,
} from "@iconscout/react-unicons";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import "../aboutus.scss";
import { Container } from "@mui/material";

const AboutUs1 = () => {
  const CollectionRef = collection(db, "aboutus1");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSocial = async () => {
      const data = await getDocs(CollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSocial();
  }, []);
  return (
    <Container maxWidth="xl">
      <Container
        className="AboutUs-container1"
        sx={{ display: {xs:'inline', md: 'flex'} }}
      >
        <div className="left">
          <h1>ทำไมต้องบ้าน อ.เสวก ?</h1>
          <div className="AboutUs-container1-text">
            <UilHeadSide size="50" color="black" />
            <p>
              สอนโดยผู้เชี่ยวชาญจริงๆ
              อำนวยการสอนโดยครูผู้มากด้วยประสบการณ์ที่เคยสรา้งผลงานในการส่งเด็กเข้าประกวดรางวัลชนะเลิศระดับประเทศหลายรายการ
            </p>
          </div>
          <div className="AboutUs-container1-text">
            <UilCell size="64" color="black" />
            <p>
              สนุกไปกับการเรียน หลักสูตรของเรามีการจัดกิจกรรมส่งเสริมการเรียน
              เช่น กิจกรรมนันทนาการให้ผู้เรียนการเล่นรวมวง
              ใหักับผู้เรียนอย่างสม่ำเสมอ
            </p>
          </div>
          <div className="AboutUs-container1-text">
            <UilSmileBeam size="60" color="black" />
            <p>
              ความเอาใจใส่ เน้นการสอนแบบตัวต่อตัว สอนด้วยความเอาใจใส่
              และเป็นกันเอง
            </p>
          </div>
        </div>
        {data.map((data) => {
          return <img src={data.img1} alt="left-image" />;
        })}
      </Container>
      <Container className="AboutUs-container2" sx={{ display: {xs:'inline', md: 'flex'} }}>
        {data.map((data) => {
          return <img src={data.img2} alt="left-image" />;
        })}
        <div className="right">
          <UilCommentMedical size="70" color="black" />
          <div className="AboutUs-container2-text">
            <h1>ต้องการปรึกษาปัญหา ?</h1>
            <p>
              สามารถทำเเบบสอบถามเพิ่มเติมได้เพียงเข้าสู่ระบบเเละ
              ทำเเบบสอบถามเพื่อกำหนดวันเรีบน หรือ ติดต่อเราเพื่อสอบถามเพิ่มเติม
            </p>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default AboutUs1;
