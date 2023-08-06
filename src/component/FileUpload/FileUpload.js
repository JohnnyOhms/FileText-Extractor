import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFileData, displayFile } from "../../slice/globalSlice";

export const FileUpload = ({ fileRef, fileType }) => {
  const [fileData, setFileData] = useState([]);
  const dispatch = useDispatch();
  const file = useSelector((state) => state.global.fileData);

  const sendFile = () => {
    console.log(file);
    //   const formData = new FormData();
    //   formData.append("imgUpload", file);
    //   axios
    //     .post("http://localhost:9000/api/upload", file)
    //     .then((res) => {
    //       console.log(res);
    //       dispatch(displayFile());
    //     })
    //     .catch((err) => console.log("ErrorMssg:" + err));
    //
  };

  const OnFileChange = (e) => {
    dispatch(addFileData(e.target.files[0]));
    sendFile();
  };

  return (
    <div className="container">
      <div className="row">
        <form encType="multipart/form-data">
          <input
            hidden
            ref={fileRef}
            type="file"
            name="imgUpload"
            onChange={(e) => OnFileChange(e)}
            accept={fileType}
          />
        </form>
      </div>
    </div>
  );
};
