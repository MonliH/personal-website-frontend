import styled from "styled-components";

import Bg from "@components/Bg";

const NoMatchStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  font: 600 100px ${(props) => props.theme.fonts.sansSerif};
`;

const NoMatchText = styled.div`
  color: #8d8d8d;
  font: 400 20px ${(props) => props.theme.fonts.sansSerif};
`;

interface NoMatchProps {
  msg?: string;
  code?: number;
}

const NoMatch = ({ code, msg }: NoMatchProps) => {
  return (
    <Bg>
      <NoMatchStyled>
        {code || "404"}
        <NoMatchText>{msg || "this page could not be found"}</NoMatchText>
      </NoMatchStyled>
    </Bg>
  );
};

export default NoMatch;
