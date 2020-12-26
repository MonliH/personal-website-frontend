import styled from "styled-components";
import CustomLink from "components/StyledLink";

export interface ChangerProps {
  current_page: number;
  total_pages: number;
  prefix: string;
}

const BlogPageChange = ({
  page_no,
  bold,
  prefix,
}: {
  prefix: string;
  page_no: number;
  bold: boolean;
}) => {
  return (
    <CustomLink
      text={page_no.toString()}
      link={`${prefix}/${page_no}`}
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
      {[...Array(props.total_pages).keys()].map((i: number) => {
        return (
          <BlogPageChange
            key={i}
            page_no={i}
            prefix={props.prefix}
            bold={props.current_page === i + 1}
          />
        );
      })}
    </BlogChangerDiv>
  );
};

export default BlogPageChanger;
