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
import "./news.scss";
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

const NewsData = () => {
  const [news, setNews] = useState([]);
  const newsCollectionRef = collection(db, "news");

  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [newHeader, setNewHeader] = useState("");
  const [newShortDesc, setNewShortDesc] = useState("");
  const [newLongDesc, setNewLongDesc] = useState("");
  const [tempUuid, setTempUuid] = useState("");

  const [expanded, setExpanded] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 6;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = news.slice(firstIndex, lastIndex);
  const npage = Math.ceil(news.length / recordPerPage);
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

  const handleChangeSubmit = async () => {
    alert("Document Updated");
    const newDoc = doc(db, "news", tempUuid);
    const newFields = {
      Header: newHeader,
      ShortDesc: newShortDesc,
      LongDesc: newLongDesc,
    };
    await updateDoc(newDoc, newFields);

    setNewHeader("");
    setNewShortDesc("");
    setNewLongDesc("");
    window.location.reload(false);
  };

  const Modal = () => (
    <div className="Modal-overlay">
      <div className="Modal-container">
        <div id="productModal" className="Modal active">
          <TextField
            type="text"
            name="Header"
            label="Header"
            multiline
            variant="filled"
            defaultValue={newHeader}
            onBlur={(event) => {
              setNewHeader(event.target.value);
            }}
          />
          <TextField
            type="text"
            name="ShortDesc"
            label="Short Description"
            multiline
            variant="filled"
            defaultValue={newShortDesc}
            onBlur={(event) => {
              setNewShortDesc(event.target.value);
            }}
            cols="50"
            rows="5"
          />
          <TextField
            type="text"
            name="LongDesc"
            label="Long Description"
            multiline
            variant="filled"
            rows={10}
            defaultValue={newLongDesc}
            onBlur={(event) => {
              setNewLongDesc(event.target.value);
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

  useEffect(() => {
    const q = query(newsCollectionRef, orderBy("timestamp", "desc"));

    const getNews = async () => {
      const data = await getDocs(q, newsCollectionRef);
      setNews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNews();
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
    const newsDoc = doc(db, "news", id);
    await deleteDoc(newsDoc);
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

  return (
    <div>
      <div className="News-card-preview">
        {records.map((news, index) => {
          return (
            <Card className="card" key={news.id}>
              <CardContent>
                <img src={news.img} alt="image" className="img-fluid" />
                <h2>{news.Header}</h2>
                <h4>{news.ShortDesc}</h4>
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
                    <p>{news.LongDesc}</p>
                  </div>
                </Collapse>
                <div className="button-container">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveObject({ ...news });
                      setShowModal(true);
                      setNewHeader(news.Header);
                      setNewShortDesc(news.ShortDesc);
                      setNewLongDesc(news.LongDesc);
                      setTempUuid(news.id);
                    }}
                    className={getClass(news)}
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
                        handleDelete(news.id, news.img);
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

export default NewsData;
