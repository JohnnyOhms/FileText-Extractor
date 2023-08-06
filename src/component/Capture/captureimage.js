import { Box, Button, IconButton, Paper } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { blue, deepOrange } from "@mui/material/colors";
import { openCamera } from "../../slice/globalSlice";
import { useDispatch } from "react-redux";

export const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

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
