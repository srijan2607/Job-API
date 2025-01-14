const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
    immutable: true,
  },
  name: {
    type: String,
    required: [true, "Wtf Dude Done you have any any name ??"],
    minlength: [3, "Wtf is your name that Short Bruhhhh...."],
    maxlength: [50, "Wtf Bruh you have a long name..."],
  },
  email: {
    type: String,
    required: [true, "Wtf Dude you don't have any email..."],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Wtf is that your email address??!!! Dude get some Help",
    ],
  },
  password: {
    type: String,
    required: [true, "Wtf Dude you don't have any password..."],
    minlength: [8, "Wtf is that your password that short Bruhhhh...."],
  },
});

schema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.getname = function () {
  return this.name;
};

schema.methods.createJWT = function () {
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new Error("JWT_SECRET or JWT_LIFETIME is not set.");
  }
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

schema.methods.comparePassword = async function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

module.exports = mongoose.model("User", schema);
