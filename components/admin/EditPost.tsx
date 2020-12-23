import useBlogPost from "@hooks/useBlogPost";

import AdminBlogPage from "@components/admin/AdminBlogPage";
import Err from "@components/Error";

const EditPost = ({ blog_path }: { blog_path: string }) => {
  const [blog, blog_404] = useBlogPost(blog_path);
  return blog_404 ? <Err /> : <AdminBlogPage blog={blog!} />;
};

export default EditPost;
