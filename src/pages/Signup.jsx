import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import styled from 'styled-components';
import alert from './../assets/error.gif';
import success from './../assets/success.gif';
import sign from '../assets/sign3.svg';
import email from '../assets/email.svg';
import user from '../assets/user.svg';
import password from '../assets/password.svg';
import eye from '../assets/eye.svg';
import showPassword from '../assets/showPassword.svg';
import google from '../assets/google.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const Signup = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const googleClickHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      !docSnap.exists() &&
        (await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        }));

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCrediential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      updateProfile(auth.currentUser, {
        displayName: formData.username,
      });
      const { user } = userCrediential;
      const sequredFormData = { ...formData };
      delete sequredFormData.password;
      sequredFormData.timeStamp = serverTimestamp();
      setDoc(doc(db, 'users', user.uid), sequredFormData);
      setTimeout(() => {
        toast.success('successful registration', {
          icon: ({ theme, type }) => <img src={success} alt="success" />,
        });
        navigate('/');
      }, 1000);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        icon: ({ theme, type }) => <img src={alert} alt="error" />,
      });
    }
  };
  return (
    <section>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBlock: '2rem',
        }}
      >
        Sign Up
      </h2>
      <Container>
        <div className="sign-in-image">
          <img src={sign} alt="form logo" />
        </div>
        <div className="sign-in-form">
          <form className="flow-content" onSubmit={submitHandler}>
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
            <p>
              <img className="input-icon" src={password} alt="email logo" />
              <input
                type={passwordHidden ? 'password' : 'text'}
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
                have an account? <Link to="/sign-in">Sign In</Link>{' '}
              </p>
              <p>
                {' '}
                <Link to="/forgot-password">Forgot Password?</Link>{' '}
              </p>
            </div>
            <button className="form-submit" type="submit">
              SIGN UP
            </button>
            <div className="form-line">
              <span>OR</span>
            </div>
            <button
              onClick={googleClickHandler}
              type="button"
              className="google-button"
            >
              <img src={google} alt="google button" />
              Continue with Google
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 6rem;
  max-width: 1000px;
  margin-inline: auto;
  padding-inline: 1rem;
  & > div {
    flex-basis: 50%;
    padding: 1rem;
  }
  .sign-in-image {
    flex-basis: 55%;
    transform: translateY(-5rem) scale(1.2);
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
