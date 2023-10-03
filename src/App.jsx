import Navbar from './components/Navbar';
import Main from './components/Main';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Box from './components/Box';
import { useEffect, useState } from 'react';
import List from './components/List';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  function onQueryChange(e) {
    setQuery(e.target.value);
  }
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=da90156c&s=${query}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  }, [query]);
  return (
    <>
      <Navbar>
        {/* passed with children props */}
        <Logo />
        <Search onQueryChange={onQueryChange} query={query} />
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
