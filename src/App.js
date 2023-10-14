import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./main";
import { ThemeProvider, createTheme } from "@mui/material";
import { NotFoundPage } from "./pages/notFoundPage";
import { Loading } from "./component/Loader/Loading";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const Dashboard = lazy(() =>
  import("./pages/dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

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
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
