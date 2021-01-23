import styled from "styled-components";

export const ThemedTitle = styled.div`
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

  font: bold 60px ${({ theme }) => theme.fonts.sansSerifAlt};
  background-position: left 19px top 40px;

  @media (max-width: 430px) {
    font-size: 40px !important;
    height: 50px !important;
    background-position: left 10px top 25px;
  }
`;

export const Title = styled(ThemedTitle).attrs({ as: "pre" })`
  height: 75px;
  margin-left: -9px;
  margin-bottom: 50px;
`;
