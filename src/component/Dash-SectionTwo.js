import React from "react";
import { SectionTwoDiv } from "../styles/styledDashboard";
import { Item } from "../pages/dashboard";
import styled from "@emotion/styled";
import { Avatar, Badge, Paper, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  height: "100%",
  overflowY: "scroll",
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
        <ProfileDetails variant="outlined">
          <Demo>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" />
                <React.Fragment>
                  <IconButton sx={{ mx: { xs: "1x", sm: 1, md: 1 } }}>
                    <DeleteIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                  <IconButton sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}>
                    <ArticleIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                  <IconButton sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}>
                    <ContentCopyIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </React.Fragment>
              </ListItem>
            </List>
          </Demo>
        </ProfileDetails>
      </Item>
    </SectionTwoDiv>
  );
};
