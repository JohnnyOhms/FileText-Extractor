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
import { TypewriterEffect } from "../component/TypeWriter/TypeWriterEffect";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <IntroContainer className="home-container">
      <IntroWrapper className="wrapper">
        <IntroSection>
          <IntroHeader>
            Fastest way to Extract
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
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography
                  variant="body2"
                  sx={{ margin: "auto", fontSize: "15px", textAlign: "center" }}
                >
                  Get Started for free
                </Typography>
              </Link>
            </IntroStartBtn>
            <a
              id="source-code"
              href="https://github.com/JohnnyOhms/FileText-Extractor/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "15px",
                  margin: "auto 0 auto 7px",
                  color: "#106dd8",
                  fontWeight: "800",
                }}
              >
                view source code
                <GitHubIcon
                  sx={{ margin: " auto 8px", fontSize: "20px", color: "black" }}
                />{" "}
              </Typography>
            </a>
          </StartWrapper>
        </IntroSection>
      </IntroWrapper>
    </IntroContainer>
  );
};
