import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import styled from "styled-component";

const Container = styled.div`
  background-color: black;
  color: white;
`;

function App() {
  return (
    <Container>
      <h4>Render App</h4>
      <ul>
        <li>
          <Link to="/home">Home</Link> <br />
        </li>
        <li>
          <Link to="/profile">profile</Link> <br />
        </li>
      </ul>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Container>
  );
}

export default App;
