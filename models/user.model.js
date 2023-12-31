const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true,required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['driver', 'passenger'], required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
