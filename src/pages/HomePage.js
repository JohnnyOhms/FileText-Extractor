import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import {
  IntroContainer,
  IntroHeader,
  IntroSection,
  IntroStartBtn,
  IntroWrapper,
  StartWrapper,
} from "../styles/styledHomepage";
import { TypewriterEffect } from "../component/TypeWriterEffect";

export const HomePage = () => {
  return (
    <IntroContainer className="home-container">
      <IntroWrapper className="wrapper">
        <IntroSection>
          <IntroHeader>
            Fastest way to
            <TypewriterEffect />
          </IntroHeader>
          <Typography variant="body1">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            illo distinctio numquam perspiciatis beatae consequatur nulla soluta
            magni laborum corporis nesciunt? Distinctio atque ducimus corrupti
            explicabo autem. Nam earum explicabo blanditiis facere tempore
            provident optio temporibus est, eligendi necessitatibus aspernatur?
          </Typography>

          <StartWrapper>
            <IntroStartBtn>
              <Typography
                variant="body2"
                sx={{ margin: "auto", fontSize: "20px" }}
              >
                Get Started for free
              </Typography>
            </IntroStartBtn>
            <Typography
              variant="body2"
              sx={{
                fontSize: "19px",
                margin: "auto 0 auto 7px",
                color: "#106dd8",
                fontWeight: "800",
              }}
            >
              view source code{" "}
              <GitHubIcon
                sx={{ margin: " auto 8px", fontSize: "20px", color: "black" }}
              />{" "}
            </Typography>
          </StartWrapper>
        </IntroSection>
      </IntroWrapper>
    </IntroContainer>
  );
};
