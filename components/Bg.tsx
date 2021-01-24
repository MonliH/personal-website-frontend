import styled, { DefaultTheme } from "styled-components";

export default styled.div`
  background-color: ${({
    altColor,
    theme,
  }: {
    altColor?: boolean;
    theme: DefaultTheme;
  }) => (altColor ? theme.colors.lightBg : theme.colors.darkBg)};
  min-height: 100%;
  height: fit-content;
  width: 100%;
  position: absolute;
`;
