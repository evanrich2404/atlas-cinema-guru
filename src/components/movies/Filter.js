import React from 'react';
import './movies.css';
import SearchBar from '../general/SearchBar';
import SelectInput from '../general/SelectInput';
import Input from '../general/Input';
import Tag from './Tag';

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {
  const genreList = ["action", "drama", "comedy", "biography", "romance", "thriller", "war", "history", "sport", "sci-fi", "documentary", "crime", "fantasy"];

  return (
    <div className="filter">
      <SearchBar title={title} setTitle={setTitle} />
      <Input label="Min Year" type="number" value={minYear} setValue={setMinYear} />
      <Input label="Max Year" type="number" value={maxYear} setValue={setMaxYear} />
      <SelectInput label="Sort By" options={["latest", "oldest", "highestrated", "lowestrated"]} value={sort} setValue={setSort} />
      <ul>
        {genreList.map(genre => (
          <Tag key={genre} genre={genre} filter={true} genres={genres} setGenres={setGenres} />
        ))}
      </ul>
    </div>
  );
};

export default Filter;
