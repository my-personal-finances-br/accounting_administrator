import styled from "styled-components";

export const CustomButton = styled.button`
  color:${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.GREEN_MID};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.GREEN_MID};
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0, 0, 0.58, 1);
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.GREEN_MID};
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const TextButton = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD};
`