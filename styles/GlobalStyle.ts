import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  scroll-behavior: smooth;
}

html, body, main, #__next {
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkBg};
  color: ${({ theme }) => theme.colors.fontColor};
}

html {
  overflow-x: hidden;
}

body {
  overflow: auto;
  overflow-x: hidden;
}

a {
  font-family: ${(props) => props.theme.fonts.sansSerif};
  font-weight: bold;
  color: #4c84ff;
  text-underline-offset: 0.35em;
  cursor: pointer;
  transition: text-decoration-color 0.2s, color 0.2s;
}

a:hover {
  color: #6092FF;
  text-decoration-color: #8BAFFF;
}

h1 {
  font: 600 26px ${(props) => props.theme.fonts.sansSerif};
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.fontColor};
}

h1::before {
  content: "+";
  color: #bdbdbd;
  font-size: 18px;
  margin-right: 8px;
  height: 28px;
  vertical-align: middle;
  display: inline-block;
}

h2 {
  font: 600 22px ${(props) => props.theme.fonts.sansSerif};
  color: ${({ theme }) => theme.colors.fontColor};
  margin-top: 15px;
  display: block;
}

h2::before {
  content: "-";
  color: #bdbdbd;
  font-size: 14px;
  margin-right: 8px;
}

.blog-content pre {
  font: 400 14px ${(props) => props.theme.fonts.monospace};
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: #ededed;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 20px;
  overflow: auto;
}

code {
  font: 500 15px ${({ theme }) => theme.fonts.monospace};
  background-color: #393939;
  padding: 2px 4px;
  border-radius: 3px;
}

strong {
  font: 600 13px ${(props) => props.theme.fonts.sansSerifBody};
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: inherit;
}
`;

export default GlobalStyle;
