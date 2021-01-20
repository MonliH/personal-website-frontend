import Link from "next/link";
import styled from "styled-components";

import Bg from "@components/Bg";

const ThanksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  color: ${({ theme }) => theme.colors.fontColor};
  font: 600 40px ${(props) => props.theme.fonts.sansSerif};
`;

const ThanksText = styled.div`
  color: #d9d9d9;
  margin-top: 30px;
  width: 500px;
  flex: left;
  font: 400 20px ${(props) => props.theme.fonts.sansSerif};
`;

const LeftAlignContainer = styled.div`
  width: fit-content;
`;

const NoMatch = () => {
  return (
    <Bg altColor>
      <ThanksContainer>
        <LeftAlignContainer>
          Thanks for getting in touch!
          <ThanksText>
            I&#39;ve recived your message, and will reply shortly.
            <Link href="/" passHref>
              <a style={{ marginTop: "10px", display: "block" }}>
                Go Back to Home Page
              </a>
            </Link>
          </ThanksText>
        </LeftAlignContainer>
      </ThanksContainer>
    </Bg>
  );
};

export default NoMatch;
