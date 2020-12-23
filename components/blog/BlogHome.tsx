import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { shared_title } from "@components/Title";
import BlogPageChanger, { ChangerProps } from "@components/blog/BlogPageChanger";
import AnimatedLink from "@components/StyledLink";
import BlogHeader from "@components/blog/BlogHeader";
import Loading from "@components/Loading";

import { BlogEntry, BLOG_COLOR_BG } from "@lib/blog";

const BlogHomeWrapper = styled.div`
  background-color: ${BLOG_COLOR_BG};
  min-height: 100vh;
`;

const BlogTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.pre`
  ${shared_title}
  height: 57px;
  font: bold 45px Montserrat, sans-serif;
  background-position: left 19px top 34px;
  margin-left: -9px;
  margin-bottom: 50px;
`;

const ContentPreview = styled.div`
  max-height: 100px;
  width: 700px;
  overflow: hidden;
  color: #191919;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);

  @media (max-width: 825px) {
    width: 95vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const BlogSummaryStyled = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  font: 15px Lato, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BlogSummaryInner = styled.div``;
const BlogMainInner = styled.div`
  padding-top: 60px;
`;

const BlogHeaderWrapper = styled.div`
  margin-bottom: 30px;
  @media (max-width: 825px) {
    margin-left: 10px;
  }
`;

const BlogTitle = styled(AnimatedLink)`
  font: 600 25px "IBM Plex Mono", monospace;
  padding-bottom: 100px;
  width: 600px;

  @media (max-width: 825px) {
    width: 95vw;
  }
`;

const BlogPreviewTitleWrapper = styled.div`
  @media (max-width: 825px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const StyledBlogTime = styled.div`
  color: black;
  margin-bottom: 20px;
`;

const BlogTime = ({ date }: { date: Date }) => {
  return <StyledBlogTime>{date.toLocaleDateString("en-US")}</StyledBlogTime>;
};

const BlogSummary = ({
  blog_entry,
  prefix,
}: {
  blog_entry: BlogEntry;
  prefix?: string;
}) => {
  return (
    <BlogSummaryStyled>
      <BlogSummaryInner>
        <BlogPreviewTitleWrapper>
          <BlogTitle
            link={`${prefix ? prefix : "/"}blog/${blog_entry.url}`}
            text={blog_entry.title}
          />
          <BlogTime date={blog_entry.date}></BlogTime>
        </BlogPreviewTitleWrapper>
        <ContentPreview
          dangerouslySetInnerHTML={{ __html: blog_entry.html_contents }}
        ></ContentPreview>
      </BlogSummaryInner>
    </BlogSummaryStyled>
  );
};

export const BlogSummaryList = (props: {
  blog_entries: Array<BlogEntry>;
  _ref?: (node?: Element | null | undefined) => void;
  prefix?: string;
}) => {
  const blog_previews = (
    <div ref={props._ref}>
      {props.blog_entries.map((blog_entry: BlogEntry, idx: number) => {
        return (
          <BlogSummary
            blog_entry={blog_entry}
            key={idx}
            prefix={props.prefix}
          />
        );
      })}
    </div>
  );

  return <>{blog_previews}</>;
};

interface BlogHomeProps extends ChangerProps {
  blog_entries: Array<BlogEntry>;
  loading: boolean;
}

const BlogHome = (props: BlogHomeProps) => {
  const [ref, visible] = useInView({
    threshold: 1,
  });

  return (
    <BlogHomeWrapper>
      <BlogTitleWrapper>
        <BlogMainInner>
          <BlogHeaderWrapper>
            <BlogHeader />
          </BlogHeaderWrapper>
          {props.loading ? (
            <Loading />
          ) : (
            <>
              <BlogPageChanger
                current_page={props.current_page}
                set_page={props.set_page}
                total_pages={props.total_pages}
              />
              <BlogSummaryList _ref={ref} blog_entries={props.blog_entries} />
              {
                /* If the whole thing fits in the screen, we don't need this  */
                visible ? (
                  <></>
                ) : (
                  <BlogPageChanger
                    current_page={props.current_page}
                    set_page={props.set_page}
                    total_pages={props.total_pages}
                  />
                )
              }
            </>
          )}
        </BlogMainInner>
      </BlogTitleWrapper>
    </BlogHomeWrapper>
  );
};

export default BlogHome;
