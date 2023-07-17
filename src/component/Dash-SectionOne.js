import React from "react";
import {
  BaseContainer,
  CameraLabel,
  FileLabel,
  SectionOneDiv,
} from "../styles/styledDashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, Typography } from "@mui/material";
import { Item } from "../pages/dashboard";
import styled from "@emotion/styled";

const FileItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: { sm: "30%", md: "30%", xs: "10%" },
  width: "70%",
  margin: " auto",
  display: "flex",
  flexDirection: "column",
}));

export const SectionOne = () => {
  return (
    <SectionOneDiv>
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
              style={{
                background: "grey",
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
              style={{
                background: "grey",
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
        <div
          style={{
            width: "70%",
            height: "50%",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "80%",
              margin: "2px auto",
            }}
          >
            <DescriptionIcon
              sx={{
                height: "70%",
                fontSize: { md: "300px", sm: "300px", xs: "200px" },
                color: "grey",
              }}
            />
            <Typography variant="body2">image.jpg</Typography>
            <BaseContainer>
              <h3>No preview available</h3>
              <Button variant="contained" endIcon={<SendIcon />}>
                Extract
              </Button>
            </BaseContainer>
          </div>
        </div>
      </Item>
    </SectionOneDiv>
  );
};
