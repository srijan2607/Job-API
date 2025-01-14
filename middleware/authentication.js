// const user = require("../models/User");
// const jwt = require("jsonwebtoken");
// const { UnauthenticatedError } = require("../errors");

// const auth = (req, res, next) => {
//   // Cheack the header
//   const authHead = req.headers.authorization;
//   if (!authHead || !authHead.StartsWith("Bearer")) {
//     throw new UnauthenticatedError(
//       ""
//     );
//   }
//   const token = authHead.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: payload.userId, name: payload.name };
//     next();
//   } catch (err) {
//     throw new UnauthenticatedError("");
//   }
// };

// module.exports = auth;
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  // Check the header
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer")) {
    throw new UnauthenticatedError(
      "Wassup You Kidding With Me Mother Fucker You wanna Die Huuu????"
    );
  }
  const token = authHead.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Ohk Something Just got Fucked its you mf");
  }
};

module.exports = auth;
