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
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkerBg};
  color: ${({ theme }) => theme.colors.fontColor};
  font: 15px ${(props) => props.theme.fonts.sansSerif};
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
  color: #3373FF;
  text-underline-offset: 0.35em;
  cursor: pointer;
  transition: text-decoration-color 0.2s, color 0.2s;
}

a:hover {
  color: #558AFF;
  text-decoration-color: #558AFF;
}

.blog-content h1 {
  font: 600 26px ${(props) => props.theme.fonts.sansSerif};
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.fontColor};
}

.blog-content h1::before {
  content: "+";
  color: #bdbdbd;
  font-size: 18px;
  margin-right: 8px;
  height: 28px;
  vertical-align: middle;
  display: inline-block;
}

.blog-content h2 {
  font: 600 22px ${(props) => props.theme.fonts.sansSerif};
  color: ${({ theme }) => theme.colors.fontColor};
  margin-top: 15px;
  display: block;
}

.blog-content h2::before {
  content: "-";
  color: #bdbdbd;
  font-size: 14px;
  margin-right: 8px;
}

.blog-content pre {
  font: 400 14px ${(props) => props.theme.fonts.monospace};
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: #A7A7A7;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 20px;
  overflow: auto;
  border: 1px solid #202020;
}

code {
  font: 500 15px ${({ theme }) => theme.fonts.monospace};
  background-color: #353535;
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
