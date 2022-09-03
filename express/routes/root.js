const express = require("express");
const router = express.Router();
const path = require("path");

// begin and end with a /
// OR match index.html
// () make .html optional
router.get("^/$|index(.html)?", (req, res) => {
    // find index file from root directory
    // res.sendFile("./views/index.html", { root: __dirname });

    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;