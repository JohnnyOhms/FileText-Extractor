import React, { useEffect } from "react";
import {
  BaseContainer,
  CameraLabel,
  DOCXLabel,
  FileLabel,
  PDFLabel,
  SectionOneDiv,
} from "../../styles/styledDashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, Typography } from "@mui/material";
import { Item } from "../../pages/dashboard";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  addFileData,
  addText,
  displayFile,
  openCamera,
  openResult,
} from "../../slice/globalSlice";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import api from "../../utils/api";

const FileItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: { sm: "30%", md: "30%", xs: "10%" },
  width: "70%",
  margin: " auto",
  display: "flex",
  flexDirection: "column",
}));
const FileItem2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: { sm: "20%", md: "20%", xs: "7%" },
  width: "40%",
  margin: "10px auto",
  display: "flex",
  flexDirection: "column",
  padding: 5,
}));

export const SectionOne = ({ scrollRef }) => {
  const filePreview = useSelector((state) => state.global.displayFile);
  const fileData = useSelector((state) => state.global.fileData);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("imgUpload", file);

      api
        .post("upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        })
        .then((res) => {
          dispatch(addFileData(file));
          dispatch(displayFile());
        })
        .catch((err) => console.log("ErrorMssg:" + err));
    }
  };

  const handleButtonClick = (newAcceptedFileType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = newAcceptedFileType;
    input.style.display = "none";
    input.addEventListener("change", handleFileChange);
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const extractText = () => {
    api
      .post("extract")
      .then((res) => {
        dispatch(openResult());
        dispatch(addText(res.data.text));
      })
      .catch((err) => console.log(err));
  };

  return (
    <SectionOneDiv ref={scrollRef}>
      <Item variant="outlined">
        <h2>Select image to Extract</h2>
        <FileItem variant="outlined">
          <div
            style={{
              height: "100%",
              width: "100%",
              margin: " auto",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => dispatch(openCamera())}
              style={{
                background: "#1976d2",
                margin: " auto auto 0 auto",
                borderRadius: "50%",
                padding: "30px",
                display: "flex",
              }}
            >
              <CameraAltIcon
                sx={{
                  color: "white",
                  margin: "auto",
                  fontSize: { md: "70px", sm: "60px", xs: "50px" },
                }}
              ></CameraAltIcon>
            </span>
            <span
              onClick={() => handleButtonClick("image/*")}
              style={{
                background: "#1976d2",
                margin: "auto auto 0 auto",
                borderRadius: "50%",
                padding: "30px",
                display: "flex",
              }}
            >
              <CollectionsIcon
                sx={{
                  color: "white",
                  fontSize: { md: "70px", sm: "60px", xs: "50px" },
                }}
              ></CollectionsIcon>
            </span>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <CameraLabel>Camera</CameraLabel>
            <FileLabel>Gallery</FileLabel>
          </div>
        </FileItem>
        {/* start */}
        <FileItem2>
          <div
            style={{
              height: "100%",
              width: "100%",
              margin: " auto",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => handleButtonClick("application/pdf")}
              style={{
                background: "grey",
                margin: " auto auto 0 auto",
                borderRadius: "50%",
                padding: "15px",
                display: "flex",
              }}
            >
              <PictureAsPdfIcon
                sx={{
                  color: "white",
                  margin: "auto",
                  fontSize: { md: "30px", sm: "30px", xs: "20px" },
                }}
              />
            </span>
            <span
              onClick={() => handleButtonClick(".docx")}
              style={{
                background: "grey",
                margin: "auto auto 0 auto",
                borderRadius: "50%",
                padding: "15px",
                display: "flex",
              }}
            >
              <DocumentScannerIcon
                sx={{
                  color: "white",
                  fontSize: { md: "30px", sm: "30px", xs: "20px" },
                }}
              />
            </span>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <PDFLabel> PDF</PDFLabel>
            <DOCXLabel> DOCX</DOCXLabel>
          </div>
        </FileItem2>
        {/* end */}
        <div
          style={{
            width: "70%",
            height: "20%",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "80%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {filePreview && (
              <>
                <DescriptionIcon
                  sx={{
                    height: "70%",
                    fontSize: { md: "200px", sm: "200px", xs: "200px" },
                    color: "grey",
                    margin: "0 auto",
                  }}
                />
                <Typography variant="body2" sx={{ mt: "30px" }}>
                  {fileData[0].name}
                </Typography>

                <BaseContainer>
                  <h3>No preview available</h3>

                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={{
                      background: blue[700],
                      color: "white",
                      // padding: "0 10px",
                      borderRadius: "10px",
                    }}
                    onClick={extractText}
                  >
                    Extract
                  </Button>
                </BaseContainer>
              </>
            )}
          </div>
        </div>
      </Item>
    </SectionOneDiv>
  );
};
