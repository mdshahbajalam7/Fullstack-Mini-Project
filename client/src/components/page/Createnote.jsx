import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../App";
import styles from "../page/data.module.css";
function Createnote() {
  const navigate = useNavigate();
  const [notecreate, setnotecreate] = useState('');
  const handlechange = (e) => {
    setnotecreate({ ...notecreate, [e.target.name]: e.target.value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(notecreate);
    fetch(`${BASEURL}/create`, {
      method: "POST",
      body: JSON.stringify(notecreate),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate("/")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.container}>
      <Box className={styles.inputfield}>
        <form className={styles.form} onSubmit={handlesubmit}>
          <TextField
            style={{ marginTop: "15px" }}
            onChange={handlechange}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
          />
          <TextField
            style={{ marginTop: "15px" }}
            onChange={handlechange}
            id="outlined-basic"
            label="Note"
            name="note"
            variant="outlined"
          />
          <TextField
            style={{ marginTop: "15px" }}
            onChange={handlechange}
            id="outlined-basic"
            label="Category"
            name="category"
            variant="outlined"
          />
          <input
            style={{ marginTop: "15px" }}
            className={styles.btn}
            type="submit"
            value="Note Create"
          />
          <Button
            style={{ marginTop: "15px" }}
            variant="contained"
            color="secondary"
            className={styles.btn}
            onClick={() => navigate("/")}
          >
            GO BACK HOME{" "}
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Createnote;
