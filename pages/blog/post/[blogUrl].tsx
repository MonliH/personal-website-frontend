import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import Layout from "@components/Layout";
import BlogPage from "@components/blog/BlogPage";
import Loading from "@components/Loading";

import theme from "@styles/theme";

import { getAllUrls, getBlogPostDisplay } from "@lib/blog_api/fetchBlog";
import { BlogEntryDisplay } from "@lib/blog_api/blog";
import { fromUnixTimestamp, toUnixTimestamp } from "@lib/date";

const Post = ({ blog }: { blog: BlogEntryDisplay }) => {
  const router = useRouter();

  return (
    <Layout
      title="Jonathan Li's Blog"
      description="Blog"
      theme={theme.colors.lightBg}
    >
      {router.isFallback ? (
        <Loading />
      ) : (
        <BlogPage
          blog={{
            ...blog,
            date: fromUnixTimestamp(blog.date as any), // This actually is a number
          }}
        />
      )}
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const allUrls = await getAllUrls();
  const paths = allUrls.map((url) => ({
    params: { blogUrl: url },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = await getBlogPostDisplay(params.blogUrl as string);
  return {
    props: { blog: { ...blog, date: toUnixTimestamp(blog.date) } },
    revalidate: 5,
  };
};
