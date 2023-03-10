import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../App";
// import { AuthContext } from "../../Context/AuthContext";
import styles from "../page/data.module.css";

const user = {
  Username: "",
  Password: "",
};

function Lognin() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(user);
  // const { authState, loginUser } = useContext(AuthContext);
  // console.log(authState);
  // const [boolean, setBoolean] = useState(false);
  const handlechange = (e) => {
    setUserID({ ...userID, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    // setBoolean(true);
    // axios
    //   .post(`${BaseUrl}/lognin`, userID)
    //   .then(({ data }) => {
    //     console.log("data", data);
    //     if (data.token) {
    //       loginUser(data.token);
    //       navigate("/");
    //     } else {
    //       alert("not found");
    //     }
    //   })
    //   .catch((err) => console.log(err));
    fetch(`${BaseUrl}/lognin`, {
      method: "POST",
      body: JSON.stringify(userID),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        navigate("/");
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
            label="UserName"
            name="Username"
            variant="outlined"
          />
          <TextField
            style={{ marginTop: "15px" }}
            onChange={handlechange}
            id="outlined-basic"
            label="Password"
            name="Password"
            variant="outlined"
          />
          <input
            style={{ marginTop: "15px" }}
            className={styles.btn}
            type="submit"
            value="SignUp"
          />
        </form>
        <p>If you are new on the platform please signup first <a href="/signup">Signup</a></p>
      </Box>
    </div>
  );
}

export default Lognin;
