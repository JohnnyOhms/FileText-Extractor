import React from "react";
import { SectionTwoDiv } from "../styles/styledDashboard";
import { Item } from "../pages/dashboard";
import styled from "@emotion/styled";
import { Avatar, Badge, Paper, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Profile = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "10%",
  width: "98%",
  margin: "0 auto",
  padding: "10px ",
  lineHeight: "60px",
  display: "flex",
}));

const ProfileDetails = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "90%",
  width: "98%",
  margin: "10px auto",
  padding: "10px",
  lineHeight: "60px",
}));

export const SectionTwo = () => {
  return (
    <SectionTwoDiv>
      <Item variant="outlined">
        <Profile variant="outlined">
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "2px",
              padding: ".7rem",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "17px" }}>
              New_user
            </Typography>
            <Typography variant="body2">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{ fontSize: "30px" }} />
              </Badge>
            </Typography>
          </div>
        </Profile>
        <ProfileDetails variant="outlined"></ProfileDetails>
      </Item>
    </SectionTwoDiv>
  );
};
