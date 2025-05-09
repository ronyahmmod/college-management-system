const Teacher = require("../models/Teacher");

const createTeacher = async (req, res) => {
  try {
    const { name, email, phone, department, subjects } = req.body;
    const teacher = new Teacher({
      name,
      email,
      phone,
      department,
      subjects,
    });
    await teacher.save();
    return res.status(201).json(teacher);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createTeacher };
