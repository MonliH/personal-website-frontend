import { useRef } from "react";
import styled from "styled-components";

import Typed from "@components/home/Typed";
import Icons from "@components/home/Icons";

const HomeWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkerBg};
  padding-left: 6vw;
`;

const SubTitle = styled.h2`
  font-size: 35px;
  font-family: ${({ theme }) => theme.fonts.sansSerifBody};
  font-weight: bold;
  margin: 0;
  cursor: default;
  padding: 0;
  width: fit-content;
  padding-right: 50px;

  @media (max-width: 1170px) {
    font-size: max(2.8vw, 27px);
  }
`;

const Title = styled.h1`
  font-size: 200px;
  font-family: "Monument Extended", Arial, Roboto, sans-serif;
  font-weight: black;
  margin: 0;
  cursor: default;
  padding: 0;
  width: fit-content;

  @media (max-width: 1460px) {
    font-size: 13.5vw;
  }
`;

const TitleWrapper = styled.div`
  padding: 0;
  margin-top: 20vh;
`;

const HomePage = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);

  return (
    <HomeWrapper
      id="home-wrapper"
      onMouseMove={({ clientX: x, clientY: y }) => {
        if (mouseRef.current) {
          mouseRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          mouseRef.current.style.top = "0";
          mouseRef.current.style.left = "0";
          window.requestAnimationFrame(() => {});
        }
      }}
    >
      <TitleWrapper>
        <Title>Jonathan</Title>
        <Title>Li</Title>
      </TitleWrapper>
      <SubTitle>
        i&apos;m a dev interested in{" "}
        <Typed
          items={[
            "building compilers",
            "deep learning",
            "functional programming",
            "web design",
            "learning new things",
          ]}
        />
      </SubTitle>
      <Icons />
    </HomeWrapper>
  );
};

export default HomePage;
