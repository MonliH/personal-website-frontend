import { useEffect, MutableRefObject, ReactNode } from "react";
import { to, SpringRef, SpringValue, animated } from "react-spring";
import styled from "styled-components";

import { useCursor } from "@contexts/cursorContext";
import { def, CursorState } from "@lib/cursor";

const Span = styled.div`
  width: fit-content;
`;

export const CursorStyle = ({
  cursor,
  children,
}: {
  cursor: CursorState;
  children: ReactNode;
}) => {
  const { setCursorState } = useCursor();
  return (
    <Span
      onMouseOver={() => {
        setCursorState(cursor);
      }}
      onMouseOut={() => {
        setCursorState(def);
      }}
    >
      {children}
    </Span>
  );
};

const cursorOuterRadius = 50;

const CursorOuter = styled(animated.div)`
  border-radius: 50%;
  width: ${cursorOuterRadius}px;
  height: ${cursorOuterRadius}px;
  box-shadow: 0 0 2px 0px #b0b0b0 inset, 0 0 2px 0px #b0b0b0;
  position: absolute;
  pointer-events: none;
  z-index: 10;
`;

const CursorInner = styled.div`
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.fontColor};
  position: absolute;
  top: -5px;
  left: -5px;
  pointer-events: none;
  z-index: 11;
`;

const defaultCursor = {
  size: 1,
  color: "rgba(255, 255, 255, 0)",
  config: { mass: 0.7, tension: 200, friction: 24 },
};

export const defaultInitCursor = {
  xy: [-cursorOuterRadius, -cursorOuterRadius],
  ...defaultCursor,
};

const Cursor = ({
  mouseRef,
  setOuter,
  outer,
}: {
  mouseRef: MutableRefObject<HTMLDivElement | null>;
  setOuter: SpringRef<{
    size: number;
    color: string;
    xy: number[];
  }>;
  outer: {
    size: SpringValue<number>;
    color: SpringValue<string>;
    xy: SpringValue<number[]>;
  };
}) => {
  const { cursorState: cursor } = useCursor();

  useEffect(() => {
    switch (cursor.kind) {
      case "default":
        setOuter.start(defaultCursor);
        break;
      case "color-size":
        setOuter.start({
          size: cursor.size,
          color: cursor.color,
        });
        break;
      case "color":
        setOuter.start({ color: cursor.color });
        break;
      case "size":
        setOuter.start({ size: cursor.size });
        break;
      // All cases specified
    }
  }, [cursor]);

  return (
    <>
      <CursorInner ref={mouseRef} />
      <CursorOuter
        style={{
          transform: to(
            [outer.xy, outer.size],
            (xy: [number, number], size) =>
              `translate3d(${xy[0] - cursorOuterRadius / 2 + 2}px, ${
                xy[1] - cursorOuterRadius / 2 + 2
              }px, 0) scale3d(${size}, ${size}, 1)`
          ),
          backgroundColor: outer.color,
        }}
      />
    </>
  );
};

export default Cursor;
