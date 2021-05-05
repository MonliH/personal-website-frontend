import { useRef } from "react";
import { useSpring } from "react-spring";

import styled from "styled-components";

import { withCursorProvider } from "@contexts/cursorContext";
import Cursor, {
  CursorStyle,
  defaultInitCursor,
} from "@components/home/Cursor";
import { colorSize } from "@lib/cursor";
import { Margin } from "@components/Wrapper";

const HomeWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkerBg};
  cursor: none;
`;

const Title = styled.h1`
  font-size: 200px;
  font-family: "Monument Extended";
  font-weight: bold;
  user-select: none;
  margin: 0;
  padding: 0;
  margin-left: 100px;
  width: fit-content;
`;

const HomePage = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);

  const [outer, setOuter] = useSpring(() => defaultInitCursor);

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
          setOuter.start({ xy: [x, y] });
        }}
      >
        <Cursor mouseRef={mouseRef} outer={outer} setOuter={setOuter} />
        <Margin top={300}>
          <CursorStyle cursor={colorSize("rgba(0, 21, 134, 0.5)", 1.5)}>
            <Title>Jonathan</Title>
          </CursorStyle>
          <CursorStyle cursor={colorSize("rgba(0, 21, 134, 0.5)", 1.5)}>
            <Title>Li</Title>
          </CursorStyle>
        </Margin>
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

export default withCursorProvider(HomePage);
