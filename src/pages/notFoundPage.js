import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "black",
      }}
    >
      <Link to="/" style={{ margin: "auto", color: "white" }}>
        <p>404 error | Page not Found click Here to go Back</p>
      </Link>
    </div>
  );
};
