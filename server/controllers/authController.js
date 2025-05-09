const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Admin = require("../models/Admin");
const { generateToken } = require("../utils/jwt");
const { USER_TYPE } = require("../constants");

const register = async (req, res) => {
  try {
    const { email, password, role, name, department, subjects, phone } =
      req.body;

    // Validate role
    if (
      ![USER_TYPE.STUDENT, USER_TYPE.ADMIN, USER_TYPE.TEACHER].includes(role)
    ) {
      return res.status(400).json({ message: "Invalid role" });
    }
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let referenceId;
    let roleModel;

    // Create reference based on role
    if (role === "student") {
      const student = new Student({ name, email, phone, department });
      await student.save();
      referenceId = student._id;
      roleModel = "Student";
    } else if (role === "teacher") {
      const teacher = new Teacher({ name, email, phone, department, subjects });
      await teacher.save();
      referenceId = teacher._id;
      roleModel = "Teacher";
    } else if (role === "admin") {
      const admin = new Admin({ name, email });
      await admin.save();
      referenceId = admin._id;
      roleModel = "Admin";
    }

    // Create user
    const user = new User({
      email,
      password,
      role,
      referenceId,
      roleModel,
    });
    await user.save();

    // Generate token
    const token = generateToken(user);
    return res.status(201).json({ token, user: { email, role, referenceId } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);
    return res.status(200).json({
      token,
      user: {
        email: user.email,
        role: user.role,
        referenceId: user.referenceId,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
