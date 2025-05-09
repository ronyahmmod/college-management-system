const ResultPublication = require("../models/ResultPublication");

const createResultPublication = async (req, res) => {
  try {
    const { academicYear, examType, publicationDate } = req.body;
    const createdBy = req.user.id;

    const publication = new ResultPublication({
      academicYear,
      examType,
      publicationDate,
      createdBy,
    });

    await publication.save();
    return res.status(201).json(publication);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const publishResult = async (req, res) => {
  try {
    const publication = await ResultPublication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Result publication not found" });
    }
    publication.status = "published";
    await publication.save();
    return res.json(publication);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createResultPublication, publishResult };
