import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #226feb;
  margin-bottom: 40px;
  padding: 40px;
  position: relative;
  color: #ffff;
  border-radius: 8px;
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.3);
`;

const HeaderCard = styled.div`
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  color: #000;
  padding: 2px;
  border-radius: 5px;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    margin-left: 5px;
    border: none;
    padding: 5px 10px;
    background-color: white;
    font-size: 11px;
    border-radius: 5px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    @media (max-width: 600px) {
      font-size: 12px;
      padding: 3px;
    }
  }
`;

const Button2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;
  button {
    border: none;
    width: 50px;
    height: 20px;
    background-color: #6495ed;
    font-size: 15px;
    border-radius: 55px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    @media (max-width: 600px) {
      font-size: 12px;
      width: 30px;
      height: 12px;
    }
  }
`;

const TotalPartial = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;
`;

export { CardContainer, HeaderCard, ButtonContainer, Button2, TotalPartial };
