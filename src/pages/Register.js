import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Footer, LoginForm, LoginHeader } from "../styles/login";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: blue[400],
      },

      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  }));

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: "10px", color: "#0088ff" }}>
          Register an account
        </h2>
        <LoginForm>
          <form autoComplete="off">
            <CustomTextField
              sx={{ margin: "5px 0" }}
              id="outlined-basic"
              label="email"
              variant="outlined"
              fullWidth
              type="email"
            />
            <CustomTextField
              sx={{ margin: "5px 0" }}
              id="outlined-basic"
              label="username"
              variant="outlined"
              fullWidth
              type="text"
            />
            <CustomTextField
              fullWidth
              sx={{ margin: "5px 0" }}
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              label="Password"
              InputProps={{
                endAdornment: (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                ),
              }}
            />
            <CustomTextField
              fullWidth
              sx={{ margin: "5px 0" }}
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              label="comfirm Password"
              InputProps={{
                endAdornment: (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
                ),
              }}
            />

            <Button variant="contained" style={{ background: blue[600] }}>
              Sign up
            </Button>
          </form>
          <Typography variant="body2"> or continue with</Typography>
          <hr />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                border: "1px solid grey",
                margin: " auto auto 0 auto",
                borderRadius: "50%",
                padding: "15px",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Avatar src={require("../img/google.png")} />
            </span>
            <span
              style={{
                border: "1px solid grey",
                margin: " auto auto 0 auto",
                borderRadius: "50%",
                padding: "15px",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Avatar src={require("../img/microsoft.png")} />
            </span>
          </div>

          <Link to="/login">
            <Button variant="contained" style={{ background: "orangeRed" }}>
              Login
            </Button>
          </Link>
        </LoginForm>
      </Paper>

      <Footer>
        <p>© {new Date().getFullYear()} FileTextExtractor</p>
      </Footer>
    </>
  );
}
