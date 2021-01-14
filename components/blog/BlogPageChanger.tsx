import { FC, CSSProperties } from "react";
import styled from "styled-components";

type CustomSetter = FC<{
  style: CSSProperties;
  pageNo: number;
}>;

export interface ChangerProps {
  current_page: number;
  totalPages: number;
  CustomSetter: CustomSetter;
}

const BlogPageChange = ({
  pageNo,
  bold,
  CustomSetter,
}: {
  pageNo: number;
  bold: boolean;
  CustomSetter: CustomSetter;
}) => {
  return (
    <CustomSetter
      pageNo={pageNo + 1}
      style={{ fontWeight: bold ? "bold" : "normal" }}
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
      {[...Array(props.totalPages).keys()].map((i: number) => {
        return (
          <BlogPageChange
            key={i}
            pageNo={i}
            bold={props.current_page === i + 1}
            CustomSetter={props.CustomSetter}
          />
        );
      })}
    </BlogChangerDiv>
  );
};

export default BlogPageChanger;
