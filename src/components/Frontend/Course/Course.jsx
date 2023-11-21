import React, { useState, useEffect } from "react";
import { getDocs, orderBy, collection, query, limit } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  Container,
  Typography,
  Card,
  Grid,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import "./course.scss";
import "../modal.scss";
import headerimg from "../../../assets/313eef797a44db1d.png";

const Course = () => {
  const [course, setCourse] = useState([]);
  const courseCollectionRef = collection(db, "course");

  const [newcourseName, setNewCourseName] = useState("");
  const [newdescription, setNewDescription] = useState("");
  const [newprice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [time, setTime] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);

  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }

  function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = mm + "/" + dd + "/" + yyyy;
    return date;
  }

  useEffect(() => {
    const q = query(
      courseCollectionRef,
      orderBy("timestamp", "desc"),
      limit(6)
    );
    const getCourse = async () => {
      const data = await getDocs(q, courseCollectionRef);
      setCourse(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCourse();
  }, []);

  function Modal() {
    return (
      <div className="Modal-overlay">
        <div className="course-Modal-container">
          <Box className="Modal active">
            <div className="footer">
              <Typography>{time}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setShowModal(false)}
              >
                Close me
              </Button>
              <hr />
            </div>
            <Container className="modal-data">
              <img src={newImage} alt="Modal-Image" />
              <Typography>{newcourseName}</Typography>
              <Typography>{newprice} ฿</Typography>
            </Container>
            <Container className="modal-data right">
              <Typography>{newdescription}</Typography>
            </Container>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={6} className="course-header">
          <Card>
            <img src={headerimg} title="Our Course" />
          </Card>
        </Grid>
        {course.map((course, index) => {
          return (
            <Grid
              Container
              xs={3}
              key={index}
              className="grid-course-container"
            >
              <Card className="course-card">
                <img src={course.img} title="Our Course" />
                <CardActions className="card-action">
                  <Button
                    size="small"
                    className={getClass(course)}
                    onClick={() => {
                      setActiveObject({ ...course });
                      setShowModal(true);
                      setNewCourseName(course.CourseName);
                      setNewPrice(course.Price);
                      setNewDescription(course.Description);
                      setNewImage(course.img);
                      setTime(convertTimestamp(course.timestamp));
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {showModal ? <Modal /> : null}
    </Container>
  );
};

export default Course;
