import React, { useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout.js';
import { apiGet } from '../apis/config';
import ShowGrid from '../components/show/ShowGrid.js';
import ActorGrid from '../components/actor/ActorGrid.js';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  // search for shows or people from the url
  const [searchOption, setSearchOption] = useState('shows');
  // only select one radio button
  const isShowsSearch = searchOption === 'shows';

  useEffect(() => {
    console.log('use effect run');
  }, []);

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
      // console.log(result);
    });
  };

  // conditionally render search result
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    // fetch multiple endpoints (shows / people)
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioChange = event => {
    // access shows or people
    setSearchOption(event.target.value);
  };

  console.log(searchOption);
  // make search when user presses enter key
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        value={input}
        onChange={ev => setInput(ev.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search for something"
      />
      <div>
        <label htmlFor="show-search">
          Shows
          <input
            type="radio"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            type="radio"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
