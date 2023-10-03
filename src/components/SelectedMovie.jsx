import { useEffect, useState } from 'react';
// tt1375666
export default function SelectedMovie({ id }) {
  const [selectedMovie, setSelectedMovie] = useState({});
  useEffect(() => {
    async function getMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=da90156c&i=${id}`
      );
      const data = await res.json();
      console.log(data);
      setSelectedMovie(data);
    }
    getMovie();
  }, [id]);
  return (
    <div className="details">
      <p>{selectedMovie.Title}</p>
      <p>{selectedMovie.Actors}</p>
    </div>
  );
}
