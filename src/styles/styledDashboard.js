import styled from "styled-components";

export const DashboardWraper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const SectionOneDiv = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100vw;
  }
  @media (max-width: 900px) {
    width: 100vw;
  }
`;

export const SectionTwoDiv = styled.div`
  width: 50vw;
  height: 100vh;
  display: inline;

  @media (max-width: 600px) {
    width: 100vw;
  }
  @media (max-width: 900px) {
    width: 100vw;
  }
`;

export const CameraLabel = styled.p`
  font-size: 25px;
  padding: 10px;
  margin-left: 15%;

  @media (max-width: 600px) {
    font-size: 20px;
    margin-left: 10%;
  }
`;

export const FileLabel = styled.p`
  font-size: 25px;
  padding: 10px;
  margin-right: 15%;

  @media (max-width: 600px) {
    font-size: 20px;
    margin-right: 10%;
  }
`;

export const PDFLabel = styled.p`
  font-size: 18px;
  padding: 10px;
  margin-left: 15%;

  @media (max-width: 600px) {
    font-size: 13px;
    margin-left: 10%;
  }
`;

export const DOCXLabel = styled.p`
  font-size: 18px;
  padding: 10px;
  margin-right: 15%;

  @media (max-width: 600px) {
    font-size: 13px;
    margin-right: 10%;
  }
`;

export const BaseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
