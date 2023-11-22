import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Footer, LoginForm } from "../styles/login";
import Spinner from "../component/Loader/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../slice/authSlice";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.path || "/dashboard";

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (!user) return;
    navigate(redirect, { replace: true });
  }, [user]);

  useEffect(() => {
    if (error) return alert("failed to sign up, try again");
  }, [error]);

  const submit = (e) => {
    e.preventDefault();
    if (validity() === true) {
      return dispatch(
        fetchUserData({ url: "register", body: { email, password, username } })
      );
    }
    alert(validity());
  };

  const validity = () => {
    if (!email || !password || !comfirmPassword || !username) {
      return "Input Fields cannot be blank";
    }
    if (password !== comfirmPassword) {
      return "Passwords does not match";
    }

    return true;
  };

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
          <form autoComplete="off" onSubmit={submit}>
            <TextField
              sx={{ margin: "5px 0" }}
              id="outlined-basic"
              label="email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              id="outlined-basic"
              label="username"
              variant="outlined"
              fullWidth
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              sx={{ margin: "5px 0" }}
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <TextField
              fullWidth
              sx={{ margin: "5px 0" }}
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              label="comfirm Password"
              value={comfirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
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

            <Button
              variant="contained"
              style={{ background: blue[600] }}
              type="submit"
              disabled={loading ? true : false}
            >
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
          <div>{loading && <Spinner />}</div>
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
