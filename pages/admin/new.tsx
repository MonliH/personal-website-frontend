import Layout from "@components/Layout";
import AdminBlogPage from "@components/admin/AdminBlogPage";
import { default_blog } from "@lib/blog";

const NewBlog = () => {
  return (
    <Layout title="New blog" description="Create a new blog">
      <AdminBlogPage blog={default_blog()} show_url />
    </Layout>
  );
};
export default NewBlog;
