require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const errorMiddleware = require("./middleware/errorMiddleware");
const userRouter = require("./routes/userRouter")


const app = express();
const port = process.env.PORT || 3000;

// MIddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello API");
});

// Routes
app.use("/users", userRouter);

const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI)
  .then((result) => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log("Server is Running on port ", port);
    });
  })
  .catch((err) => console.log(err));