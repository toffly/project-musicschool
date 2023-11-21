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
import { db, storage } from "../../../../firebase";
import { ref, deleteObject } from "firebase/storage";
import { Button } from "@mui/material";
import "../about.scss";
import "../../modal.scss";
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

const About2Data = () => {
  const [data, setData] = useState([]);
  const CollectionRef = collection(db, "aboutus2");

  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [newHeader, setNewHeader] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [tempUuid, setTempUuid] = useState("");

  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (clickedIndex) => {
    if (expanded === clickedIndex) {
      setExpanded("-1");
    } else {
      setExpanded(clickedIndex);
    }
  };

  const handleChangeSubmit = async () => {
    alert("Document Updated");
    const newDoc = doc(db, "aboutus2", tempUuid);
    const newFields = {
      Header: newHeader,
      Description: newDescription,
    };
    await updateDoc(newDoc, newFields);

    setNewHeader("");
    setNewDescription("");
    window.location.reload(false);
  };

  const handleDelete = async (id, fileUrl) => {
    let pictureRef = ref(storage, fileUrl);
    deleteObject(pictureRef)
      .then(() => {
        alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });

    const newsDoc = doc(db, "aboutus2", id);
    await deleteDoc(newsDoc);
    window.location.reload(false);
  };

  function getClass(index) {
    return index === activeObject?.id ? "active" : "inactive";
  }

  useEffect(() => {
    const q = query(CollectionRef, orderBy("timestamp", "desc"));

    const getData = async () => {
      const data = await getDocs(q, CollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const Modal = () => (
    <div className="Modal-overlay">
      <div className="Modal-container">
        <div id="productModal" className="Modal active">
          <TextField
            type="text"
            name="Header"
            label="Header Name"
            multiline
            variant="filled"
            defaultValue={newHeader}
            onBlur={(event) => {
              setNewHeader(event.target.value);
            }}
          />
          <TextField
            type="text"
            name="Description"
            label="Description"
            multiline
            variant="filled"
            rows={10}
            defaultValue={newDescription}
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
  )

  return (
    <div className="about-card-preview">
      {data.map((data, index) => {
        return (
          <Card className="card" key={data.id}>
            <CardContent>
              <img src={data.img} alt="" className="img-fluid" />
              <h2>{data.Header}</h2>
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
                  <p>{data.Description}</p>
                </div>
              </Collapse>
              <div className="button-container">
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveObject({ ...data });
                    setShowModal(true);
                    setNewHeader(data.Header);
                    setNewDescription(data.Description);
                    setTempUuid(data.id);
                  }}
                  className={getClass(data)}
                >
                  Update
                </Button>
                <Button
                  className="delete"
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    if (window.confirm("Are you sure to delete this record?")) {
                      handleDelete(data.id, data.img);
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
  );
};

export default About2Data;
