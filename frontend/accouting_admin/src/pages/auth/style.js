import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.GREEN_DARK};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 1024px;
  height: 600px;
  border-radius: 32px;
  padding: 0px 32px;
  @media (max-width: 768px) {
    height: fit-content;
    padding: 0px 16px;
    width: 60%;
  }
`;

export const FormContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-bottom-right-radius: 32px;
  border-top-right-radius: 32px;
  min-width: 300px;
  @media (max-width: 768px) {
    border-radius: 16px;
    width: 100%;
    padding: 32px 0px;
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 74%;
  gap: 10px;
  @media (max-width: 768px) {
    max-width: 340px;
    width: 100%;
    padding: 0px 16px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 24px;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-weight: 400;
`;

export const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-weight: 400;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const Bolder = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const ImageContainer = styled.div`
  border-bottom-left-radius: 32px;
  border-top-left-radius: 32px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GREEN_MID};
  padding-left: 32px;
  padding-right: 32px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Image = styled.img.attrs(() => ({
  src: require("../../assets/money_person.png"),
}))`
  width: 100%;
`;
