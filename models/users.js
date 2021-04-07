var mongoose = require("mongoose");
var { isEmail, isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName: {
    type: "String",
    required: true,
  },
  lastName: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
    validate: [
      (v) =>
        isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        }),
      "password not strong",
    ],
  },
  email: {
    type: "String",
    unique: true,
    required: true,
    validate: [isEmail, "invalid email !"],
  },
});

usersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
