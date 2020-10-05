import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../hooks/useShow';
import { InfoBlock, ShowPageWrapper } from './styles/Show.styled';

// useParams to get the id param for shows
const Show = () => {
  const { id } = useParams();

  const { show, isLoading, error } = useShow(id);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error occured: {error} </div>;

  // http://api.tvmaze.com/shows/1?embed[]=seasons&embed[]=cast
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} cast={show._embedded.cast} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
