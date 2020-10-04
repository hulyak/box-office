import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../apis/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { isLoading: false, error: null, show: action.show };
    case 'FETCH_FAILED':
      return { ...prevState, isLoading: false, error: action.error };
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

// useParams to get the id param for shows
const Show = () => {
  const { id } = useParams();

  const [{ error, isLoading, show }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(state);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCh_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // console.log(show);

  // if (isLoading) return <div>Loading</div>;
  // if (error) return <div>Error occured: {error} </div>;

  return <div>show page</div>;
};

export default Show;
