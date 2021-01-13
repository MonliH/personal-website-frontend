import { ForwardedRef, forwardRef, useRef } from "react";
import styled from "styled-components";

import { WrapperCenter, WrapperInner } from "@components/Wrapper";
import { Title } from "@components/Title";

const AboutVideo = styled.video`
  display: block;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  height: 50vh;
  width: 50vh;
  filter: brightness(1.1) contrast(105%) saturate(135%);

  @media (max-width: 901px) {
    display: none;
  }
`;

const AboutText = styled.div`
  text-align: left;
  width: 370px;
  color: white;
  font: 400 18px Lato, sans-serif;
`;

const AboutMeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -70px;

  @media (max-width: 901px) {
    margin-top: 10px;
    width: 80vw;
  }
`;

const AboutStyled = styled.div`
  padding-top: 20vh;
  margin-top: -24vh;
  margin-bottom: 11vh;
  background-color: #1d1d1d;

  @media (max-width: 430px) {
    padding-top: 10vh;
    margin-top: -14vh;
  }
`;

const ModifiedTitle = styled(Title)`
  @media (max-width: 901px) {
    margin-left: 50px;
  }
`;

const About = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  let video_element = useRef(null);
  return (
    <AboutStyled ref={ref}>
      <WrapperCenter>
        <WrapperInner>
          <ModifiedTitle>About Me&thinsp;</ModifiedTitle>
          <AboutMeSection>
            <AboutVideo
              onMouseEnter={() => video_element.current?.play()}
              onMouseLeave={() => video_element.current?.pause()}
              ref={video_element}
              playsInline
              muted
              loop
            >
              <source src="/graphics/about_me.webm" type="video/webm" />
              <source src="/graphics/about_me.mp4" type="video/mp4" />
            </AboutVideo>
            <AboutText>
              Hey! My name is Jonathan Li.
              <br />
              <br />
              I’m passionate about coding, design, and making simulations.
              <br />
              <br />
              Some things I enjoy creating include deep learning models,
              programming languages, and web apps.
              <br />
              <br />I revel in learning new things.
            </AboutText>
          </AboutMeSection>
        </WrapperInner>
      </WrapperCenter>
    </AboutStyled>
  );
});

export default About;
