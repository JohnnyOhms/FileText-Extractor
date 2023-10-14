import React, { useRef } from "react";
import { NavBar } from "../component/Navbar/Navbar";
import { DashboardWraper } from "../styles/styledDashboard";
import { styled } from "@mui/system";
import { SectionOne } from "../component/Section/sectionOne";
import { IconButton, Paper, Stack } from "@mui/material";
import { SectionTwo } from "../component/Section/sectionTwo";
import { ResultText } from "../component/Result/resultText";
import { CameraCapture } from "../component/Capture/captureimage";
import { useDispatch, useSelector } from "react-redux";
import { topBtn, bottomBtn } from "../slice/globalSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  lineHeight: "60px",
  borderRadius: 0,
}));

export const Dashboard = () => {
  const openCamera = useSelector((state) => state.global.Camera);
  const openResult = useSelector((state) => state.global.Result);
  const top = useSelector((state) => state.global.top);
  const bottom = useSelector((state) => state.global.bottom);
  const text = useSelector((state) => state.global.extractedText);
  const dispatch = useDispatch();
  const sectionOneScrollRef = useRef(null);
  const sectionTwoScrollRef = useRef(null);

  return (
    <Stack sx={{ height: "100%", width: "100%" }}>
      <NavBar />
      <DashboardWraper>
        <SectionOne scrollRef={sectionOneScrollRef} />
        <SectionTwo scrollRef={sectionTwoScrollRef} />
      </DashboardWraper>
      <>
        {openCamera || openResult ? (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: "4",
            }}
          >
            {openResult && <ResultText text={text} />}
            {openCamera && <CameraCapture />}
          </div>
        ) : null}
      </>
      {top && (
        <IconButton
          onClick={() => {
            sectionTwoScrollRef.current.scrollIntoView({ behavior: "smooth" });
            dispatch(topBtn());
          }}
          sx={{
            position: "fixed",
            top: "10%",
            right: "2%",
            zIndex: 3,
          }}
        >
          <KeyboardArrowDownIcon
            sx={{ display: { md: "none" }, fontSize: "40px" }}
          />
        </IconButton>
      )}
      {bottom && (
        <IconButton
          onClick={() => {
            sectionOneScrollRef.current.scrollIntoView({ behavior: "smooth" });
            dispatch(bottomBtn());
          }}
          sx={{
            position: "fixed",
            bottom: "10%",
            right: "2%",
            zIndex: 3,
          }}
        >
          <KeyboardArrowUpIcon
            sx={{ display: { md: "none" }, fontSize: "40px" }}
          />
        </IconButton>
      )}
    </Stack>
  );
};
