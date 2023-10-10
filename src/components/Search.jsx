import { useEffect } from 'react';

import { useRef } from 'react';

/* eslint-disable react/prop-types */
export default function Search({ query, setQuery, onQueryChange }) {
  const inputElement = useRef(null);
  useEffect(() => {
    function focusInput(e) {
      if (document.activeElement !== inputElement.current) {
        if (e.key === 'Enter') {
          inputElement.current.focus();
          console.log(inputElement.current);
          setQuery('');
        }
      }
    }
    document.addEventListener('keydown', focusInput);
    return () => {
      document.removeEventListener('keydown', focusInput);
    };
  }, [setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onQueryChange}
      ref={inputElement}
    />
  );
}
