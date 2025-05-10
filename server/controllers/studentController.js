const Student = require("../models/Student");
const User = require("../models/User");

const applyStudent = async (req, res) => {
  try {
    const { name, email, phone, department, password, academicYear } = req.body;
    // Check if email is already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create student with pending status
    const student = new Student({
      name,
      email,
      phone,
      department,
      academicYear,
      status: "pending",
    });
    await student.save();

    // Create user
    const user = new User({
      email,
      password,
      role: "student",
      referenceId: student._id,
      roleModel: "Student",
    });
    await user.save();
    return res.status(201).json({
      student,
      user: { email, role: user.role, referenceId: user.referenceId },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const approveStudent = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "অবৈধ স্ট্যাটাস" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "শিক্ষার্থী পাওয়া যায়নি" });
    }

    student.status = status;
    await student.save();

    res.json({ student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const assignRollAndSubjects = async (req, res) => {
  try {
    const { roll, subjects } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "শিক্ষার্থী পাওয়া যায়নি" });
    }

    if (student.status !== "approved") {
      return res.status(400).json({ message: "শিক্ষার্থী অনুমোদিত নয়" });
    }

    student.roll = roll;
    student.subjects = subjects;
    await student.save();

    res.json({ student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPendingStudents = async (req, res) => {
  try {
    const students = await Student.find({ status: "pending" });
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  applyStudent,
  approveStudent,
  assignRollAndSubjects,
  getPendingStudents,
};
