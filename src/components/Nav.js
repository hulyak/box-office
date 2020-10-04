import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './styles/Nav.styled';

// enum link items
const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Nav = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            {/* if the link is active, give active class */}
            <LinkStyled
              to={item.to}
              className={item.to === location.pathname ? 'active' : ''}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Nav;
