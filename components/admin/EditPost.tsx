import useBlogPost from "@hooks/useBlogPost";
import AdminBlogPage from "@components/admin/AdminBlogPage";
import Loading from "@components/Loading";

const EditPost = ({ blog_path }: { blog_path: string }) => {
  const blog = blog_path ? useBlogPost(blog_path) : null;
  return blog ? <AdminBlogPage blog={blog} /> : <Loading />;
};

export default EditPost;
