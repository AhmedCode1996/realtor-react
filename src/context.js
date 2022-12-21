import { createContext, useState, useContext } from 'react';

const ListingFormData = createContext();

const ListingContext = ({ children }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    bed: 0 * 1,
    bath: 0 * 1,
    parking: false,
    furnished: false,
    address: '',
    latitude: 0 * 1,
    longitude: 0 * 1,
    description: '',
    offer: false,
    regularPrice: 0 * 1,
    images: {},
  });
  return (
    <ListingFormData.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </ListingFormData.Provider>
  );
};

// Custom Hook
export const useGlobalFormData = () => {
  return useContext(ListingFormData);
};

export { ListingContext, ListingFormData };
