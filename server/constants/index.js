module.exports = {
  APPLICATION_STATUS: {
    PENDING: "pending",
    UNDER_REVIEW: "under_review",
    APPROVED: "approved",
    REJECTED: "rejected",
    COMPLETED: "completed",
  },
  STUDENT_STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
  },
  PAYMENT_TYPE: {
    // This is not necessary
    APPLICATION_FEE: "application_fee",
    ADMISSION_FEE: "admission_fee",
    SESSION_CHARGE: "session_charge",
    DEVELOPMENT_FEE: "development_fee",
  },
  PAYMEENT_METHOD: {
    // This is not necessary
    BKASH: "bkash",
    NAGAD: "nagad",
    ROCKET: "rocket",
    BANK: "bank",
  },
  PAYMENT_STATUS: {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
  },
  DOCUMENT_TYPE: {
    // This is not neccessary. In future we will remove it.
    PHOTO: "photo",
    CERTIFICATE: "certificate",
    TRANSCRIPT: "transcript",
    OTHER: "other",
  },
  ACTION_TYPE: {
    REVIEWED: "reviewed",
    APPROVED: "approved",
    REJECTED: "rejected",
    COMMENTED: "commented",
  },
  RESULT_TYPE: {
    MIDTERM: "midterm",
    FINAL: "final",
    QUIZ: "quiz",
    OTHER: "other",
  },
};
