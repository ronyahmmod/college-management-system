const Payment = require("../models/Payment");
const { processMfsPayment } = require("../utils/mfsPayment");

const createPayment = async (req, res) => {
  try {
    const { studentId, applicationId, amount, type, paymentMethod } = req.body;
    // Process payment via MFS
    const paymentResult = await processMfsPayment({ amount, paymentMethod });
    const payment = new Payment({
      student: studentId,
      application: applicationId,
      amount,
      type,
      transactionId: paymentResult.transactionId,
      paymentMethod,
      status: paymentResult.status,
    });
    await payment.save();
    return res.status(201).json(payment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createPayment };
