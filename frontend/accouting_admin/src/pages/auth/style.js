import styled from "styled-components";

export const AuthWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #112643;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: #ffff;
  width: 30em;
  height: 30em;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const WrapperInput = styled.div`
  margin-top: 5em;

  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 20px;
`;

export const Button = styled.button`
  color: #2ec1d8;
  border: 1px solid #2ec1d8;
  width: 20em;
  border-radius: 4px;
  background-color: transparent;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0, 0, 0.58, 1);
  &:hover {
    background-color: #2ec1d8;
    color: #ffff;
  }
  &:active {
    transform: scale(0.9);
  }
`;
