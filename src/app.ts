import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import HttpError from "./models/HttpError";
import moviesRouter from "./routes/movies";

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(json());

app.use("/api/v1/movies", moviesRouter);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code || 500).json({
    error: {
      message: err.message || "Server is busy at the moment !",
      statusCode: err.code || 500,
      requestStatus: "Fail",
    },
  });
});

mongoose
  .connect(`mongodb://localhost:27017/movies`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
