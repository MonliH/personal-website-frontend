import styled from "styled-components";

export const WrapperCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NameTitleWrapper = styled.div`
  position: relative;
  padding-top: 200px;
  margin-left: 15vw;
  z-index: 0;

  @media (max-width: 430px) {
    padding-top: 100px;
  }
`;
