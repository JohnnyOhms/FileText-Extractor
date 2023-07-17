import React from "react";
import { NavBar } from "../component/Navbar";
import { DashboardWraper } from "../styles/styledDashboard";
import { styled } from "@mui/system";
import { SectionOne } from "../component/Dash-SectionOne";
import { Paper, Stack } from "@mui/material";
import { SectionTwo } from "../component/Dash-SectionTwo";
import { ResultText } from "../component/resultText";

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  lineHeight: "60px",
}));

export const Dashboard = () => {
  return (
    <Stack sx={{ height: "100%", width: "100%" }}>
      <NavBar />
      <DashboardWraper>
        <SectionOne />
        <SectionTwo />
      </DashboardWraper>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: "4",
        }}
      >
        <ResultText />
      </div>
    </Stack>
  );
};
