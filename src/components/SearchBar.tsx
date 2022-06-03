import React, { useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
  const { searchPlaceByTerm } = useContext(PlacesContext);

  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    //es una funcion que se ejecuta despues de un tiempo
    debounceRef.current = setTimeout(() => {
      searchPlaceByTerm(value);
    }, 450);
  };
  return (
    <div className="shearch-container">
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        onChange={handleChange}
      />
      <SearchResults />
    </div>
  );
};
