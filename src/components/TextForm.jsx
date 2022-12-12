import styled from 'styled-components';
const TextForm = ({ title, type, value, onChange }) => {
  return (
    <Item>
      <span>{title}</span>
      <input type={type} name={title} onChange={onChange} value={value} id="" placeholder={title} required />
    </Item>
  );
};

export default TextForm;

const Item = styled.article`
  span {
    font-weight: 600;
    font-size: 1.875rem;
    display: block;
    text-transform: capitalize;
    margin-bottom: 0.4rem;

  }
  input {
    width: 100%;
    padding: 1.5rem;
    font-size: 1.5rem;
    text-transform: capitalize;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 6px -6px black;
    &:hover {
      box-shadow: 0 6px 10px -9px black;
    }
    &:focus {
      box-shadow: 0 0px 8px -6px black;
    }
  }
`;
