import styled from "styled-components";

import useBg from "@hooks/useBg";

const NoMatchStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  color: black;
  font: 600 100px "IBM Plex Mono", monospace;
`;

const NoMatchText = styled.div`
  color: #393939;
  font: 400 20px "IBM Plex Mono", monospace;
`;

interface NoMatchProps {
  msg?: string;
  code?: number;
}

const NoMatch = (props: NoMatchProps) => {
  useBg("#FFFFFF");
  return (
    <NoMatchStyled>
      {props.code ? props.code : "404"}
      {props.msg ? <NoMatchText>{props.msg}</NoMatchText> : <></>}
    </NoMatchStyled>
  );
};

export default NoMatch;
