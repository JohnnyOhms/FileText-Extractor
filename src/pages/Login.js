import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Footer, LoginForm, LoginHeader } from "../styles/login";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../slice/authSlice";
import Spinner from "../component/Loader/Spinner";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.path || "/dashboard";

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (!user) return;
    navigate(redirect, { replace: true });
  }, [user]);

  useEffect(() => {
    if (error) return alert("failed to login up, try again");
  }, [error]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Input Fields cannot be blank");
    }
    dispatch(fetchUserData({ url: "login", body: { email, password } }));
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
        <LoginHeader>
          <h1>Welcome </h1>
        </LoginHeader>
        <LoginForm>
          <form autoComplete="off" onSubmit={submit}>
            <TextField
              sx={{ margin: "10px 0" }}
              id="outlined-basic"
              label="email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              sx={{ margin: "10px 0" }}
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              label="Password"
              autoComplete="off"
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
            <Link
              to="/forgot"
              className="forgot"
              style={{ textDecoration: "none", color: "black" }}
            >
              Forgotten Password ?
            </Link>
            <Button
              variant="contained"
              style={{ background: blue[600] }}
              onClick={submit}
              type="submit"
              disabled={loading ? true : false}
            >
              Login
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
          <Link to="/register">
            <Button variant="contained" style={{ background: "orangeRed" }}>
              Sign up
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
