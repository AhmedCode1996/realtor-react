import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { db } from './../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useNavigate } from 'react-router';
import { useGlobalFormData } from '../context';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import success from './../assets/success.gif';
import error from './../assets/error.gif';
import alert from './../assets/alert.gif';
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
        toast.error('Please login first', {
          icon: ({ theme, type }) => (
            <img src={error} alt="nagivatge to sign-in page" />
          ),
        });
        navigate('/sign-in');
      } else {
        setLogged(false);
      }
    });
  }, [auth, logged, navigate]);
  const { formData, setFormData } = useGlobalFormData();
  const {
    name,
    bed,
    bath,
    address,
    latitude,
    longitude,
    description,
    regularPrice,
    images,
  } = formData;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // check for files input
    if (e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        images: e.target.files,
      }));
    }

    // check for non files input
    if (!e.target.files) {
      setFormData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (images.length > 6) {
      toast.error('maiximum 6 images', {
        icon: ({ theme, type }) => <img src={alert} alt="images error" />,
      });
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuid()}`;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                console.log('something went wrong');
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      toast.error('error on uploading images', {
        icon: ({ theme, type }) => <img src={alert} alt="error" />,
      });
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls,
      timeStamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);

    console.log(formDataCopy);

    toast.success('Congratulations, you created listing correctly', {
      icon: ({ theme, type }) => <img src={success} alt="success submit" />,
    });

    navigate(`/category/${formData.type}/${docRef.id}`);
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
            value={name}
            onChange={changeHandler}
          />
          <div className="form-item">
            <NumberInput
              title="bed"
              value={bed}
              onChange={changeHandler}
              name="bed"
              required
            />
            <NumberInput
              title="bath"
              value={bath}
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
            value={address}
            onChange={changeHandler}
          />
          <div className="location form-item">
            <p className="latitude">
              <span>Latitude</span>
              <input
                type="number"
                value={latitude}
                name="latitude"
                id="latitude"
                onChange={changeHandler}
                required
              />
            </p>
            <p className="longitude">
              <span>Longitude</span>
              <input
                type="number"
                value={longitude}
                name="longitude"
                id="longitude"
                onChange={changeHandler}
                required
              />
            </p>
          </div>
          <TextareaForm
            title="description"
            value={description}
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
            value={regularPrice}
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
              onChange={changeHandler}
              name="images"
              id="images"
              accept=".jpg,.png,.jpeg"
              multiple
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
