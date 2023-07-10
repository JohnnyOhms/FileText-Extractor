import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./main";
import { ThemeProvider, createTheme } from "@mui/material";
import { NotFoundPage } from "./pages/notFoundPage";
import { Dashboard } from "./pages/dashboard";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffff",
      },
      secondary: {
        main: "#d88507",
      },
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
