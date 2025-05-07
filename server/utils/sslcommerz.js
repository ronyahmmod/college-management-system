const SSLCommerzPayment = require("sslcommerz-lts");

const initSslcommerzPayment = async ({
  amount,
  studentId,
  feeCategoryId,
  academicYear,
}) => {
  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: `TXN-${Date.now()}`,
    success_url: process.env.SSLCOMMERZ_SUCCESS_URL,
    fail_url: process.env.SSLCOMMERZ_FAIL_URL,
    cancel_url: process.env.SSLCOMMERZ_CANCEL_URL,
    cus_name: "Student",
    cus_email: "student@example.com",
    cus_add1: "Dhaka",
    cus_phone: "01914XXXXXX",
    shiping_method: "NO",
    product_name: "College Fee",
    product_category: "Education",
    product_profile: "general",
  };

  const sslcz = new SSLCommerzPayment({
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_password: process.env.SSLCOMMERZ_STORE_PASSWORD,
    is_live: process.env.SSLCOMMERZ_IS_LIVE === true,
  });

  const response = await sslcz.init(data);
  return { transactionId: data.tran_id, paymentUrl: response.GatewayPageURL };
};

module.exports = { initSslcommerzPayment };
