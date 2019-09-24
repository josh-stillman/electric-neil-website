import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { P } from '../SignupForm';

export const StyledLink = styled(Link)`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 20px;
`;

export const Wrapper = styled.div`
  background-color: lightgray;
  width: 100%;
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledP = styled(P)`
  color: black;
  max-width: 85%;
`;
