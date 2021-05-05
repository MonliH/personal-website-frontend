import styled from "styled-components";

export const WrapperCenterColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const WrapperHorizontalCenterRow = styled(Row)`
  align-items: center;
`;

export const WrapperCenterRow = styled(Row)`
  height: 100%;
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

interface MarginProps {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export const Margin = styled.div<MarginProps & JSX.IntrinsicElements["div"]>`
  ${(props) => (props.left ? `margin-left: ${props.left}px;` : "")}
  ${(props) => (props.right ? `margin-right: ${props.right}px;` : "")}
  ${(props) => (props.top ? `margin-top: ${props.top}px;` : "")}
  ${(props) => (props.bottom ? `margin-bottom: ${props.bottom}px;` : "")}
`;
