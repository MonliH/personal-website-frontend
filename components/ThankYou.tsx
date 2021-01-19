import styled from "styled-components";

import CustomLink from "@components/StyledLink";
import useBg from "@hooks/useBg";

const ThanksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  color: black;
  font: 600 40px "IBM Plex Mono", monospace;
`;

const ThanksText = styled.div`
  color: #393939;
  margin-top: 30px;
  width: 500px;
  flex: left;
  font: 400 20px "IBM Plex Mono", monospace;
`;

const LeftAlignContainer = styled.div`
  width: fit-content;
`;

const NoMatch = () => {
  useBg("#FFFFFF");
  return (
    <ThanksContainer>
      <LeftAlignContainer>
        Thanks for getting in touch!
        <ThanksText>
          I&#39;ve recived your message, and will reply shortly.
          <CustomLink
            style={{ marginTop: "10px", display: "block" }}
            link="/"
            text="Go back to home page."
          />
        </ThanksText>
      </LeftAlignContainer>
    </ThanksContainer>
  );
};

export default NoMatch;
