const express = require("express");
const multer = require("multer");
const helmet = require("helmet");
const { uploadFile, decryptFile } = require("./controller.js");
const cors = require("cors")

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({origin:"https://secure-file-x-indol.vercel.app/"}))

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), uploadFile);
app.post("/decrypt", decryptFile);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
