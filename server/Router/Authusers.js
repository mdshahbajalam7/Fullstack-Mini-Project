const { Router } = require("express");
const Authuser = require("../models/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AuthRouter = Router();

// <-------------------PostRouterSingup-------------------------->
AuthRouter.post("/signup", async (req, res) => {
  const {
    Name,
    Username,
    Email,
    DOB,
    Role,
    Location,
    Password,
    // ConfirmPassword,
  } = req.body;
  try {
    bcrypt.hash(Password, 12, async (err, Secure_Password) => {
      console.log("secure_password", Secure_Password);
      if (err) {
        console.log(err);
      } else {
        const signupdata = new Authuser({
          Name,
          Username,
          Email,
          DOB,
          Role,
          Location,
          Password: Secure_Password,
          // ConfirmPassword,
        });
        // console.log("Secure_Password", Secure_Password);
        console.log("signupdata", signupdata);
        await signupdata.save();
        res.send({ Message: "Signup successfully", signupdata: signupdata });
      }
    });
  } catch (error) {
    res.send("Error in Signup the user");
    console.log(error);
  }
});
// "Name":"Md Shahbaj Alam",
// "Username":"Chand",
// "Email":"masai30@gmail.com",
// "DOB":"02-05-200",
// "Role":"Admin",
// "Location":"Mumbai",
// "Password":"123456"
// <-------------------PostRouter login-------------------------->
AuthRouter.post("/lognin", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const logindata1 = await Authuser.find({ Username });
    // console.log("logindata1",logindata1);
    if (logindata1.length > 0) {
      bcrypt.compare(Password, logindata1[0].Password, (err, result) => {
        if (result) {
          const token = jwt.sign({ Username: "Chand" }, "Mdshahbaj700", {
            expiresIn: "1d",
          });
          res.send({ token: token, message: "login successfully" });
        } else {
          res.send("Wrong Credntials");
        }
      });
    } else {
      res.send("Wrong Credntials");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("unathorized");
  }
});
// <-------------------getRouter-------------------------->

AuthRouter.get("/get", async (req, res) => {
  try {
    const getdata = await Authuser.find();

    res
      .status(200)
      .json({ message: "get data Successfully", getdata: getdata });
  } catch (error) {
    res.status(401).json(error.message);
    console.log(error);
  }
});
// <-------------------UpdateRouter-------------------------->
AuthRouter.put("/update/:loginId", async (req, res) => {
  const loginId = req.params.loginId;
  const payload = req.body;
  try {
    let updatedata = await Authuser.findByIdAndUpdate(
      { _id: loginId },
      payload
    );
    updatedata.save().then(() => {
      res
        .status(201)
        .json({ message: "Update Successfully", updatedata: updatedata });
    });
  } catch (error) {
    res.status(501).json(error.message);
  }
});
// <-------------------DeleteRouter-------------------------->
AuthRouter.delete("/deletes/:loginId", async (req, res) => {
  const loginId = req.params.loginId;
  try {
    let deletedata = await Authuser.findByIdAndDelete({ _id: loginId });
    res
      .status(201)
      .json({ message: "Update Successfully", updatedata: deletedata });
  } catch (error) {
    res.status(501).json(error.message);
  }
});

module.exports = AuthRouter;
