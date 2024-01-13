import styled from "styled-components";

export const HeaderDiv = styled.div`
  background-color: #226feb;
  width: 100%;
  height: 52px;
`;

export const Nav = styled.nav`
  display: flex;
  list-style-type: none;
  gap: 20px;
`;

export const Container = styled.div`
  margin: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: white;
  @media (max-width: 600px) {
    span {
      font-size: 10px;
    }
  }
`;
export const Button = styled.button`
  border: none;
  color: black;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  padding: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 6px;
    padding: 3px;
  }
`;
export const ButtonLink = styled.button`
  border: none;
  color: black;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  padding: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  a {
    text-decoration: none;
    color: inherit;
  }
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 3px;
  }
`;
