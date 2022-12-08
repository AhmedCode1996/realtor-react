import spinner from '../assets/loader.svg';
import styled from 'styled-components';

const Spinner = () => {
  return <SpinnerContainer>
    <div className="spinnerImg">
        <img src={spinner} alt="spinner" />
    </div>
  </SpinnerContainer>;
};

export default Spinner;

const SpinnerContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #00000057;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;
