import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { apiGet } from '../apis/config';

// useParams to get the id param for shows
const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(params);
  // api.tvmaze.com/shows/1?embed[]=seasons&embed[]=cast

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // console.log(show);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error occured: {error} </div>;

  return <div>show page</div>;
};

export default Show;
