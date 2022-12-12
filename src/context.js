import { createContext, useState, useContext } from 'react';

const ListingFormData = createContext();

const ListingContext = ({ children }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    bed: 0,
    bath: 0,
    parking: false,
    furnished: false,
    address: '',
    description: '',
    offer: false,
    regularPrice: 0,
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
