import { useState, useEffect } from 'react';

export function useMovies(query) {
  //LIST OF MOVIES THAT ARE A RESULT OF THE SEARCH
  const [movies, setMovies] = useState([]);
  //SHOWS WHILE API IS LOADING
  const [isLoading, setIsLoading] = useState(false);
  //SETS AN ERROR MESSAGE IF API DOES NOT FETCH INFO
  const [error, setError] = useState('');
  //MAKE API CALL AND UPDATE MOVIES ARRAY
  useEffect(() => {
    const controller = new AbortController();
    async function callAPI() {
      try {
        setIsLoading(true);
        if (query.length > 2) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=da90156c&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await res.json();
          if (
            data.Response === 'True' &&
            data.Search &&
            data.Search.length > 0
          ) {
            setMovies(data.Search);
            setError('');
          } else {
            setMovies([]);
            setError('Movie not found!');
          }
        } else {
          setMovies([]);
          setError('');
        }
      } catch (error) {
        if (error.name !== 'AbortError') setError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }

    callAPI();
    return () => {
      controller.abort();
    };
  }, [query]);
  return [movies, isLoading, error];
}
