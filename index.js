"use strict";

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// IMPORTANT: multer config
const upload = multer({ storage: multer.memoryStorage() });

// MAIN API ROUTE (FCC REQUIRED)
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {

  // MUST use req.file
  if (!req.file) {
    return res.json({ error: "file not uploaded" });
  }

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// START SERVER
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});