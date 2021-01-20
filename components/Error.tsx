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
  color: #393939;
  font: 400 20px ${(props) => props.theme.fonts.sansSerif};
`;

interface NoMatchProps {
  msg?: string;
  code?: number;
}

const NoMatch = ({ code, msg }: NoMatchProps) => {
  return (
    <Bg altColor>
      <NoMatchStyled>
        {code || "404"}
        {msg ? <NoMatchText>{msg}</NoMatchText> : <></>}
      </NoMatchStyled>
    </Bg>
  );
};

export default NoMatch;
