/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
// tt1375666
export default function SelectedMovie({
  id,
  onResetSelectedId,
  onAddWatched,
  rating,
  setRating,
  watched,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;
  useEffect(() => {
    setIsLoading(true);
    async function getMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=da90156c&i=${id}`
      );
      const data = await res.json();

      setSelectedMovie(data);
      setIsLoading(false);
    }
    getMovie();
  }, [id]);
  useEffect(() => {
    if (title) {
      document.title = `MOVIE: ${title}`;
    }
    return () => {
      document.title = 'FilmFinder';
    };
  }, [title]);
  useEffect(() => {
    function escapeMovie(e) {
      if (e.code === 'Escape') {
        onResetSelectedId();
        console.log('Closing');
      }
    }
    document.addEventListener('keydown', escapeMovie);
    return () => {
      document.removeEventListener('keydown', escapeMovie);
    };
  }, [onResetSelectedId]);

  const isWatched =
    watched && watched.map((movie) => movie.imdbID.imdbID).includes(id);
  const watchedUserRating = watched
    ? watched.find((movie) => movie.imdbID.imdbID === id)?.userRating
    : null;
  function handleAdd() {
    let newWatchedMovie = {
      imdbID: selectedMovie,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating: rating,
    };
    document.title = `MOVIE: ${selectedMovie.Title}`;
    onAddWatched(newWatchedMovie);
    onResetSelectedId();
    setRating(0);
  }
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onResetSelectedId}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    rating={rating}
                    setRating={setRating}
                  />
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                </>
              ) : (
                <p style={{ textAlign: 'center' }}>
                  You already rated this movie a {watchedUserRating} ⭐
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
