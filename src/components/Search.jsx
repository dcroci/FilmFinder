import { useEffect } from 'react';

/* eslint-disable react/prop-types */
export default function Search({ query, onQueryChange }) {
  useEffect(() => {
    const el = document.querySelector('.search');
    console.log(el);
    el.focus();
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onQueryChange}
    />
  );
}
