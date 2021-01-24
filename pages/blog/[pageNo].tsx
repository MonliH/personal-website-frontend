import { GetStaticProps, GetStaticPaths } from "next";
import { CSSProperties } from "react";
import Link from "next/link";

import Layout from "@components/Layout";
import BlogHome, { BlogHomeProps } from "@components/blog/BlogHome";
import { getPreviewPage, getNumPosts } from "@lib/blog_api/fetchBlog";
import { fromUnixTimestamp, toUnixTimestamp } from "@lib/date";
import theme from "@styles/theme";

export const postsPerPage = 10;

const CustomSetter = ({
  style,
  pageNo,
}: {
  style: CSSProperties;
  pageNo: number;
}) => (
  <Link href={`/blog/${pageNo}`} passHref>
    <a style={{ ...style, fontSize: "18px" }}>{pageNo}</a>
  </Link>
);

const Blog = ({ blogEntries, ...props }: BlogHomeProps) => {
  const newBlogEntries = blogEntries.map((entry) => ({
    ...entry,
    date: fromUnixTimestamp(entry.date as any), // This actualy is a number
  }));
  return (
    <Layout
      title="Jonathan Li's Blog"
      description="Jonathan's personal blog."
      theme={theme.colors.lightBg}
    >
      <BlogHome
        {...props}
        blogEntries={newBlogEntries}
        prefix="/blog/post/"
        CustomSetter={CustomSetter}
      />
    </Layout>
  );
};
export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  const numPages = Math.ceil((await getNumPosts()) / postsPerPage);
  for (let i = 0; i < numPages; i++) {
    paths.push({
      params: { pageNo: (i + 1).toString() },
    });
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = parseInt(params.pageNo as string, 10);
  const [totalPages, blogEntries] = await getPreviewPage(
    postsPerPage,
    currentPage - 1
  );

  return {
    props: {
      loading: false,
      currentPage,
      totalPages,
      blogEntries: blogEntries.map((entry) => ({
        ...entry,
        date: toUnixTimestamp(entry.date),
      })),
    },
    revalidate: 5,
  };
};
