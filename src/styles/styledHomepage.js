import styled, { keyframes } from "styled-components";

export const IntroContainer = styled.div`
  height: 100vh;
  color: black;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

export const IntroWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const IntroSection = styled.div`
  margin: auto 0 auto 20rem;
  padding: 1rem;
  height: 80vh;
  width: 50vw;
  word-wrap: break-word;

  @media (max-width: 600px) {
    margin: 2px;
    width: 100vw;
  }

  @media (max-width: 900px) {
    margin: 2px;
    width: 100vw;
  }
`;

export const IntroHeader = styled.h1`
  font-size: 3.2rem;
  font-family: "Lucida Sans", Arial, sans-serif, serif;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 1.9rem;
  }
`;

export const StartWrapper = styled.div`
  display: flex;
  width; 60%
  background-color: red;
  cursor: pointer;

   @media (max-width: 600px) {
   flex-direction: column;
  }
`;

export const IntroStartBtn = styled.h1`
  background-color: #106dd8;
  color: white;
  padding: 0.5rem;
  margin: 23px 8px;
  border-radius: 1.3rem;
  width: 12rem;
`;
