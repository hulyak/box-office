import React from 'react';
import Nav from './Nav';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Box Office"
        subTitle="Are you looking for a movie or an actor?"
      />
      <Nav />
      {children}
    </div>
  );
};

export default MainPageLayout;
