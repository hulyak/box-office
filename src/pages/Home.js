import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout.js';

const Home = () => {
  const [input, setInput] = useState('');

  const onSearch = () => {
    fetch(`http://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(data => console.log(data));
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
    </MainPageLayout>
  );
};

export default Home;
