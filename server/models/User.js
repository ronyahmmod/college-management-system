const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { USER_TYPE } = require("../constants");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: Object.values(USER_TYPE),
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Reference ID is required"],
    refPath: "roleModel",
  },
  roleModel: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    required: [true, "Role model is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
