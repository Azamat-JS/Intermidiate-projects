require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const carRouter = require("./routes/car_rt");
const categoryRouter = require("./routes/category_rt");
const authRouter = require("./routes/auth_rt");
const commentsRouter = require("./routes/comment_rt");
const notificationRouter = require('./routes/notification_rt')
const likeRouter = require('./routes/like_rt')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require("./utils/swagger")

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cookieParser())
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.static('upload'))

app.use(carRouter);
app.use(categoryRouter);
app.use(authRouter);
app.use(commentsRouter);
app.use(notificationRouter);
app.use(likeRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`working on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
