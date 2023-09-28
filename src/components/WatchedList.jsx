/* eslint-disable react/prop-types */
import WatchedMovie from './WatchedMovie';
export default function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
