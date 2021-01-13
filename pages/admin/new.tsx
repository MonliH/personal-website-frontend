import Layout from "@components/Layout";
import AdminBlogPage from "@components/admin/AdminBlogPage";
import { default_blog } from "@lib/blog";
import { withProtect } from "@contexts/auth_context";
import theme from "@styles/theme";

const NewBlog = () => {
  return (
    <Layout
      title="New blog"
      description="Create a new blog"
      theme={theme.lightBg}
    >
      <AdminBlogPage blog={default_blog()} show_url />
    </Layout>
  );
};

export default withProtect(NewBlog);
