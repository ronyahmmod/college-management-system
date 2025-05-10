const Admin = require("../models/Admin");
const User = require("../models/User");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "ইমেইল ইতিমধ্যে বিদ্যমান" });
    }

    // Create admin with pending status
    const admin = new Admin({ name, email, status: "pending" });
    await admin.save();

    // create user with pending admin role
    const user = new User({
      email,
      password,
      role: "admin",
      referenceId: admin._id,
      roleModel: "Admin",
    });
    await user.save();
    return res.status(201).json({
      admin,
      user: { email, role: user.role, referenceId: user.referenceId },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const approveAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "অবৈধ স্ট্যাটাস" });
    }
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.statu(404).json({ message: "অ্যাডমিন পাওয়া যায়নি" });
    }
    admin.status = status;
    await admin.save();
    return res.status(201).json({ admin });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getPendingAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ status: "pending" });
    res.json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerAdmin, approveAdmin, getPendingAdmins };
