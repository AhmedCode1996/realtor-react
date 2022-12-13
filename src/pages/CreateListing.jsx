import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalFormData } from '../context';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import success from './../assets/success.gif';
import error from './../assets/error.gif';
import {
  NumberInput,
  RadioForm,
  TextareaForm,
  TextForm,
} from './../components/index';
const CreateListing = () => {
  const [logged, setLogged] = useState(false);
  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogged(true);
        console.log(logged);
        toast.error('Please login first', {
          icon: ({ theme, type }) => (
            <img src={error} alt="nagivatge to sign-in page" />
          ),
        });
        navigate('/sign-in');
      } else {
        setLogged(false);
        console.log(logged);
      }
    });
  }, [auth, logged, navigate]);
  const { formData, setFormData } = useGlobalFormData();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    toast.success('Congratulations, you submitted correctly', {
      icon: ({ theme, type }) => <img src={success} alt="success submit" />,
    });
    console.log(formData);
  };

  return (
    <section style={{ position: 'relative' }}>
      {logged && <Spinner />}
      <Container>
        <h2 className="listing-title">Create a Listing</h2>
        <form onSubmit={submitHandler} className="listing-form flow-content">
          <RadioForm
            title="Sell / Rent"
            formName="type"
            leftItem="sell"
            rightItem="rent"
            onChange={changeHandler}
          />
          <TextForm
            title="name"
            type="text"
            value={formData.name}
            onChange={changeHandler}
          />
          <div className="form-item">
            <NumberInput
              title="bed"
              value={formData.bed}
              onChange={changeHandler}
              name="bed"
              required
            />
            <NumberInput
              title="bath"
              value={formData.bath}
              onChange={changeHandler}
              name="bath"
              required
            />
          </div>
          <RadioForm
            title="Parking spot"
            formName="parking"
            leftItem="YES"
            rightItem="NO"
            onChange={changeHandler}
          />
          <RadioForm
            title="Furnished"
            formName="furnished"
            leftItem="YES"
            rightItem="NO"
            onChange={changeHandler}
          />
          <TextareaForm
            title="address"
            value={formData.address}
            onChange={changeHandler}
          />
          <TextareaForm
            title="description"
            value={formData.description}
            onChange={changeHandler}
          />
          <RadioForm
            title="Offer"
            formName="offer"
            leftItem="YES"
            rightItem="NO"
            onChange={changeHandler}
          />
          <NumberInput
            title="regular price"
            value={formData.regularPrice}
            onChange={changeHandler}
            name="regularPrice"
            required
          />
          <div className="form-item" style={{ flexDirection: 'column' }}>
            <span>Images</span>
            <p style={{ fontSize: '1rem', opacity: '.75' }}>
              The first image will be the cover (max 6).
            </p>
            <input
              type="file"
              name=""
              id=""
              accept=".jpg,.png,.jpeg"
              required
            />
          </div>
          <button type="submit">create listing</button>
        </form>
      </Container>
    </section>
  );
};

export default CreateListing;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  max-width: 1000px;
  padding: 1rem;
  margin-inline: auto;
  .listing-title {
    font-weight: 700;
    font-size: 1.875rem;
  }
  .form-item {
    display: flex;
    column-gap: 1rem;
    span {
      display: block;
      margin-bottom: 0.4rem;
      font-weight: 600;
      font-size: 1.875rem;
      text-transform: capitalize;
    }
    input {
      width: 100%;
      padding: 1.5rem;
      background-color: white;
      font-size: 1.5rem;
      text-transform: capitalize;
      transition: all 0.2s ease-in-out;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -6px black;
      &:hover {
        box-shadow: 0 6px 10px -9px black;
      }
      &:focus {
        box-shadow: 0 0px 8px -6px black;
      }
    }
  }
  button {
    width: 100%;
    padding: 1rem 2rem;
    background-color: #2563eb;
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }
`;
