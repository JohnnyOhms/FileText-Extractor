import { Box, IconButton, Paper } from "@mui/material";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { openResult, reRenderComponent } from "../../slice/globalSlice";
import { formateDate } from "../../utils/date";
import { saveText } from "../../slice/textSlice";

const Result = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  margin: "auto",
  padding: "7px",
  wordWrap: "break-word",
  overflowY: "scroll",
}));

export const ResultText = ({ text }) => {
  const dispatch = useDispatch();

  const handleSaveClick = (e) => {
    dispatch(saveText({ text, date: formateDate() }));
    dispatch(openResult());
    //re render sectionTwo component
    dispatch(reRenderComponent());
  };

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
        sx={{ display: "flex", flexDirection: "column", padding: 2 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => dispatch(openResult())}>
            <ClearIcon />
          </IconButton>

          <span>
            <IconButton>
              <ContentCopyIcon />
            </IconButton>

            <IconButton onClick={handleSaveClick}>
              <SaveAltIcon />
            </IconButton>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "7px",
          }}
        >
          <p style={{ marginRight: "10px", fontSize: "12px" }}>Copy</p>
          <p style={{ marginRight: "10px", fontSize: "12px" }}>Save</p>
        </div>
        <Result>{text}</Result>
      </Paper>
    </Box>
  );
};
