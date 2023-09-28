import Navbar from './components/Navbar';
import Main from './components/Main';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Box from './components/Box';
import { useState } from 'react';
import List from './components/List';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';

export default function App() {
  const tempMovieData = [
    {
      imdbID: 'tt1375666',
      Title: 'Inception',
      Year: '2010',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
      imdbID: 'tt0133093',
      Title: 'The Matrix',
      Year: '1999',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
      imdbID: 'tt6751668',
      Title: 'Parasite',
      Year: '2019',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
  ];
  const tempWatchedData = [
    {
      imdbID: 'tt1375666',
      Title: 'Inception',
      Year: '2010',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: 'tt0088763',
      Title: 'Back to the Future',
      Year: '1985',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];
  const [watched, setWatched] = useState(tempWatchedData);

  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        {/* passed with children props */}
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* passed with children props */}
          <List movies={movies} />
        </Box>
        <Box>
          {/* passed with children props */}
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
