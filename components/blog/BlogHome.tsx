import { forwardRef, ForwardedRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { sharedTitle } from "@components/Title";
import BlogPageChanger, {
  ChangerProps,
} from "@components/blog/BlogPageChanger";
import CustomLink from "@components/StyledLink";
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
  ${sharedTitle}
  height: 57px;
  font: bold 45px Montserrat, sans-serif;
  background-position: left 19px top 34px;
  margin-left: -9px;
  margin-bottom: 50px;
`;

const ContentPreview = styled.div`
  max-height: 100px;
  overflow: hidden;
  color: #191919;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
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

const BlogSummaryInner = styled.div`
  width: 700px;
  @media (max-width: 825px) {
    width: 95vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;
const BlogMainInner = styled.div`
  padding-top: 60px;
`;

const BlogHeaderWrapper = styled.div`
  margin-bottom: 30px;
  @media (max-width: 825px) {
    margin-left: 10px;
  }
`;

const BlogTitle = styled(CustomLink)`
  font: 600 25px "IBM Plex Mono", monospace;
  width: 600px;
  line-height: 1.1;

  @media (max-width: 825px) {
    width: 95vw;
  }
`;

const StyledBlogTime = styled.div`
  color: black;
  font: 15px Lato, sans-serif;
  margin-top: 5px;
`;

export const BlogDate = ({ date }: { date: Date }) => {
  return <StyledBlogTime>{date.toLocaleDateString("en-US")}</StyledBlogTime>;
};

const BlogSummary = ({
  blogEntry,
  prefix,
}: {
  blogEntry: BlogEntry;
  prefix?: string;
}) => {
  return (
    <BlogSummaryStyled>
      <BlogSummaryInner>
        <div>
          <BlogTitle
            link={`${prefix || "/"}${blogEntry.url}`}
            text={blogEntry.title}
          />
          <BlogDate date={blogEntry.date} />
        </div>
        <ContentPreview
          dangerouslySetInnerHTML={{ __html: blogEntry.htmlContents }}
        />
      </BlogSummaryInner>
    </BlogSummaryStyled>
  );
};

const BlogSummaryListInner = (
  { blogEntries, prefix }: { blogEntries: Array<BlogEntry>; prefix?: string },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const blogPreviews = (
    <div ref={ref}>
      {blogEntries.map((blogEntry: BlogEntry) => {
        return (
          <BlogSummary
            blogEntry={blogEntry}
            key={blogEntry.title}
            prefix={prefix}
          />
        );
      })}
    </div>
  );

  return <>{blogPreviews}</>;
};

export const BlogSummaryList = forwardRef(BlogSummaryListInner);

export interface BlogHomeProps extends ChangerProps {
  blogEntries: Array<BlogEntry>;
  loading: boolean;
  prefix: string;
}

const BlogHome = ({
  loading,
  currentPage,
  totalPages,
  CustomSetter,
  blogEntries,
  prefix,
}: BlogHomeProps) => {
  const [ref, visible] = useInView({
    threshold: 1,
    initialInView: true,
  });

  return (
    <BlogHomeWrapper>
      <BlogTitleWrapper>
        <BlogMainInner>
          <BlogHeaderWrapper>
            <BlogHeader />
          </BlogHeaderWrapper>
          {loading ? (
            <Loading />
          ) : (
            <>
              <BlogPageChanger
                currentPage={currentPage}
                totalPages={totalPages}
                CustomSetter={CustomSetter}
              />
              <BlogSummaryList
                ref={ref}
                blogEntries={blogEntries}
                prefix={prefix}
              />
              {
                /* If the whole thing fits in the screen, we don't need this  */
                visible ? (
                  <></>
                ) : (
                  <BlogPageChanger
                    currentPage={currentPage}
                    totalPages={totalPages}
                    CustomSetter={CustomSetter}
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
