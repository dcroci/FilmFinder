/* eslint-disable react/prop-types */
import Movie from './Movie';

export default function List({ movies, onSelectId }) {
  return (
    <ul className="list list-movies">
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
