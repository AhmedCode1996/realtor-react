import { useState } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';

const RadioForm = ({ title, inputType, formType, leftItem, rightItem }) => {
  const [leftID] = useState(uuid());
  const [rightID] = useState(uuid());
  return (
    <Item>
      <span>{title}</span>
      <p>
        <input type={inputType} name={formType} id={`leftItem-${leftID}`} />
        <label htmlFor={`leftItem-${leftID}`}>{leftItem}</label>
      </p>
      <p>
        <input type={inputType} name={formType} id={`rightItem-${rightID}`} />
        <label htmlFor={`rightItem-${rightID}`}>{rightItem}</label>
      </p>
    </Item>
  );
};

export default RadioForm;

const Item = styled.article`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  span {
    font-weight: 600;
    font-size: 1.875rem;
    grid-column: 1 / -1;
    display: block;
    margin-bottom: 0.4rem;
  }
  p {
    position: relative;
    input {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      visibility: hidden;
    }
    input:checked + label {
      background-color: #475569;
      box-shadow: 0 0px 8px -6px black;
      color: white;
    }
    label {
      background-color: white;
      text-align: center;
      padding: 1.5rem 3rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      font-size: 1.3rem;
      text-transform: uppercase;
      display: block;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 4px 6px -6px black;
      &:hover {
        box-shadow: 0 6px 10px -9px black;
      }
    }
  }
`;
