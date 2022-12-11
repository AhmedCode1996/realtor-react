import styled from 'styled-components';
import RadioForm from '../components/RadioForm';
import TextareaForm from '../components/TextareaForm';
import TextForm from '../components/TextForm';
const createListing = () => {
  return (
    <section className="listing">
      <Container>
        <h2 className="listing-title">Create a Listing</h2>
        <form className="listing-form flow-content">
          <RadioForm
            title="Sell / Rent"
            inputType="radio"
            formType="type"
            leftItem="sell"
            rightItem="rent"
          />
          <TextForm title="name" type="text" />
          <div className="form-item">
            <p>
              <span>Beds</span>
              <input type="number" name="" id="" />
            </p>
            <p>
              <span>Baths</span>
              <input type="number" name="" id="" />
            </p>
          </div>
          <RadioForm
            title="Parking spot"
            inputType="radio"
            formType="parking"
            leftItem="YES"
            rightItem="NO"
          />
          <RadioForm
            title="Furnished"
            inputType="radio"
            formType="furnished"
            leftItem="YES"
            rightItem="NO"
          />
          <TextareaForm title="address" />
          <TextareaForm title="description" />
          <RadioForm
            title="Offer"
            inputType="radio"
            formType="offer"
            leftItem="YES"
            rightItem="NO"
          />
          <div className="form-item" style={{ flexDirection: 'column' }}>
            <span>Regular Price</span>
            <input style={{ width: '40%' }} type="number" />
          </div>
          <div className="form-item" style={{ flexDirection: 'column' }}>
            <span>Images</span>
            <p style={{ fontSize: '1rem', opacity: '.75' }}>
              The first image will be the cover (max 6).
            </p>
            <input type="file" name="" id="" accept=".jpg,.png,.jpeg" />
          </div>
          <button type="submit">create listing</button>
        </form>
      </Container>
    </section>
  );
};

export default createListing;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  max-width: 1000px;
  margin-inline: auto;
  padding: 1rem;
  .listing-title {
    font-weight: 700;
    font-size: 1.875rem;
  }
  .form-item {
    display: flex;
    column-gap: 1rem;
    span {
      margin-bottom: 0.4rem;
      font-weight: 600;
      font-size: 1.875rem;
      display: block;
      text-transform: capitalize;
    }
    input {
      background-color: white;
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
  }
  button {
    background-color: #2563eb;
    padding: 1rem 2rem;
    color: white;
    border-radius: 0.5rem;
    width: 100%;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 500;
  }
`;
