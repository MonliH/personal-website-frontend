import styled from "styled-components";

export const Input = styled.input`
  display: block;
  margin-bottom: 20px;
  height: 45px;
  padding: 10px;

  background-color: #2b2b2b;
  border: 1px solid #7f7f7f;
  border-radius: 3px;
  color: white;
`;

export const Label = styled.label`
  font: 400 15px ${({ theme }) => theme.fonts.sansSerif};
`;

export const Button = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: #2b2b2b;
  border: 1px solid #7f7f7f;
  border-radius: 3px;

  color: white;
  display: ${({ block }: any) => (block ? "block" : "inline")};

  margin-bottom: 10px;
  margin-right: 10px;

  cursor: pointer;
  transition: 0.3s background-color;

  &:hover {
    background-color: #0a0a0a;
  }
`;

export const RedButton = styled(Button)`
  color: #ff3c3c;
  background-color: #490000;
  border-color: #490000;

  &:hover {
    background-color: #380000;
  }
`;

export const InputWrapper = styled.div`
  height: 100px;
  margin-right: 10px;
`;
