import styled from "styled-components";
import { ArrowLeft } from "react-feather";

import { RowAlign } from "@components/Wrapper";
import { WhiteLink, StyledLink } from "@components/Links";

import Link from "next/link";

const BackHomeText = styled.div`
  font-size: bold 20px;
  margin-left: 4px;
`;

const BackHomeWrapper = styled(RowAlign)`
  position: absolute;
  top: 20px;
  left: 25px;
`;

const BackHome = ({ link, text }: { link?: string; text?: string }) => {
  return (
    <Link href={link || "/"} passHref>
      <StyledLink>
        <BackHomeWrapper>
          <WhiteLink>
            <ArrowLeft />
          </WhiteLink>
          <BackHomeText>{text || "Back Home"}</BackHomeText>
        </BackHomeWrapper>
      </StyledLink>
    </Link>
  );
};

export default BackHome;
