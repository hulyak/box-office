import { useEffect, useReducer } from 'react';
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

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });
  // console.log(state);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);

  return state;
  // console.log(show);
}
