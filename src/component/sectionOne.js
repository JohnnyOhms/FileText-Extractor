import React, { useEffect, useRef, useState } from "react";
import {
  BaseContainer,
  CameraLabel,
  DOCXLabel,
  FileLabel,
  PDFLabel,
  SectionOneDiv,
} from "../styles/styledDashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, Typography } from "@mui/material";
import { Item } from "../pages/dashboard";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { openCamera } from "../slice/globalSlice";
import { FileUpload } from "./FileUpload";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const FileItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: { sm: "30%", md: "30%", xs: "10%" },
  width: "70%",
  margin: " auto",
  display: "flex",
  flexDirection: "column",
}));
const FileItem_2 = styled(Paper)(({ theme }) => ({
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
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleCamera = () => {
    dispatch(openCamera());
  };

  const ImageFile = () => {
    setFileName("image/png, image/gif, image/jpeg, image/jpg");
    inputFileRef.current.click();
  };

  const PdfFile = () => {
    setFileName("application/pdf");
    inputFileRef.current.click();
  };

  const DocxFile = () => {
    setFileName(".docx");
    inputFileRef.current.click();
    return <FileUpload fileRef={inputFileRef} fileType={fileName} />;
  };

  return (
    <SectionOneDiv ref={scrollRef}>
      <FileUpload fileRef={inputFileRef} fileType={fileName} />
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
              onClick={handleCamera}
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
              onClick={ImageFile}
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
        <FileItem_2>
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
              onClick={PdfFile}
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
              onClick={DocxFile}
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
        </FileItem_2>
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
                  image.jpg
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
