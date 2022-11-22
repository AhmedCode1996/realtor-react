import { useState } from "react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import LogoAnimation from "../assets/logo.gif";
const HeaderLayout = () => {
  const [animatedLogo, setAnimatedLogo] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Container>
          <div
            onClick={() => navigate("/")}
            className="logo"
            onMouseLeave={() => setAnimatedLogo(true)}
            onMouseOver={() => setAnimatedLogo(false)}
          >
            <img src={animatedLogo ? Logo : LogoAnimation} alt="logo" />
          </div>
          <nav className="nav-links">
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderBottom: "2px solid #EB7798", color: "black" }
                  : {
                      borderBottom: "2px solid transparent",
                      transition: "all 0.3s",
                    }
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderBottom: "2px solid #EB7798", color: "black" }
                  : {
                      borderBottom: "2px solid transparent",
                      transition: "all 0.3s",
                    }
              }
              to="offers"
            >
              Offers
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderBottom: "2px solid #EB7798", color: "black" }
                  : {
                      borderBottom: "2px solid transparent",
                      transition: "all 0.3s",
                    }
              }
              to="sign-in"
            >
              Sign in
            </NavLink>
          </nav>
        </Container>
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default HeaderLayout;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin-inline: auto;
  padding-inline: 1rem;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    cursor: pointer;
  }
  .nav-links {
    display: flex;
    align-items: center;
    column-gap: 2.5rem;
    font-size: 1.5rem;
    font-weight: 500;
    color: gray;
  }
  a {
    padding-block: 0.5rem;
  }
`;
