import styled from "styled-components";

export const ContainerHome = styled.div`
  width: 55%;

  @media (max-width: 600px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const MonthButton = styled.button`
  padding: 10px;
  border-radius: 20px;
  background-color: #226feb;
  font-size: 20px;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 41%;
  margin-top: 1%;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-left: 41%;
    margin-top: 2%;
  }
`;

export const CardContainer = styled.div`
  max-height: 480px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  @media (max-width: 600px) {
    max-height: 270px;
  }
`;

export const CardContent = styled.div`
  padding: 30px;
`;
