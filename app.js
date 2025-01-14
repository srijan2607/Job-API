require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// connection

const authRoute = require("./routes/auth");
const jobRoute = require("./routes/jobs");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const Authentication = require("./middleware/authentication");

// Middelware
app.set("trust proxy", 1)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// extra packages

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", Authentication, jobRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
