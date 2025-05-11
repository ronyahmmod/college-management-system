const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const { name, description, code } = req.body;
    const department = new Department({ name, description, code });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const departments = await Department.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Department.countDocuments(query);

    res.json({
      departments,
      totalPages: Math.ceil(count / limit),
      currentPage: page * 1,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createDepartment, getDepartments };
