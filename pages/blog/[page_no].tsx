import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Layout from "@components/Layout";

import BlogHome, { BlogHomeProps } from "@components/blog/BlogHome";
import { get_preview_page, get_num_posts } from "@lib/blog_api";

export const posts_per_page = 10;

const CustomSetter = ({ style, onMouseEnter, onMouseLeave, page_no }) => (
  <Link href={`/blog/${page_no}`}>
    <a style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {page_no}
    </a>
  </Link>
);

const Blog = (props: BlogHomeProps) => {
  return (
    <Layout title="Jonathan Li's Blog" description="Jonathan's personal blog.">
      <BlogHome {...props} prefix="/blog/post/" CustomSetter={CustomSetter} />
    </Layout>
  );
};
export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];
  let num_pages = Math.ceil((await get_num_posts()) / posts_per_page);
  for (let i = 0; i < num_pages; i++) {
    paths.push({
      params: { page_no: (i + 1).toString() },
    });
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const current_page = parseInt(params.page_no as string);
  const [total_pages, blog_entries] = await get_preview_page(
    posts_per_page,
    current_page - 1
  );

  return {
    props: {
      loading: false,
      current_page,
      total_pages,
      blog_entries,
    },
    revalidate: 5,
  };
};
