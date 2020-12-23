import styled from "styled-components";

export const shared_title = `
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  background: -moz-linear-gradient(
      180deg,
      rgba(56, 56, 56, 1) 0%,
      rgba(56, 56, 56, 1) 100%
    )
    no-repeat;
  background: -webkit-linear-gradient(
      180deg,
      rgba(56, 56, 56, 1) 0%,
      rgba(56, 56, 56, 1) 100%
    )
    no-repeat;
  background: linear-gradient(
      180deg,
      rgba(56, 56, 56, 1) 0%,
      rgba(56, 56, 56, 1) 100%
    )
    no-repeat;
  color: #ff3d0d;

  @media (max-width: 430px) {
    font-size: 40px;
    background-position: left 10px top 25px;
    height: 50px;
  }
`;

export const Title = styled.pre`
  ${shared_title}
  height: 75px;
  font: bold 60px Montserrat, sans-serif;
  background-position: left 19px top 40px;
  margin-left: -9px;
  margin-bottom: 50px;
`;
