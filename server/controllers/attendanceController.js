const Attendance = require("../models/Attendance");
const Teacher = require("../models/Teacher");

const postAttendance = async (req, res) => {
  try {
    const { studentId, subjectId, paperCode, date, academicYear, status } =
      req.body;
    const teacherId = req.user.id; // Assuming the teacher ID is in the request user object
    const teacher = await Teacher.findById(teacherId);

    const isAuthorized = teacher.subjects.some(
      (subj) =>
        subj.subject.toString() === subjectId &&
        subj.paperCodes.includes(paperCode)
    );
    if (!isAuthorized) {
      return res
        .status(403)
        .json({ message: "Teacher is not authorized for this paper" });
    }
    const attendance = new Attendance({
      student: studentId,
      subject: subjectId,
      paperCode,
      teacher: teacherId,
      academicYear,
      date,
      status,
    });
    await attendance.save();
    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postAttendance };
