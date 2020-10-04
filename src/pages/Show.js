import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { apiGet } from '../apis/config';

// useParams to get the id param for shows
const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  // console.log(params);
  // api.tvmaze.com/shows/1?embed[]=seasons&embed[]=cast

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      setShow(results);
    });
  }, [id]);

  console.log(show);
  return <div>show page</div>
};

export default Show;
