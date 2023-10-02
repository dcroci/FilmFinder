/* eslint-disable react/prop-types */
export default function Search({ query, onQueryChange }) {
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
