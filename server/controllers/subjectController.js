const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const { name, code, department } = req.body;
    const subject = new Subject({ name, code, department });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSubjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", department = "" } = req.query;
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (department) query.department = department;

    const subjects = await Subject.find(query)
      .populate("department", "name")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Subject.countDocuments(query);

    res.json({
      subjects,
      totalPages: Math.ceil(count / limit),
      currentPage: page * 1,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createSubject, getSubjects };
