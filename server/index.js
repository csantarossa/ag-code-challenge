const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const vehicleData = JSON.parse(req.body.vehicle);

    if (!vehicleData) {
      return res
        .status(400)
        .json({ success: false, message: "Error: No vehicle parsed." });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Error: No file uploaded.",
      });
    }

    fs.readFile(file.path, "utf-8", (error, logbook) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ success: false, message: "Error: Unable to read file." });
      }
      return res.status(200).json({
        success: true,
        message: "Success",
        data: { vehicleData: vehicleData, logbook: logbook },
      });
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
