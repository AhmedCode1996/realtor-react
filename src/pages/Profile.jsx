import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import email from '../assets/email.svg';
import user from '../assets/user.svg';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      } else {
        setFormData({ username: user.displayName, email: user.email });
      }
    });
  }, []);

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const logoutHandler = () => {
    auth.signOut();
    navigate('/');
  };
  const editHandler = () => {};

  return (
    <section className="profile">
      <Container>
        <h2 className="title">Profile</h2>
        <form className="flow-content">
          <p>
            <img className="input-icon" src={user} alt="user logo" />
            <input
              type="username"
              name="username"
              id="username"
              placeholder="Full name"
              value={formData.username}
              onChange={formHandler}
            />
          </p>
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
          <div className="profile-options">
            <p className="edit">
              Do want to change your name?{' '}
              <span onClick={editHandler}>Edit</span>{' '}
            </p>
            <p className="logout" onClick={logoutHandler}>
              Sign Out
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
};
const Container = styled.div`
  max-width: 1000px;
  margin-inline: auto;
  padding-inline: 1rem;
  padding-block: 2rem;
  .title {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .flow-content > * + * {
    margin-top: 2rem;
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
  .profile-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    .edit span {
      color: #b92345;
      cursor: pointer;
    }
    .logout {
      color: #1d4ed8;
      cursor: pointer;
    }
  }
`;
export default Profile;
