import useBlogPost from "@hooks/useBlogPost";
import AdminBlogPage from "@components/admin/AdminBlogPage";
import Loading from "@components/Loading";

const EditPost = ({ blogPath }: { blogPath: string }) => {
  const blog = blogPath ? useBlogPost(blogPath) : null;
  return blog ? <AdminBlogPage blog={blog} /> : <Loading />;
};

export default EditPost;
