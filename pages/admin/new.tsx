import Layout from "@components/Layout";
import AdminBlogPage from "@components/admin/blog/AdminBlogPage";
import { defaultBlog } from "@lib/blog_api/blog";
import { withProtect } from "@contexts/authContext";
import theme from "@styles/theme";

const NewBlog = () => {
  return (
    <Layout
      title="New blog"
      description="Create a new blog"
      theme={theme.colors.lightBg}
    >
      <AdminBlogPage blog={defaultBlog()} showUrl />
    </Layout>
  );
};

export default withProtect(NewBlog);
