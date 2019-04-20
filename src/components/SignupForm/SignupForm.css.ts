import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  font-size: 22px;
  padding: 8px;
`;

export const P = styled.div`
  font-size: 18px;
  padding: 8px;
`;

export const ErrorMessage = styled(P)`
  color: red;
`;

export const StyledButton = styled.button`
  padding: 12px;
  background-color: #b29e4a;
  font-size: 18px;
  font-family: monospace;
  font-weight: 700;
  border: none;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:disabled {
    background-color: grey;
    cursor: default;
  }

  &:hover:enabled {
    background-color: #2EE59D;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

export const StyledInput = styled.input`
  padding: 6px;
  margin: 14px 0 24px 0;
  font-size: 18px;
  font-family: monospace;
  font-weight: 700;
`;

export const MessageContainer = styled.div`
  min-height: 23px;
  max-height: 23px;
  margin-bottom: 22px;
`;
