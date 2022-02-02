import styled from "styled-components";
import { ArrowLeft } from "react-feather";

import Bg from "@components/Bg";
import Link from "next/link";

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
        <div style={{ fontSize: "24px" }}>
          <Link href="/" passHref>
            <a style={{ display: "flex" }}>
              <ArrowLeft style={{ marginTop: "5px", marginRight: "3px" }} />
              <span>Go home</span>
            </a>
          </Link>
        </div>
      </NoMatchStyled>
    </Bg>
  );
};

export default NoMatch;
