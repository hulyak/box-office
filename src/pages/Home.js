import React, { useState, useCallback } from 'react';
import MainPageLayout from '../components/MainPageLayout.js';
import { apiGet } from '../apis/config';
import ShowGrid from '../components/show/ShowGrid.js';
import ActorGrid from '../components/actor/ActorGrid.js';
import { useLastQuery } from '../hooks/useLastQuery';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './styles/Home.styled.js';
import CustomRadio from '../components/CustomRadio.js';
// import { useWhyDidYouUpdate } from '../hooks/useWhyDidYouUpdate.js';

// conditionally render search result - optimize
const renderResults = results => {
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

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  // search for shows or people from the url
  const [searchOption, setSearchOption] = useState('shows');
  // only select one radio button
  const isShowsSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
      // console.log(result);
    });
  };

  const onInputChange = useCallback(ev => setInput(ev.target.value), [
    setInput,
  ]);

  const onRadioChange = useCallback(event => {
    // access shows or people
    setSearchOption(event.target.value);
  }, []);

  // console.log(searchOption);
  // make search when user presses enter key
  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  // useWhyDidYouUpdate('home', { onInputChange, onKeyDown });

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search for something"
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
