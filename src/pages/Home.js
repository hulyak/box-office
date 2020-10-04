import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout.js';
import { apiGet } from '../apis/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResults(result);
      // console.log(result);
    });
  };

  // conditionally render search result
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };
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
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
