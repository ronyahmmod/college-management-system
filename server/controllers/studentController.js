const Student = require("../models/Student");

module.exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    return res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
