import { GetServerSideProps } from "next";
import Layout from "@components/Layout";

import BlogHome from "@components/blog/BlogHome";
import useBlogEntries from "@hooks/useBlogEntries";

export const posts_per_page = 10;

const Blog = () => {
  const [pages, page_no, set_page_no, blog_entries, loading] = useBlogEntries(
    posts_per_page
  );
  return (
    <Layout title="Jonathan Li's Blog" description="Jonathan's personal blog.">
      <BlogHome
        current_page={page_no}
        set_page={set_page_no}
        total_pages={pages}
        blog_entries={blog_entries}
        loading={loading}
      />
    </Layout>
  );
};
export default Blog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = {};

  return {
    props: {},
  };
};
