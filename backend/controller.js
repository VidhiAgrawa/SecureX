const fs = require("fs");
const crypto = require("crypto");

exports.uploadFile = (req, res) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);

  const input = fs.createReadStream(req.file.path);
  const encryptedPath = `uploads/encrypted-${req.file.originalname}`;
  const output = fs.createWriteStream(encryptedPath);

  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    res.json({
      message: "File encrypted & uploaded!",
      encryptedFile: `encrypted-${req.file.originalname}`,
      key: key.toString("hex"),
      iv: iv.toString("hex"),
    });
  });
};

exports.decryptFile = (req, res) => {
  const { key, iv, encryptedFile } = req.body;
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );

  const input = fs.createReadStream(`uploads/${encryptedFile}`);
  const decryptedPath = `uploads/decrypted-${encryptedFile.split("encrypted-")[1]}`;
  const output = fs.createWriteStream(decryptedPath);

  input.pipe(decipher).pipe(output);

  output.on("finish", () => {
    res.json({
      message: "File decrypted!",
      decryptedFile: `decrypted-${encryptedFile.split("encrypted-")[1]}`,
    });
  });
};
