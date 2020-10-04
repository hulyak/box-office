import React from 'react';
import { TitleWrapper } from './styles/Title.styled';

const Title = ({ title, subTitle }) => {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </TitleWrapper>
  );
};

export default Title;
