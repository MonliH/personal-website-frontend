import Link from "next/link";
import { forwardRef, ForwardedRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import PageChanger, { ChangerProps } from "@components/PageChanger";
import BlogHeader from "@components/blog/BlogHeader";
import Loading from "@components/Loading";
import { WrapperCenterColumn } from "@components/Wrapper";

import { BlogEntryPreview } from "@lib/blog_api/blog";

const BlogHomeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBg};
  color: ${({ theme }) => theme.colors.fontColor};
  min-height: 100vh;
`;

const ContentPreview = styled.div`
  max-height: 200px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
`;

const BlogSummaryStyled = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  font: 15px ${(props) => props.theme.fonts.sansSerifBody};
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

const BlogTitle = styled.a`
  font: 600 25px ${(props) => props.theme.fonts.sansSerif};
  width: 600px;
  line-height: 1.4;

  @media (max-width: 825px) {
    width: 95vw;
  }
`;

const StyledBlogTime = styled.div`
  font: 15px ${(props) => props.theme.fonts.sansSerifBody};
  margin-top: 5px;
`;

export const BlogDate = ({ date }: { date: Date }) => {
  return <StyledBlogTime>{date.toLocaleDateString("en-US")}</StyledBlogTime>;
};

const BlogSummary = ({
  blogEntry,
  prefix,
}: {
  blogEntry: BlogEntryPreview;
  prefix?: string;
}) => {
  return (
    <BlogSummaryStyled>
      <BlogSummaryInner>
        <div>
          <Link href={`${prefix || "/"}${blogEntry.url}`} passHref>
            <BlogTitle>{blogEntry.title}</BlogTitle>
          </Link>
          <BlogDate date={blogEntry.date} />
        </div>
        <ContentPreview
          dangerouslySetInnerHTML={{ __html: blogEntry.htmlPreview }}
          className="blog-content"
        />
      </BlogSummaryInner>
    </BlogSummaryStyled>
  );
};

const BlogSummaryListInner = (
  {
    blogEntries,
    prefix,
  }: { blogEntries: Array<BlogEntryPreview>; prefix?: string },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const blogPreviews = (
    <div ref={ref}>
      {blogEntries.map((blogEntry: BlogEntryPreview) => {
        return (
          <BlogSummary
            blogEntry={blogEntry}
            key={blogEntry.url}
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
  blogEntries: Array<BlogEntryPreview>;
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
      <WrapperCenterColumn>
        <BlogMainInner>
          <BlogHeaderWrapper>
            <BlogHeader />
          </BlogHeaderWrapper>
          {loading ? (
            <Loading />
          ) : (
            <>
              <PageChanger
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
                  <PageChanger
                    currentPage={currentPage}
                    totalPages={totalPages}
                    CustomSetter={CustomSetter}
                  />
                )
              }
            </>
          )}
        </BlogMainInner>
      </WrapperCenterColumn>
    </BlogHomeWrapper>
  );
};

export default BlogHome;
