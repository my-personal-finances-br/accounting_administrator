import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  ${(props) => (props.isOpen ? `display: flex;` : `display: none;`)}

  align-items: center;
  justify-content: center;

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

export const Content = styled.div`
  width: 100%;
  max-width: 428px;
  height: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 39px;

  position: relative;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  width: 100%;
  text-align: start;
  font-weight: 700;
`;

export const WrapperTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .border-image {
    width: 76px;
    height: 76px;
    background-color: #ebebeb;
    border: 2px solid #009291;
    border-radius: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border-image img {
    width: 100%;
    height: 100%;
    margin-bottom: -3px;
  }
`;

export const BubbleDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #009291;
  margin-left: 1.5em;
  border-radius: 4px;
  width: ${(props) => props.widthBubble};
  height: ${(props) => props.heightBubble};
  position: relative;

  ::before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;

    border-left: 4.5px solid transparent;
    border-right: 4.5px solid #009291;
    border-top: 4.5px solid #009291;
    border-bottom: 4.5px solid transparent;
    border-radius: 1px;
    left: -4px;
    top: 13px;
    transform: rotate(-135deg);
  }

  span {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
  }
`;

export const WrapperMessage = styled.div`
  width: 100%;

  font-size: ${(props) => props.fontMessage};
  font-weight: 400;
  color: #606062;
  line-height: ${(props) => props.lineHeigthMessage};
  text-align: ${(props) => props.positionMessage};

  padding: 22px 0;
`;

export const ContainerButton = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GreenButton = styled.button`
  width: 100%;
  padding: 11px;
  max-width: ${(props) => props.widthButton};

  border-radius: 4px;

  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  background-color: #009291;
  margin-top: ${(props) => props.marginTopButton || '36px'};
  cursor: pointer;

  border: none;
`;

export const GreenButtonFeedback = styled(GreenButton)`
  margin-top: ${(props) => (props.Error ? '36px' : '30px')};
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

export const AreaMessage = styled.div`
  width: 100%;
  max-width: 321px;
  padding: 14px;

  border: 1px solid #c4c4c4;
  border-radius: 4px;

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: start;

  margin-bottom: 23px;
`;

export const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 14px;

  p {
    margin: unset;
    padding-left: 10px;
  }
`;

export const ButtonGray = styled.button`
  width: 100%;
  max-width: 98px;
  padding: 11px;
  border: none;
  cursor: pointer;
  background-color: #e1e1e1;
  margin-top: ${(props) => props.marginTopButton || '36px'};
  margin-right: 38px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #777777;
`;

export const Divider = styled.div`
  width: 450px;
  margin-left: 6px;
  height: 1px;
  background-color: #eef2f4;
`;

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: #f00;
  text-align: start;
  margin-top: 4px;
  font-weight: 400;
`;

export const ContainerDashed = styled.div`
  width: 100%;
  max-width: 620px;
  height: ${(props) => props.height || '108px'};

  border: 1px dashed #bdbdbd;
  border-radius: 4px;
  padding-top: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 40px auto;

  p {
    font-size: 20px;
    font-weight: 400;
    text-align: center;

    margin-bottom: 17px;
  }
`;
