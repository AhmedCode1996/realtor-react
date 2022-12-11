import styled from 'styled-components';
const TextareaForm = ({ title }) => {
  return (
    <Item>
      <span>{title}</span>
      <textarea name="" id="" rows="3" placeholder={title}></textarea>
    </Item>
  );
};

export default TextareaForm;

const Item = styled.article`
  span {
    font-weight: 600;
    font-size: 1.875rem;
    display: block;
    text-transform: capitalize;
    margin-bottom: 0.4rem;
  }
  textarea {
    width: 100%;
    padding: 1.2rem;
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
