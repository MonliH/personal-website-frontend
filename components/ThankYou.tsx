import styled from "styled-components";

import Bg from "@components/Bg";
import { ColAlignJustify } from "@components/Wrapper";
import BackHome from "@components/BackHome";

const ThanksContainer = styled(ColAlignJustify)`
  height: 90vh;
  color: ${({ theme }) => theme.colors.fontColor};
  font: 600 40px ${(props) => props.theme.fonts.sansSerif};
`;

const ThanksText = styled.div`
  color: #d9d9d9;
  margin-top: 30px;
  width: min(500px, 90vw);
  flex: left;
  font: 400 20px ${(props) => props.theme.fonts.sansSerif};
`;

const LeftAlignContainer = styled.div`
  width: min(500px, 90vw);
`;

const ThankYou = () => {
  return (
    <Bg>
      <BackHome />
      <ThanksContainer>
        <LeftAlignContainer>
          Thanks for getting in touch!
          <ThanksText>
            I&#39;ve recived your message, and will reply shortly.
          </ThanksText>
        </LeftAlignContainer>
      </ThanksContainer>
    </Bg>
  );
};

export default ThankYou;
