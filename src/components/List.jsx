/* eslint-disable react/prop-types */
import Movie from './Movie';

export default function List({ movies, onSelectId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectId={onSelectId}
          id={movie.imdbID}
        />
      ))}
    </ul>
  );
}
