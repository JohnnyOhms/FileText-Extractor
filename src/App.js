import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { FileUpload } from "./component/fileUpload";
import styled from "styled-components";
import { ThemeProvider, createTheme } from "@mui/material";
import { NotFoundPage } from "./pages/notFoundPage";

const Container = styled.div`
  background-color: grey;
  color: white;
`;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#151414",
      },
      secondary: {
        main: "#d88507",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
