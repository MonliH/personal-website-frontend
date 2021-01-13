import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import Layout from "@components/Layout";
import BlogPage from "@components/blog/BlogPage";
import Loading from "@components/Loading";

import useBg from "@hooks/useBg";

import { get_all_urls, get_blog_post } from "@lib/blog_api";
import { BlogEntry } from "@lib/blog";
import { from_unix_timestamp, to_unix_timestamp } from "@lib/date";

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
            date: from_unix_timestamp(blog.date as any), // This actually is a number
          }}
        />
      )}
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];
  let all_urls = await get_all_urls();
  for (const url of all_urls) {
    paths.push({
      params: { blog_url: url },
    });
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = await get_blog_post(params.blog_url as string);
  return {
    props: { blog: { ...blog, date: to_unix_timestamp(blog.date) } },
    revalidate: 5,
  };
};
