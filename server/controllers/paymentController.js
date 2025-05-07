const Payment = require("../models/Payment");
const FeeCategory = require("../models/FeeCategory");
const { initSslcommerzPayment } = require("../utils/sslcommerz");

const createPayment = async (req, res) => {
  try {
    const {
      studentId,
      applicationId,
      feeCategoryId,
      amount,
      type,
      paymentMethod,
      academicYear,
    } = req.body;
    // Verify fee category
    const feeCategory = await FeeCategory.findById(feeCategoryId);
    if (!feeCategory || feeCategory.academicYear !== academicYear) {
      return res
        .status(400)
        .json({ message: "Invalid fee category or academic year" });
    }

    // Process payment via sslcommerz
    const paymentResult = await initSslcommerzPayment({
      amount,
      studentId,
      feeCategoryId,
      academicYear,
    });

    const payment = new Payment({
      student: studentId,
      application: applicationId,
      feeCategory: feeCategoryId,
      amount,
      type,
      transactionId: paymentResult.transactionId,
      paymentMethod,
      status: paymentResult.status,
      academicYear,
    });
    await payment.save();
    return res.status(201).json(payment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createPayment };
