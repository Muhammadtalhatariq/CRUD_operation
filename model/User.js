const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  img: String,
});

module.exports = mongoose.model("user", userSchema);
