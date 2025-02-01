require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const userRoute = require('./routes/users_rt')
// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/user", userRoute)
const PORT = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log("server is running on " + PORT));
  } catch (error) {
    console.log(error);
  }
};
start()
