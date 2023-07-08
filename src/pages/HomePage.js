import React from "react";
import styled from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";

const IntroContainer = styled.div`
  height: 100vh;
  color: black;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const IntroHeader = styled.h1`
  font-size: 3.2rem;
  font-family: "Lucida Sans", Arial, sans-serif, serif;
  margin: 2rem auto;
`;

const IntroSection = styled.div`
  margin: auto 0 auto 20rem;
  padding: 1rem;
  height: 80vh;
  width: 35vw;
  word-wrap: break-word;
`;

const StartWrapper = styled.div`
  display: flex;
  width; 60%
`;

const IntroStartBtn = styled.h1`
  background-color: #106dd8;
  color: white;
  padding: 0.5rem;
  margin: 23px 8px;
  border-radius: 1.3rem;
  width: 12rem;
`;

const IntroWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const StartPage = () => {
  return (
    <IntroContainer className="home-container">
      <IntroWrapper>
        <IntroSection>
          <IntroHeader>
            Fastest way to <br />
            extract content out of image{" "}
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
                fontSize: "18px",
                margin: "auto 0 auto 7px",
                color: "#106dd8",
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
