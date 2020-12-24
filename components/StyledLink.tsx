import { animated, useSpring } from "react-spring";
import CSS from "csstype";
import Link from "next/link";

import styled from "styled-components";

interface AnimatedLinkProps {
  link: string;
  text: string;
  extern?: boolean;
  style?: CSS.Properties;
  className?: string;
}

const StyledAnimatedLink = styled(animated.a)`
  font: bold 20px "Montserrat", sans-serif;
  color: #15a1ff;
  text-decoration: underline;
  text-decoration-color: rgba(21, 161, 255, 0);
  cursor: pointer;
`;

const AnimatedLink = (p: AnimatedLinkProps) => {
  let [anim, set_link] = useSpring(() => ({
    textDecorationColor: "rgba(0, 0, 0, 0)",
  }));

  const on_mouse_enter = () => {
    set_link({ textDecorationColor: "rgba(21, 161, 255, 255)" });
  };

  const on_mouse_leave = () => {
    set_link({ textDecorationColor: "rgba(21, 161, 255, 0)" });
  };

  return p.extern ? (
    <StyledAnimatedLink
      href={p.link}
      target="_blank"
      onMouseEnter={on_mouse_enter}
      onMouseLeave={on_mouse_leave}
      // XXX: Make sure to fix this after [this](https://github.com/react-spring/react-spring/issues/1102) is fixed
      style={{ ...(anim as any), ...(p.style ? p.style : {}) }}
      className={p.className}
    >
      {p.text}
    </StyledAnimatedLink>
  ) : (
    <Link href={p.link}>
      <StyledAnimatedLink
        style={{ ...(anim as any), ...(p.style ? p.style : {}) }}
        onMouseEnter={on_mouse_enter}
        onMouseLeave={on_mouse_leave}
        className={p.className}
      >
        {p.text}
      </StyledAnimatedLink>
    </Link>
  );
};

export default AnimatedLink;
