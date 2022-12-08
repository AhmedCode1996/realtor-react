import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import LogoAnimation from '../assets/logo.gif';
const HeaderLayout = () => {
  const [profileStatus, setProfileStatus] = useState(null);
  const [animatedLogo, setAnimatedLogo] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setProfileStatus(true) : setProfileStatus(false);
    });
  }, [auth]);
  return (
    <>
      <header
        style={{
          backgroundColor: 'white',
          boxShadow: '0 0 10px -7px black',
          position: 'sticky',
          zIndex: 100,
        }}
      >
        <Container>
          <div
            onClick={() => navigate('/')}
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
                  ? { borderBottom: '2px solid #EB7798', color: 'black' }
                  : {
                      borderBottom: '2px solid transparent',
                      transition: 'all 0.3s',
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
                  ? { borderBottom: '2px solid #EB7798', color: 'black' }
                  : {
                      borderBottom: '2px solid transparent',
                      transition: 'all 0.3s',
                    }
              }
              to="offers"
            >
              Offers
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderBottom: '2px solid #EB7798', color: 'black' }
                  : {
                      borderBottom: '2px solid transparent',
                      transition: 'all 0.3s',
                    }
              }
              to={profileStatus ? '/profile' : '/Sign-in'}
            >
              {profileStatus ? 'Profile' : 'Sign in'}
            </NavLink>
          </nav>
        </Container>
      </header>
      <main>
        <Outlet />
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
    width: 5rem;
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
    padding-block: 1.5rem;
  }
`;
