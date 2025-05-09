const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      referenceId: user.referenceId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
