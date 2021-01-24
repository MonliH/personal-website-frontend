import styled from "styled-components";

import BlogHeader from "@components/blog/BlogHeader";
import Loading from "@components/Loading";
import { BlogDate } from "@components/blog/BlogHome";

import { BlogEntryDisplay } from "@lib/blog_api/blog";

const BlogPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBg};
  color: ${({ theme }) => theme.colors.fontColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

export const BlogTitle = styled.div`
  font: 700 37px ${(props) => props.theme.fonts.sansSerif};
  margin-bottom: 10px;
  margin-top: 35px;
  width: 800px;
  line-height: 1.1;

  @media (max-width: 850px) {
    width: 90vw;
  }
`;

const BlogTextPlaceholder = styled.div`
  font: 16px ${(props) => props.theme.fonts.sansSerifBody};
  line-height: 1.6;
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

const SubBlogPage = ({ blog }: { blog: null | BlogEntryDisplay }) => {
  return (
    <BlogContentWrapper>
      <BlogHeader blog font="20px" />
      {blog ? (
        <>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogDate date={blog.date} />
          <BlogTextPlaceholder
            dangerouslySetInnerHTML={{ __html: blog.htmlContents }}
            className="blog-content"
          />
        </>
      ) : (
        <Loading />
      )}
    </BlogContentWrapper>
  );
};

const BlogPage = ({ blog }: { blog: BlogEntryDisplay }) => {
  return (
    <BlogPageWrapper>
      <SubBlogPage blog={blog} />
    </BlogPageWrapper>
  );
};

export default BlogPage;
