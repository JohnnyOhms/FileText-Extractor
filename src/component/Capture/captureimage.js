import { Avatar, Box, Button, IconButton, Paper } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { blue, deepOrange } from "@mui/material/colors";
import { addFileData, displayFile, openCamera } from "../../slice/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const captureImage = useCallback(async () => {
    if (!user) {
      alert("sign in to capture image");
      dispatch(openCamera());
      return navigate("/login");
    }
    const imageSrc = webcamRef.current.getScreenshot();
    await setImageSrc(imageSrc);
    await dispatch(openCamera());
  }, [webcamRef]);

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  useEffect(() => {
    if (imageSrc) {
      const blob = dataURItoBlob(imageSrc);

      const imageFile = new File([blob], "capturedImage.jpg", {
        type: "image/jpeg",
      });
      const formData = new FormData();
      formData.append("imgUpload", imageFile);

      api
        .post("upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(
            addFileData({
              name: `capturedImage ~ ${new Date().toDateString()}`,
            })
          );
          dispatch(displayFile());
        })
        .catch((err) => console.log("ErrorMssg:" + err));
    }
  }, [imageSrc]);

  return (
    <Box
      sx={{
        "& > :not(style)": {
          width: { xs: "100vw", sm: "60vw", md: "50vw" },
          height: { xs: "100vh", sm: "80vh", md: "80vh" },
          m: "auto",
          mt: { xs: 0, sm: "30px", md: "30px" },
          opacity: "1",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => dispatch(openCamera())}>
            <ClearIcon sx={{ color: deepOrange[500], fontSize: "30px" }} />
          </IconButton>
        </div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          height="100%"
        />
        <Button
          onClick={captureImage}
          variant="contained"
          sx={{ background: deepOrange[500], color: "white" }}
          endIcon={<CameraAltIcon sx={{ color: blue[700] }} />}
        >
          Capture image
        </Button>
      </Paper>
    </Box>
  );
};
