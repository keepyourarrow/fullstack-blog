const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    minLength: [4, "must be 4 characters or above"],
    maxLength: [4, "must be 25 characters or less"],
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "minimum password length is 6 characters"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  refreshCount: { // count how much user refreshed Token
    type:Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//loading before save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
