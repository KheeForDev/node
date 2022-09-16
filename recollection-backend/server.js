require("dotenv").config();

const express = require("express");
const logger = require("./middleware/logger");

const PORT = process.env.PORT || 3500;
const app = express();

// built-in middleware for json
app.use(express.json());



app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))