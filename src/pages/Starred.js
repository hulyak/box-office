import React, { useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { useShows } from '../hooks/usePersistedReducer';
import { apiGet } from '../apis/config';
import ShowGrid from '../components/show/ShowGrid';
import { StarredStyle } from './styles/Starred.styled';

// get starred shows from localStorage hook
const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        // console.log(results);
        .then(results => {
          console.log(results);
          setShows(results);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <StarredStyle>Shows are still loading</StarredStyle>}
      {error && <StarredStyle>Error occured: {error}</StarredStyle>}
      {!isLoading && !shows && <StarredStyle>No shows were added</StarredStyle>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
