const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// userModel 
const userModel = require("./model/User");

// cookeiss session
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// router
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", {users: users});
});

app.post("/create", async (req, res) => {
  let { name, email, img } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    img,
  });
  res.redirect("/read")
});

app.get("/delete/:id", async (req, res) => {
  let deleteUser = await userModel.findOneAndDelete({ _id :req.params.id });
  res.redirect("/read");

});
app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id :req.params.userid });
 res.render("edit", {user})
});

app.post("/update/:userid", async (req, res) => {
  let { name, email, img } = req.body;
  let user = await userModel.findOneAndUpdate({ _id :req.params.userid },{name,email,img }, {new : true});
 res.redirect("/read")
});

// port
app.listen(port, () => {
  console.log(`app on listen port ${port}`);
});
