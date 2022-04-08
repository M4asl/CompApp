const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const dbErrorHandler = require("./helpers/dbErrorHandler");
const productRoutes = require("./routes/productRoutes.js");
const connectDB = require("./config/db.js");
dotenv.config();

connectDB();

const app = express();

// parse body params and attache them to req.body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.options("*", cors());

app.use("/api/products", productRoutes);

app.use(express.static(path.resolve(process.cwd(), "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "frontend/build/index.html"));
});

app.use(dbErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
