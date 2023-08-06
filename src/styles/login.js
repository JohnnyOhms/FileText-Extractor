import styled from "styled-components";

export const ErrorRegister = styled.div`
  color: #c63b2c;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 0;
`;

export const SuccessRegister = styled.div`
  color: #00efa7;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 0;
`;

export const LoginHeader = styled.div`
  width: 300px;
  display: flex;
  padding: 50px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    color: #0088ff;
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
  }
`;

export const LoginForm = styled.div`
  background-color: #ededed7c;
  height: fit-content;
  width: 350px;
  border-radius: 10px;
  display: flex;
  box-shadow: 0 1px 2px grey;
  padding: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  button {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1.2rem;
    box-shadow: grey;
    font-weight: 600;
    cursor: pointer;
    margin: 10px 0;
  
`;

export const Footer = styled.div`
  color: black;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
