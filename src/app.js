if (process.env.USER || process.env.USERNAME) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);


// Not found handler
app.use((request, _response, next) => {
    next({ status: 404, message: `Not found: ${request.originalUrl}` });
  });
  
  // Error handler
  app.use((error, _request, response, _next) => {
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
  });

module.exports = app;
