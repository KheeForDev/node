require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const logger = require("./middleware/logger");
const PORT = process.env.PORT || 3500;
const app = express();

// connect to MongoDB
connectDB();

// built-in middleware for json
app.use(express.json());

// routes
app.use("/register", require("./route/register"));
app.use("/login", require("./route/login"));
app.use("/configsetting", require("./route/api/configSetting"));


mongoose.connection.once("open", () => {
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});