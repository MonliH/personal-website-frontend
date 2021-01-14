import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import Layout from "@components/Layout";
import BlogPage from "@components/blog/BlogPage";
import Loading from "@components/Loading";

import useBg from "@hooks/useBg";

import { getAllUrls, getBlogPost } from "@lib/blogApi";
import { BlogEntry } from "@lib/blog";
import { fromUnixTimestamp, toUnixTimestamp } from "@lib/date";

import theme from "@styles/theme";

const Post = ({ blog }: { blog: BlogEntry }) => {
  useBg("#FFFFFF");
  const router = useRouter();

  return (
    <Layout title="Jonathan Li's Blog" description="Blog" theme={theme.lightBg}>
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
  let paths = [];
  let allUrls = await getAllUrls();
  for (const url of allUrls) {
    paths.push({
      params: { blogUrl: url },
    });
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = await getBlogPost(params.blogUrl as string);
  return {
    props: { blog: { ...blog, date: toUnixTimestamp(blog.date) } },
    revalidate: 5,
  };
};
