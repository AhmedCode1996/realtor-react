import styled from "styled-components";
import sign from "../assets/sign3.svg";
import email from "../assets/email.svg";
import password from "../assets/password.svg";
import eye from "../assets/eye.svg";
import showPassword from "../assets/showPassword.svg";
import google from "../assets/google.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
const Signin = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <section style={{ paddingTop: "2rem" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "5rem",
        }}
      >
        Sign in
      </h2>
      <Container>
        <div className="sign-in-image">
          <img src={sign} alt="form logo" />
        </div>
        <div className="sign-in-form">
          <form className="flow-content">
            <p>
              <img className="input-icon" src={email} alt="email logo" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={formHandler}
              />
            </p>
            <p>
              <img className="input-icon" src={password} alt="email logo" />
              <input
                type={passwordHidden ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={formHandler}
              />
              {passwordHidden ? (
                <img
                  onClick={() => setPasswordHidden(!passwordHidden)}
                  className="password-toggle"
                  src={eye}
                  alt="shown password"
                />
              ) : (
                <img
                  onClick={() => setPasswordHidden(!passwordHidden)}
                  className="password-toggle"
                  src={showPassword}
                  alt="shown password"
                />
              )}
            </p>
            <div className="form-info">
              <p>
                Don't have an account? <Link to="/sign-up">Register</Link>{" "}
              </p>
              <p>
                {" "}
                <Link to="/forgot-password">Forgot Password?</Link>{" "}
              </p>
            </div>
            <button className="form-submit" type="submit">
              Sign in
            </button>
            <div className="form-line">
              <span>OR</span>
            </div>
            <button className="google-button">
              <img src={google} alt="google button" />
              Continue with Google
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Signin;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 6rem;
  max-width: 1000px;
  margin-inline: auto;
  padding-inline: 1rem;
  & > div {
    flex-basis: 50%;
    padding: 1rem;
  }
  .sign-in-image {
    transform: translateY(-5rem) scale(1.2);
  }
  .flow-content > * + * {
    margin-top: 3rem;
  }
  p {
    position: relative;
    overflow: hidden;
  }
  input {
    width: 100%;
    padding: 1rem 2rem 1rem 8rem;
    font-size: 2rem;
    box-shadow: 0 0 12px -6px gray;
    border: 2px solid transparent;
    border-radius: 1rem;
    transition: all 0.3s;
    outline: none;
    &:focus {
      box-shadow: 0 0 12px -5px gray;
      border: 2px solid #a3d8ff;
    }
  }
  img.input-icon {
    max-width: 60px;
    height: 100%;
    position: absolute;
    transform: translate(1%, 1%);
    border-right: 1.5px solid gray;
    padding: 0.5rem;
  }
  .password-toggle {
    max-width: 30px;
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    cursor: pointer;
  }
  .form-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.8rem;
    & p:first-child a {
      color: #2196f3;
    }
    & p:last-child a {
      color: #3235b7;
    }
  }
  .form-submit {
    outline: none;
    border: none;
    background-color: #000066;
    color: white;
    width: 100%;
    padding: 1rem 2rem;
    font-size: 2rem;
    border-radius: 1rem;
  }
  .form-line {
    position: relative;
    font-size: 1.5rem;
    width: 100%;
    height: 1.5px;
    background-color: gray;
    span {
      font-weight: bold;
      padding-inline: 1rem;
      text-align: center;
      position: absolute;
      right: calc(50% - 4rem);
      transform: translate(-50%, -50%);
      z-index: 5;
      background-color: #f0fdf4;
    }
  }
  .google-button {
    display: flex;
    justify-content: center;
    algin-align: center;
    column-gap: 1rem;
    background-color: #2196f3;
    width: 100%;
    border-radius: 1rem;
    padding: 1rem 2rem;
    color: white;
    font-size: 2rem;
    & img {
      max-width: 30px;
    }
  }
`;
