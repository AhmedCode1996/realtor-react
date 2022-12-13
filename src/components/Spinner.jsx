import spinner from '../assets/loader.svg';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <div className="spinner-content">
        <img style={{ width: '20%' }} src={spinner} alt="spinner" />
        <h2>Navigating to the home page</h2>
      </div>
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #000000d1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  font-family: 'Signika Negative', sans-serif;
  .spinner-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10rem;
  }
  h2 {
    font-size: 5rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
    background: linear-gradient(to right, #cff5e7, #a0e4cb, #59c1bd, #0d4c92);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
`;
