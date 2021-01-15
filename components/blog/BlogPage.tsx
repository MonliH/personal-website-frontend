import styled from "styled-components";

import BlogHeader from "@components/blog/BlogHeader";
import Loading from "@components/Loading";
import { BlogDate } from "@components/blog/BlogHome";
import { BlogEntry, BLOG_COLOR_BG } from "@lib/blog";

const BlogPageWrapper = styled.div`
  background-color: ${BLOG_COLOR_BG};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BlogTitle = styled.div`
  font: 700 37px "IBM Plex Mono", monospace;
  color: #000000;
  margin-bottom: 10px;
  margin-top: 35px;
  width: 800px;
  line-height: 1.1;

  @media (max-width: 850px) {
    width: 90vw;
  }
`;

const BlogTextPlaceholder = styled.div`
  font: 16px "Open Sans", sans-serif;
  color: #191919;
  width: 750px;
  @media (max-width: 850px) {
    width: 85vw;
  }
`;

const BlogContentWrapper = styled.div`
  margin-left: -20vw;
  margin-top: 100px;
  @media (max-width: 1225px) {
    margin-left: 0;
    padding-left: 20px;
  }
`;

const SubBlogPage = ({ blog }: { blog: null | BlogEntry }) => {
  return (
    <BlogContentWrapper>
      <BlogHeader blog font="20px" />
      {blog ? (
        <>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogDate date={blog.date} />
          <BlogTextPlaceholder
            dangerouslySetInnerHTML={{ __html: blog.htmlContents }}
          />
        </>
      ) : (
        <Loading />
      )}
    </BlogContentWrapper>
  );
};

const BlogPage = ({ blog }: { blog: BlogEntry }) => {
  return (
    <BlogPageWrapper>
      <SubBlogPage blog={blog} />
    </BlogPageWrapper>
  );
};

export default BlogPage;
