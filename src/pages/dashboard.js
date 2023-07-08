import React from "react";
import { NavBar } from "../component/Navbar";
import {
  DashboardWraper,
  SectionOne,
  SectionTwo,
} from "../styles/styledDashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Paper, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  margin: "10px 0",
  lineHeight: "60px",
}));

export const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <DashboardWraper>
        <Item>
          <SectionOne>
            <div
              style={{
                height: "40%",
                width: "70%",
                margin: "2% auto 0 auto",
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
              <p
                style={{ marginLeft: "15%", fontSize: "25px", padding: "10px" }}
              >
                Camera
              </p>
              <p
                style={{
                  marginRight: "15%",
                  fontSize: "25px",
                  padding: "10px",
                }}
              >
                Gallery
              </p>
            </div>
          </SectionOne>
        </Item>
        <SectionTwo>
          <Item>vfklkfl</Item>
        </SectionTwo>
      </DashboardWraper>
    </div>
  );
};
