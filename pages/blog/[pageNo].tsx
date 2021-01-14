import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

import Layout from "@components/Layout";
import BlogHome, { BlogHomeProps } from "@components/blog/BlogHome";
import { getPreviewPage, getNumPosts } from "@lib/blogApi";
import { fromUnixTimestamp, toUnixTimestamp } from "@lib/date";
import theme from "@styles/theme";

export const postsPerPage = 10;

const CustomSetter = ({ style, pageNo }) => (
  <Link href={`/blog/${pageNo}`} passHref={true}>
    <a style={{ ...style, fontSize: "18px" }}>{pageNo}</a>
  </Link>
);

const Blog = (props: BlogHomeProps) => {
  const newBlogEntries = props.blogEntries.map((entry) => ({
    ...entry,
    date: fromUnixTimestamp(entry.date as any), // This actualy is a number
  }));
  return (
    <Layout
      title="Jonathan Li's Blog"
      description="Jonathan's personal blog."
      theme={theme.lightBg}
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
  let paths = [];
  let numPages = Math.ceil((await getNumPosts()) / postsPerPage);
  for (let i = 0; i < numPages; i++) {
    paths.push({
      params: { pageNo: (i + 1).toString() },
    });
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = parseInt(params.pageNo as string);
  const [totalPages, blogEntries] = await getPreviewPage(
    postsPerPage,
    currentPage - 1
  );

  return {
    props: {
      loading: false,
      currentPage: currentPage,
      totalPages: totalPages,
      blogEntries: blogEntries.map((entry) => ({
        ...entry,
        date: toUnixTimestamp(entry.date),
      })),
    },
    revalidate: 5,
  };
};
