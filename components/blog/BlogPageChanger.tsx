import { FC, CSSProperties } from "react";
import { useSpring } from "react-spring";

import styled from "styled-components";

type CustomSetter = FC<{
    style: CSSProperties;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    page_no: number;
  }>;

export interface ChangerProps {
  current_page: number;
  CustomSetter: CustomSetter;
  total_pages: number;
}


const BlogPageChange = ({
  i,
  CustomSetter,
  bold,
}: {
  i: number;
  CustomSetter: CustomSetter;
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
    <CustomSetter
      page_no={i+1}
      onMouseEnter={on_mouse_enter}
      onMouseLeave={on_mouse_leave}
      style={{ ...(anim as any), fontWeight: bold ? "700" : "400" }}
    />
  );
};

const BlogChangerDiv = styled.div`
  color: black;
  font: 15px "IBM Plex Mono", monospace;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 3px;

  @media (max-width: 825px) {
    width: 95vw;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const PageText = styled.b`
  margin-right: 8px;
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
            CustomSetter={props.CustomSetter}
            bold={props.current_page === i + 1}
          />
        );
      })}
    </BlogChangerDiv>
  );
};

export default BlogPageChanger;
