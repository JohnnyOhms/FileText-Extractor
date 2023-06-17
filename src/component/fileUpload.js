import axios from "axios";
import React, { useState } from "react";

export const FileUpload = () => {
  const [image, setImages] = useState("");

  const onFileChange = (e) => {
    setImages(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgUpload", image);
    axios.post("http://localhost:8080/api/upload", formData, {}).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={(e) => onSubmit(e)}>
          <h3>Upload Your File</h3>
          <div className="form-group">
            <input type="file" onChange={(e) => onFileChange(e)} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};