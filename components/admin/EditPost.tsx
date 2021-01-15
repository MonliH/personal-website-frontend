import useBlogPost from "@hooks/useBlogPost";
import AdminBlogPage from "@components/admin/AdminBlogPage";
import Loading from "@components/Loading";

const EditPost = ({ blogPath }: { blogPath: string }) => {
  const blog = useBlogPost(blogPath);
  return blog ? <AdminBlogPage blog={blog} /> : <Loading />;
};

export default EditPost;
