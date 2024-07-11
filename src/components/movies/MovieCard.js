import React, { useState, useEffect } from 'react';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    console.log('Movie data:', movie); // Log movie data to debug
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const favoriteResponse = await axios.get('/api/titles/favorite', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const watchLaterResponse = await axios.get('/api/titles/watchlater', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setIsFavorite(favoriteResponse.data.some(fav => fav.imdbId === movie.imdbId));
        setIsWatchLater(watchLaterResponse.data.some(watch => watch.imdbId === movie.imdbId));
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, [movie, movie.imdbId]);

  const handleClick = async (type) => {
    try {
      const token = localStorage.getItem('accessToken');
      const url = `/api/titles/${type}/${movie.imdbId}`;
      if (type === "favorite") {
        if (isFavorite) {
          await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsFavorite(false);
        } else {
          await axios.post(url, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsFavorite(true);
        }
      } else if (type === "watchlater") {
        if (isWatchLater) {
          await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsWatchLater(false);
        } else {
          await axios.post(url, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsWatchLater(true);
        }
      }
    } catch (error) {
      console.error(`Error updating ${type} status:`, error);
    }
  };

  return (
    <li className="movie-card">
      <div>
        <FontAwesomeIcon
          icon={faHeart}
          className={`icon ${isFavorite ? 'active' : ''}`}
          onClick={() => handleClick("favorite")}
        />
        <FontAwesomeIcon
          icon={faClock}
          className={`icon ${isWatchLater ? 'active' : ''}`}
          onClick={() => handleClick("watchlater")}
        />
      </div>
      <div className="title">{movie.title}</div>
      <div className="synopsis">{movie.synopsis}</div>
      <div className="genres">{movie.genres.join(", ")}</div>
    </li>
  );
};

export default MovieCard;
