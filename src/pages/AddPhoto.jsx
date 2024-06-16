import React, { useState } from "react";
import axios from "axios";

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading the file", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <img src={preview} alt="Profile Preview" width="100" height="100" />
      )}
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
};

export default PhotoUpload;
