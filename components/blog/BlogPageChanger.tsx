import { animated, useSpring } from "react-spring";

import styled from "styled-components";

export interface ChangerProps {
  current_page: number;
  set_page: (n: number) => void;
  total_pages: number;
}

const BlogPageButton = styled(animated.button)`
  color: #15a1ff;
  text-decoration: underline;
  text-decoration-color: rgba(21, 161, 255, 0);
  background: none;
  border: none;
  font: inherit;
`;

const BlogPageChange = ({
  i,
  set_page,
  bold,
}: {
  i: number;
  set_page: (n: number) => void;
  bold: boolean;
}) => {
  let [anim, set_link] = useSpring(() => ({
    textDecorationColor: "rgba(0, 0, 0, 0)",
  }));

  const on_mouse_enter = () => {
    set_link({ textDecorationColor: "rgba(21, 161, 255, 255)" });
  };

  const on_mouse_leave = () => {
    set_link({ textDecorationColor: "rgba(21, 161, 255, 0)" });
  };

  return (
    <BlogPageButton
      onClick={() => {
        set_page(i);
      }}
      onMouseEnter={on_mouse_enter}
      onMouseLeave={on_mouse_leave}
      style={{ ...(anim as any), fontWeight: bold ? "700" : "400" }}
    >
      {i + 1}
    </BlogPageButton>
  );
};

const BlogChangerDiv = styled.div`
  color: black;
  font: 15px "IBM Plex Mono", monospace;
  margin-bottom: 20px;
  margin-top: 20px;

  @media (max-width: 825px) {
    width: 95vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const PageText = styled.b`
  margin-right: 3px;
`;

const BlogPageChanger = (props: ChangerProps) => {
  return (
    <BlogChangerDiv>
      <PageText>Page</PageText>
      {[...Array(props.total_pages).keys()].map((i: number) => {
        return (
          <BlogPageChange
            key={i}
            i={i}
            set_page={props.set_page}
            bold={props.current_page === i}
          />
        );
      })}
    </BlogChangerDiv>
  );
};

export default BlogPageChanger;
