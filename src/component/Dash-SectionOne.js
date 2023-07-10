import React from "react";
import { SectionOneDiv } from "../styles/styledDashboard";
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
  height: "30%",
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
                sx={{ color: "white", margin: "auto", fontSize: "70px" }}
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
                sx={{ color: "white", fontSize: "70px" }}
              ></CollectionsIcon>
            </span>
          </div>
          <div
            style={{
              width: "70%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ marginLeft: "1%", fontSize: "25px", padding: "10px" }}>
              Camera
            </p>
            <p
              style={{
                marginRight: "1%",
                fontSize: "25px",
                padding: "10px",
              }}
            >
              Gallery
            </p>
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
                fontSize: "300px",
                color: "grey",
              }}
            />
            <Typography variant="body2">image.jpg</Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <h3>No preview available</h3>
              <Button variant="contained" endIcon={<SendIcon />}>
                Extract
              </Button>
            </div>
          </div>
        </div>
      </Item>
    </SectionOneDiv>
  );
};
