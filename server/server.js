const multer = require("multer");
const express = require("express");
const path = require("path");

const app = express();
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null,'destination string')
    cb(null, "./images");
    //the destination string is the direct path from the server that we want to save
  },
  filename: (req, file, cb) => {
    // cb(null, fileName)
    cb(null, Date.now() + "---" + file.originalname);
    // the .originalname method gives us access to the extension and file type
  },
});

// create middleware of multer and add objects
const upload = multer({ storage: fileStorageEngine });
// the storage property tells how and where to save the files

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single File upload successful");
});

// upload.array takes two parameters (filename, maxCount)
app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("Single File upload successful");
});


app.listen(5000, () => {
  console.log("Server started at port 5000");
});
