import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;

  h1 {
    margin: 0;
  }

  @media (max-width: 545px) {
    display: none;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <h1>Guess!</h1>
      </HeaderWrapper>
    );
  }
}

export default Header;
