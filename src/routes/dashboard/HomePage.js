import React, { useState, useEffect, useCallback } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import axios from 'axios';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = useCallback(async (page) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          minYear,
          maxYear,
          genres: genres.join(","),
          title,
          sort,
          page
        }
      });
      console.log('API response:', response.data);
      if (response.data && Array.isArray(response.data.titles)) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.titles]);
      } else {
        console.error('API response does not contain an array of titles:', response.data);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }, [minYear, maxYear, genres, sort, title]);

  useEffect(() => {
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title, loadMovies]);

  return (
    <div className="homepage">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />
      <ul>
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.imdbId}-${index}`} movie={movie} />
        ))}
      </ul>
      <Button label="Load More.." onClick={() => {
        setPage(page + 1);
        loadMovies(page + 1);
      }} />
    </div>
  );
};

export default HomePage;
