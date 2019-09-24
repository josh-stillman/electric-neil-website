import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SpinDiv = styled.div`
  animation: ${rotation} 2s linear infinite;
  font-size: 40px;
`;
