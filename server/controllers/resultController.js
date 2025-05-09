const Result = require("../models/Result");
const Subject = require("../models/Subject");
const Teacher = require("../models/Teacher");
const ResultPublication = require("../models/ResultPublication");

const postResult = async (req, res) => {
  try {
    const { studentId, subjectId, academicYear, examType, papers } = req.body;

    const teacherId = req.user.id; // Assuming the teacher ID is in the request user object
    const teacher = await Teacher.findById(teacherId);
    const isAuthorized = teacher.subjects.some(
      (subj) =>
        subj.subject.toString() === subjectId &&
        subj.paperCodes.some((paper) =>
          papers.some((p) => p.paperCode === paper)
        )
    );
    if (!isAuthorized) {
      return res
        .status(403)
        .json({ message: "Teacher is not authorized for this paper" });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const validPaperCodes = subject.papers.map((paper) => paper.code);
    for (const paper of papers) {
      if (!validPaperCodes.includes(paper.paperCode)) {
        return res
          .status(400)
          .json({ message: `Invalid paper code: ${paper.paperCode}` });
      }
    }

    const result = new Result({
      student: studentId,
      subject: subjectId,
      teacher: teacherId,
      academicYear,
      examType,
      papers,
      totalMarks: 0,
      grade: "F",
    });

    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getResultSheet = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { academicYear, examType } = req.query;

    // Check if the result is published
    const resultPublication = await ResultPublication.findOne({
      academicYear,
      examType,
      status: "published",
      publicationDate: { $lte: new Date() },
    });
    if (!resultPublication) {
      return res.status(403).json({ message: "Results are not published yet" });
    }
    // Fetch the result for the student
    const results = await Result.find({
      student: studentId,
      academicYear,
      examType,
    })
      .populate("subject", "name code papers")
      .lean();
    // Format result sheet
    const resultSheet = results.map((result) => ({
      subjectName: result.subject.name,
      subjectCode: result.subject.code,
      papers: result.papers.map((paper) => ({
        paperCode: paper.paperCode,
        paperName:
          result.subject.papers.find((p) => p.code === paper.paperCode)?.name ||
          paper.paperCode,
        marks: paper.marks,
      })),
      totalMarks: result.totalMarks,
      grade: result.grade,
    }));
    // Calculate overall stats
    const overallMarks = results.reduce(
      (sum, result) => sum + result.totalMarks,
      0
    );
    const overallGrade = calculateOverallGrade(overallMarks, results.length);

    return res.status(200).json({
      academicYear,
      examType,
      results: resultSheet,
      overallMarks,
      overallGrade,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate overall grade
const calculateOverallGrade = (averageMarks) => {
  if (averageMarks >= 80) return "A+";
  if (averageMarks >= 70) return "A";
  if (averageMarks >= 60) return "A-";
  if (averageMarks >= 55) return "B+";
  if (averageMarks >= 50) return "B";
  if (averageMarks >= 45) return "B-";
  if (averageMarks >= 40) return "C+";
  if (averageMarks >= 35) return "C";
  if (averageMarks >= 30) return "C-";
  if (averageMarks >= 20) return "D";
  return "F";
};
module.exports = { postResult, getResultSheet };
