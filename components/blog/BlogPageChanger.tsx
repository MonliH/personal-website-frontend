import { FC, CSSProperties } from "react";
import styled from "styled-components";

type CustomSetter = FC<{
  style: CSSProperties;
  pageNo: number;
}>;

export interface ChangerProps {
  currentPage: number;
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

const BlogPageChanger = ({
  totalPages,
  currentPage,
  CustomSetter,
}: ChangerProps) => {
  return (
    <BlogChangerDiv>
      <PageText>Page</PageText>
      {[...Array(totalPages).keys()].map((i: number) => {
        return (
          <BlogPageChange
            key={i}
            pageNo={i}
            bold={currentPage === i + 1}
            CustomSetter={CustomSetter}
          />
        );
      })}
    </BlogChangerDiv>
  );
};

export default BlogPageChanger;
