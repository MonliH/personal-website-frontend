import styled, { DefaultTheme } from "styled-components";

export default styled.div`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.darkerBg};
  width: 100%;
  height: 100%;
  position: absolute;
`;
