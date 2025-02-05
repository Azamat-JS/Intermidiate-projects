require("dotenv").config();
require("express-async-errors");
require('winston-mongodb')

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require("./utils/swagger")

const booksRouter = require("./routes/books_rt");
const authorRouter = require("./routes/authors_rt");
const authRouter = require("./routes/auth_rt");
const commentsRouter = require("./routes/comments_rt");
const logRouter = require('./routes/logger_rt')
const categoryRouter = require('./routes/category_rt')
const cookieParser = require('cookie-parser')

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors({credentials: true}))
app.use(express.json());
app.use(cookieParser())

app.use('/library', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(booksRouter);
app.use(authorRouter);
app.use(authRouter);
app.use(commentsRouter);
app.use(logRouter)
app.use(categoryRouter)

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
