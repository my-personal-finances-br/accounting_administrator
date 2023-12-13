import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  max-width: 428px;
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: #6495ed;
  border-radius: 10px;
  padding: 39px;
  color: white;

  position: relative;

  overflow-y: auto;
  max-height: 400px;
`;

export const CloseButton = styled.button`
  position: absolute;
  margin: 10px;
  right: 10px;
  top: 10px;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #4b4b4d;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  ${(props) => (props.isOpen ? `display: flex;` : `display: none;`)}

  align-items: center;
  justify-content: center;
  color: black;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  margin-left: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 960px) {
    width: 100%;
  }
`;
