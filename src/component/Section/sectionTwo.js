import React, { useEffect, useState } from "react";
import { SectionTwoDiv } from "../../styles/styledDashboard";
import { Item } from "../../pages/dashboard";
import styled from "@emotion/styled";
import { Avatar, Badge, Paper, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { openResult } from "../../slice/globalSlice";
import { loadTextData } from "../../slice/textSlice";
import Spinner from "../Loader/Spinner";
import api from "../../utils/api";

const Profile = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "10%",
  width: "98%",
  margin: "15px auto",
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

export const SectionTwo = ({ scrollRef, count }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const savedText = useSelector((state) => state.loadText.data);
  const loading = useSelector((state) => state.loadText.loading);
  const error = useSelector((state) => state.loadText.error);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    if (!user) return;
    api
      .get("http://localhost:9000/api/getalltext")
      .then((res) => {
        setSaved(res.data.data);
      })
      .catch((err) => {
        alert("something went wrong, refreash page");
        console.log(err);
      });
  }, [count, user]);

  useEffect(() => {
    console.log("dispatch action");
    if (!user) return;
    dispatch(loadTextData({ url: "getalltext" }));
  }, [dispatch, user]);

  return (
    <SectionTwoDiv ref={scrollRef}>
      <Item
        variant="outlined"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Profile variant="outlined">
          <Avatar sx={{ bgcolor: orange[800] }}>
            {user && user.user.username[0]}
          </Avatar>
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
              {user && user.user.username}
            </Typography>
            {/* checks how many times the component is rendered */}
            <p style={{ visibility: "hidden" }}>{count}</p>
            {/*  */}
            <Typography variant="body2">
              <Badge
                badgeContent={
                  (savedText && savedText.data.length) ||
                  (saved && saved.length)
                }
                color="warning"
              >
                <NotificationsIcon sx={{ fontSize: "30px" }} />
              </Badge>
            </Typography>
          </div>
        </Profile>
        <ProfileDetails variant="outlined" sx={{ overflowY: "scroll" }}>
          {/* first render */}
          {loading ? (
            <Spinner />
          ) : (
            savedText &&
            savedText.data.length > 0 &&
            savedText.data.map((item, index) => (
              <div key={index + 1}>
                <ListItem>
                  <ListItemAvatar>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.text.substring(0, 30) + "....."}
                  />
                  <React.Fragment>
                    <IconButton sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}>
                      <DeleteIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => dispatch(openResult())}
                      sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}
                    >
                      <ArticleIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                    <IconButton sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}>
                      <ContentCopyIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </React.Fragment>
                </ListItem>
              </div>
            ))
          )}
          {/*  */}
          {/* alternative render*/}
          {!savedText &&
            saved &&
            saved.length > 0 &&
            saved.map((item, index) => (
              <div key={index + 1}>
                <ListItem>
                  <ListItemAvatar>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.text.substring(0, 30) + "....."}
                  />
                  <React.Fragment>
                    <IconButton sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}>
                      <DeleteIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => dispatch(openResult())}
                      sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}
                    >
                      <ArticleIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                    <IconButton sx={{ mx: { xs: "1px", sm: 1, md: 1 } }}>
                      <ContentCopyIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </React.Fragment>
                </ListItem>
              </div>
            ))}
          {/*  */}
          {/* no results */}
          {!savedText && saved.length <= 0 && (
            <p style={{ fontSize: "20px" }}>
              Nothing to display. "sign in or save new text"
            </p>
          )}
          {/*  */}
          {error && (
            <p style={{ fontSize: "20px" }}>
              failed to load. "try again later"
            </p>
          )}
        </ProfileDetails>
      </Item>
    </SectionTwoDiv>
  );
};
