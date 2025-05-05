const Application = require("../models/Application");
const Payment = require("../models/Payment");
const ActionLog = require("../models/ActionLog");

const createApplication = async (req, res) => {
  try {
    const { studentId, applicationFeeId } = req.body;

    // Verify payment
    const payment = await Payment.findById(applicationFeeId);
    if (
      !payment ||
      payment.type !== "application_fee" ||
      payment.status !== "completed"
    ) {
      return res.status(400).json({
        message: "Invalid or incomplete application fee payment",
      });
    }
    const application = new Application({
      student: studentId,
      applicationFee: applicationFeeId,
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const reviewApplication = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.status = status;
    application.remarks = remarks;
    await application.save();

    // Log admin action
    const actionLog = new ActionLog({
      admin: req.user.id, // Assuming admin is authenticated
      application: application._id,
      action: status === "rejected" ? "rejected" : "reviewed",
      details: remarks,
    });
    await actionLog.save();
    return res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "student"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    return res
      .status(200)
      .json({ status: application.status, remarks: application.remarks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createApplication, reviewApplication, getApplicationStatus };
