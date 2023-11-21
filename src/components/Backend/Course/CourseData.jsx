import {
  getDocs,
  orderBy,
  collection,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../firebase";
import { ref, deleteObject } from "firebase/storage";
import { Button } from "@mui/material";
import "./course.scss";
import "../modal.scss";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CourseData = () => {
  const [course, setCourse] = useState([]);
  const courseCollectionRef = collection(db, "course");

  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [newcourseName, setNewCourseName] = useState("");
  const [newdescription, setNewDescription] = useState("");
  const [newprice, setNewPrice] = useState("");
  const [tempUuid, setTempUuid] = useState("");

  const [expanded, setExpanded] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 6;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = course.slice(firstIndex, lastIndex);
  const npage = Math.ceil(course.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handleExpandClick = (clickedIndex) => {
    if (expanded === clickedIndex) {
      setExpanded("-1");
    } else {
      setExpanded(clickedIndex);
    }
  };

  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }

  useEffect(() => {
    const q = query(courseCollectionRef, orderBy("timestamp", "desc"));

    const getCourse = async () => {
      const data = await getDocs(q, courseCollectionRef);
      setCourse(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCourse();
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

    const newsDoc = doc(db, "course", id);
    await deleteDoc(newsDoc);
    window.location.reload(false);
  };

  const handleChangeSubmit = async () => {
    const newDoc = doc(db, "course", tempUuid);
    const newFields = {
      CourseName: newcourseName,
      Description: newdescription,
      Price: newprice,
    };
    await updateDoc(newDoc, newFields);

    setNewCourseName("");
    setNewPrice("");
    setNewDescription("");
    alert("Document Updated");
    window.location.reload(false);
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const Modal = () => (
    <div className="Modal-overlay">
      <div className="Modal-container">
        <div id="productModal" className="Modal active">
          <TextField
            type="text"
            name="CourseName"
            label="Course Name"
            multiline
            variant="filled"
            defaultValue={newcourseName}
            onBlur={(event) => {
              setNewCourseName(event.target.value);
            }}
          />
          <TextField
            type="text"
            name="Price"
            label="Price"
            multiline
            variant="filled"
            defaultValue={newprice}
            onBlur={(event) => {
              setNewPrice(event.target.value);
            }}
          />
          <TextField
            type="text"
            name="Description"
            label="Description"
            multiline
            variant="filled"
            rows={10}
            defaultValue={newdescription}
            onBlur={(event) => {
              setNewDescription(event.target.value);
            }}
          />
          <div className="button-container">
            <Button variant="contained" onClick={handleChangeSubmit}>
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setShowModal(false)}
            >
              Close me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="Course-card-preview">
        {records.map((course, index) => {
          return (
            <Card className="card" key={course.id}>
              <CardContent>
                <img src={course.img} alt="" className="img-fluid" />
                <h2>{course.CourseName}</h2>
                <h4>{course.Price} ฿</h4>
                <ExpandMore
                  expand={expanded}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded}
                  aria-label="show more"
                  className="expand-button"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <div className="data-container">
                    <p>{course.Description}</p>
                  </div>
                </Collapse>
                <div className="button-container">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveObject({ ...course });
                      setShowModal(true);
                      setNewCourseName(course.CourseName);
                      setNewPrice(course.Price);
                      setNewDescription(course.Description);
                      setTempUuid(course.id);
                    }}
                    className={getClass(course)}
                  >
                    Update
                  </Button>
                  <Button
                    className="delete"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (
                        window.confirm("Are you sure to delete this record?")
                      ) {
                        handleDelete(course.id, course.img);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {showModal ? <Modal /> : null}
      </div>
      <nav className="pageNav">
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={index}
            >
              <a href="#" className="page-link" onClick={() => changePage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CourseData;
