import { useRef } from "react";
import styled from "styled-components";

import Typed from "@components/home/Typed";

const HomeWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkerBg};
`;

const SubTitle = styled.h2`
  font-size: 40px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  margin: 0;
  cursor: default;
  padding: 0;
  margin-left: 100px;
  width: fit-content;
`;

const Title = styled.h1`
  font-size: 200px;
  font-family: "Monument Extended", Arial, Roboto, sans-serif;
  font-weight: black;
  margin: 0;
  cursor: default;
  padding: 0;
  margin-left: 100px;
  width: fit-content;
`;

const TitleWrapper = styled.div`
  padding: 0;
  margin-top: 20vh;
`;

const HomePage = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
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
            ]}
          />
        </SubTitle>
      </HomeWrapper>
      <noscript>
        <style>{`
          #home-wrapper {
            cursor: default;
          }
        `}</style>
      </noscript>
    </>
  );
};

export default HomePage;
