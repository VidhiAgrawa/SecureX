import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [encryptedFile, setEncryptedFile] = useState("");
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("securefilex-production.up.railway.app/upload", formData);
    setKey(res.data.key);
    setIv(res.data.iv);
    setEncryptedFile(res.data.encryptedFile);
    setMsg(res.data.message);
  };

  const handleDecrypt = async () => {
    const res = await axios.post("securefilex-production.up.railway.app/decrypt", {
      key,
      iv,
      encryptedFile,
    });
    setMsg(res.data.message);
  };

  return (
    <div className="filebox">
      <h2>Secure File Transfer</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Encrypt</button>
      {key && (
        <>
          <p><strong>Key:</strong> {key}</p>
          <p><strong>IV:</strong> {iv}</p>
          <button onClick={handleDecrypt}>Decrypt File</button>
        </>
      )}
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default FileUpload;
