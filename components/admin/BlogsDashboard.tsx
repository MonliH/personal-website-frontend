import { SubTitle, PanelButton } from "@components/admin/Panel";
import Loading from "@components/Loading";
import { BlogSummaryList } from "@components/blog/BlogHome";

import { BlogEntryPreview } from "@lib/blog";
import redirect from "@lib/redirect";

export interface BlogPanelProps {
  loading: boolean;
  blogEntries: Array<BlogEntryPreview>;
}

const BlogsDashboard = ({ blogEntries, loading }: BlogPanelProps) => {
  const newBlog = () => {
    redirect("/admin/new");
  };
  return (
    <div>
      <SubTitle>Blogs</SubTitle>
      <PanelButton onClick={newBlog}>New Post</PanelButton>
      {loading ? (
        <Loading />
      ) : (
        <BlogSummaryList blogEntries={blogEntries} prefix="/admin/blog/" />
      )}
    </div>
  );
};
export default BlogsDashboard;
