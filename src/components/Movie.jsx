/* eslint-disable react/prop-types */
export default function Movie({ movie, onSelectId, id }) {
  return (
    <li onClick={() => onSelectId(id)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
