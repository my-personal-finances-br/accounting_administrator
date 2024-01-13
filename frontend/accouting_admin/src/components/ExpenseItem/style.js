// StyledItem.js
import styled from "styled-components";

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 10px;
  margin: 0px 20px;
  border-bottom: 2px dotted black;
`;

export const RedText = styled.span`
  color: red;
  font-weight: bold;
`;

export const GreenText = styled.span`
  color: rgb(48, 187, 48);
  font-weight: bold;
`;

export const OrangeText = styled.span`
  color: orange;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 30px;
`;

export const Button = styled.button`
  margin-left: 5px;
  border: none;
  width: 90px;
  height: 20px;
  background-color: white;
  font-size: 15px;
  border-radius: 55px;
  color: black;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 3px;
    width: 45px;
    height: 18px;
    margin-left: 2px;
  }
`;
