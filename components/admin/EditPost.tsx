import useBlogPostAdmin from "@hooks/useBlogPostAdmin";

import AdminBlogPage from "@components/admin/AdminBlogPage";
import Loading from "@components/Loading";
import Bg from "@components/Bg";

const EditPost = ({ blogPath }: { blogPath: string }) => {
  const blog = useBlogPostAdmin(blogPath);
  return <Bg altColor>{blog ? <AdminBlogPage blog={blog} /> : <Loading />}</Bg>;
};

export default EditPost;
