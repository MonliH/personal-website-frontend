import { useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { WrapperCenterRow } from "@components/Wrapper";

const CursorOuterRadius = 50;

const CursorOuter = styled(animated.div)`
  border-radius: 50%;
  width: ${CursorOuterRadius}px;
  height: ${CursorOuterRadius}px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #000000;
  position: absolute;
`;

const CursorInner = styled.div`
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background-color: #000000;
  position: absolute;
`;

const Page = styled.div`
  font-family: ${({ theme }) => theme.fonts.sansSerifAlt};
  height: 100vh;
`;

const Huge = styled.h1`
  font-size: 100px;
  font-weight: black;
  margin: 0;
  margin-bottom: 10px;
`;

const Sub = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-size: 40px;
  margin: 0;
  margin-bottom: 50px;
`;

const HomeWrapper = styled.div`
  cursor: none;
`;

const HomePage = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);

  const [outer, setOuter] = useSpring(() => ({ xy: [0, 0] }));

  return (
    <HomeWrapper
      onMouseMove={({ clientX: x, clientY: y }) => {
        if (mouseRef.current) {
          mouseRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          window.requestAnimationFrame(() => {});
        }
        setOuter({ xy: [x, y] });
      }}
    >
      <CursorInner ref={mouseRef} />
      <CursorOuter
        style={{
          transform: outer.xy.to(
            (x, y) =>
              `translate3d(${x - CursorOuterRadius / 2 + 2}px, ${
                y - CursorOuterRadius / 2 + 2
              }px, 0)`
          ),
        }}
      />
      <Page>
        <WrapperCenterRow>
          <div>
            <Huge>jonathan li</Huge>
            <Sub>I make cool stuff</Sub>
          </div>
        </WrapperCenterRow>
      </Page>
    </HomeWrapper>
  );
};

export default HomePage;
