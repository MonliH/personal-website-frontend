import { useEffect } from "react";
import styled from "styled-components";

import BlogHeader from "@components/blog/BlogHeader";
import Err from "@components/Error";
import Loading from "@components/Loading";
import { BlogEntry, BLOG_COLOR_BG } from "@lib/blog";
import useBlogPost from "@hooks/useBlogPost";

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
  margin-bottom: 35px;
  margin-top: 35px;
  width: 800px;

  @media (max-width: 850px) {
    width: 90vw;
  }
`;

const BlogText = styled.div`
  font: 16px Lato, sans-serif;
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
          <BlogText
            dangerouslySetInnerHTML={{ __html: blog.html_contents }}
          ></BlogText>
        </>
      ) : (
        <Loading />
      )}
    </BlogContentWrapper>
  );
};

const BlogPage = ({ blog_url }: { blog_url: string }) => {
  const [blog, blog_404] = useBlogPost(blog_url);

  useEffect(() => {
    document.title = `Jonathan's blog${
      blog ? ` - ${blog.url.split("-").join(" ")}` : ""
    }`;
  }, [blog]);

  return blog_404 ? (
    <Err msg={blog_404} />
  ) : (
    <BlogPageWrapper>
      <SubBlogPage blog={blog} />
    </BlogPageWrapper>
  );
};

export default BlogPage;
