import { useState, useEffect, useRef } from "react";
import { to, useSpring, animated } from "react-spring";
import { Canvas } from "react-three-fiber";
import { EffectComposer, Noise, Glitch, SSAO } from "react-postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import styled from "styled-components";
import { softShadows } from "@react-three/drei";

import { WrapperCenterRow } from "@components/Wrapper";
import Swarm from "@components/home/Swarm";
import { CursorState } from "@components/home/Cursor";
import useWindowSize from "@hooks/useWindowSize";

softShadows();

const cursorOuterRadius = 50;

const CursorOuter = styled(animated.div)`
  border-radius: 50%;
  width: ${cursorOuterRadius}px;
  height: ${cursorOuterRadius}px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #000000;
  position: fixed;
  pointer-events: none;
  z-index: 100;
`;

const CursorInner = styled.div`
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background-color: #000000;
  position: fixed;
  top: -5px;
  left: -5px;
  pointer-events: none;
  z-index: 100;
`;

const Page = styled.div.attrs({ className: "home-page-no-cursor" })`
  font-family: ${({ theme }) => theme.fonts.sansSerifAlt};
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
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
  width: fit-content;
`;

const HomeWrapper = styled.div`
  cursor: none;
  overflow: hidden;
  position: relative;
`;

const Transparent = styled.div`
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
  margin-left: -40vw;
`;

const Red = styled.span`
  color: #ff5b5b;
`;

const defaultCursor = {
  size: 1,
  color: "rgba(0, 0, 0, 0)",
};

const defaultInitCursor = {
  xy: [-cursorOuterRadius, -cursorOuterRadius],
  ...defaultCursor,
};

const HomePage = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<CursorState>({ kind: "default" });
  const [glitch, setGlitch] = useState<boolean>(false);

  const [outer, setOuter] = useSpring(() => defaultInitCursor);
  const [, windowHeight] = useWindowSize();

  useEffect(() => {
    switch (cursor.kind) {
      case "default":
        setOuter(defaultCursor);
        break;
      case "color-size":
        setOuter({
          size: cursor.size,
          color: cursor.color,
        });
        break;
      case "color":
        setOuter({ color: cursor.color });
        break;
      case "size":
        setOuter({ size: cursor.size });
        break;
      // All cases specified
    }
  }, [cursor]);

  return (
    <HomeWrapper
      onMouseMove={({ clientX: x, clientY: y }) => {
        if (mouseRef.current) {
          mouseRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          mouseRef.current.style.top = "0";
          mouseRef.current.style.left = "0";
          window.requestAnimationFrame(() => {});
        }
        setOuter({ xy: [x, y] });
      }}
    >
      <CursorInner ref={mouseRef} />
      <CursorOuter
        style={{
          transform: to(
            [outer.xy, outer.size],
            (xy, size) =>
              `translate3d(${
                (xy as [number, number])[0] - cursorOuterRadius / 2 + 2
              }px, ${
                (xy as [number, number])[1] - cursorOuterRadius / 2 + 2
              }px, 0) scale3d(${size}, ${size}, 1)`
          ),
          backgroundColor: outer.color as any,
        }}
      />
      <Page>
        <Canvas
          concurrent
          shadowMap
          style={{ position: "absolute", height: windowHeight, zIndex: 0 }}
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 75], fov: 75, near: 10, far: 150 }}
        >
          <EffectComposer multisampling={0}>
            <SSAO
              samples={31}
              radius={20}
              intensity={40}
              luminanceInfluence={0.1}
              color="black"
            />
          </EffectComposer>
          <ambientLight intensity={0.7} />
          <pointLight position={[150, 150, 150]} intensity={1} castShadow />
          <pointLight
            position={[-100, -100, -100]}
            intensity={0.5}
            castShadow
          />
          <Swarm count={60} setCursor={setCursor} />
          {glitch && (
            <EffectComposer multisampling={0}>
              <Glitch
                delay={[0.1, 0.3]}
                duration={[0.2, 0.3]}
                ratio={0.85}
                mode={GlitchMode.SPORADIC}
                active
              />
              <Noise premultiply blendFunction={BlendFunction.ADD} />
            </EffectComposer>
          )}
        </Canvas>
        <WrapperCenterRow>
          <Transparent>
            <Huge
              onMouseEnter={() => {
                setCursor({
                  kind: "color-size",
                  color: "rgba(41, 41, 41, 0.3)",
                  size: 1.25,
                });
              }}
              onMouseLeave={() => {
                setCursor({ kind: "default" });
              }}
            >
              jonathan li
            </Huge>
            <Sub
              onMouseEnter={() => {
                setGlitch(true);
                setCursor({
                  kind: "color",
                  color: "rgba(255, 0, 0, 0.3)",
                });
              }}
              onMouseLeave={() => {
                setGlitch(false);
                setCursor({ kind: "default" });
              }}
            >
              {glitch ? (
                <>
                  I <Red>break</Red> stuff
                </>
              ) : (
                <>I make stuff</>
              )}
            </Sub>
          </Transparent>
        </WrapperCenterRow>
      </Page>
    </HomeWrapper>
  );
};

export default HomePage;
