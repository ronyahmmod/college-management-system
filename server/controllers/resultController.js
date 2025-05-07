const Result = require("../models/Result");
const Subject = require("../models/Subject");

const postResult = async (req, res) => {
  try {
    const {
      studentId,
      subjectId,
      academicYear,
      examType,
      papers,
      totalMarks,
      grade,
    } = req.body;

    // Verify subject and papers
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Validate paper codes
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
      academicYear,
      examType,
      papers,
      totalMarks,
      grade,
    });

    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { postResult };
