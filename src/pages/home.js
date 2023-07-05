import React from "react";
import { NavBar } from "../component/Navbar";
import styled from "styled-components";
import { Stack } from "@mui/material";

export const Home = () => {
  const HomeContainer = styled.div`
    height: 100vh;
    justify-content: center;
    background-color: ${"white"};
  `;

  const IntroHeader = styled.h1`
    font-size: 90px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif, serif;
  `;

  return (
    <HomeContainer>
      <NavBar />
    </HomeContainer>
  );
};
